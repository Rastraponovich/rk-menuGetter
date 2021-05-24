import { IRestaurant, IResult } from "@/types/common"
import React, { FC, memo, useEffect, useState } from "react"
import { useRouter } from "next/router"

// import styles from "@/styles/RestaurantCard.module.css"
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    GridSize,
    Typography,
    withStyles,
} from "@material-ui/core"
import axios, { AxiosResponse } from "axios"

interface InputProps {
    restaurant: IRestaurant
    idx: number
    sort: GridSize
    select: (data: IRestaurant) => void
}

const RestaurantCard: FC<InputProps> = ({ restaurant, idx, sort, select }) => {
    const { address, port, username, password, id, name } = restaurant

    const router = useRouter()
    const [hover, setHover] = useState<boolean>(false)
    const [state, setState] = useState("")
    const [timer, setTimer] = useState(120)
    const [timeLeft, setTimeleft] = useState(timer)

    const checkConnection = async () => {
        const request: AxiosResponse<IResult> = await axios.post(
            "/api/status",
            { address, port, username, password }
        )
        let result: any = {}

        if (request.data) {
            const { isAxiosError, RK7QueryResult, message } = request.data
            if (!isAxiosError) {
                result = RK7QueryResult.Status
            } else result = message
        }

        setState(result)
    }

    useEffect(() => {
        if (timer === timeLeft) {
            checkConnection()
        }
    }, [timeLeft])

    useEffect(() => {
        const left = setInterval(() => {
            setTimeleft((prevProgress) =>
                prevProgress <= 0 ? timer : prevProgress - 1
            )
        }, 1000)

        return () => {
            clearInterval(left)
        }
    }, [timer])

    const handleClick = () => {
        select(restaurant)
        router.push(`/getmenu/${id}`)
    }

    const onMouseEnter = () => {
        setHover(!hover)
    }

    const StyledCard = withStyles({
        root: {
            cursor: "pointer",
            background:
                state === "Ok"
                    ? "linear-gradient(45deg, #4BA25D 30%, #70D27B 90%)"
                    : "linear-gradient(45deg, #D06161 30%, #F98484 90%)",
            color: "#fff",
        },
    })(Card)

    return (
        <Grid item xs={sort}>
            <StyledCard
                onClick={handleClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseEnter}
                raised={hover}
            >
                <CardHeader
                    title={<Typography>{name}</Typography>}
                ></CardHeader>
                <CardContent>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption">
                            Статус подключения: {state}
                        </Typography>
                        <Typography variant="caption">
                            Время до повторного обновления: {timeLeft}
                        </Typography>
                    </div>
                </CardContent>
                <CardActions></CardActions>
            </StyledCard>
        </Grid>
    )
}

export default memo(RestaurantCard)
