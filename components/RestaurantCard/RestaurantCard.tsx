import { IRestaurant } from "@/types/common"
import React, { FC, memo, useState } from "react"
import { useRouter } from "next/router"

import styles from "@/styles/RestaurantCard.module.css"
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    GridSize,
    Typography,
} from "@material-ui/core"

interface InputProps {
    restaurant: IRestaurant
    idx: number
    sort: GridSize
    select: (data: IRestaurant) => void
}

const RestaurantCard: FC<InputProps> = ({ restaurant, idx, sort, select }) => {
    const router = useRouter()
    const [hover, setHover] = useState<boolean>(false)
    const handleClick = () => {
        select(restaurant)
        router.push(`/getmenu/${restaurant.id}`)
    }

    const onMouseEnter = () => {
        setHover(!hover)
    }
    return (
        <Grid item xs={sort}>
            <Card
                onClick={handleClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseEnter}
                raised={hover}
                className={styles.card}
            >
                <CardHeader
                    title={<Typography>Ресторан: {restaurant.name}</Typography>}
                ></CardHeader>
                <CardContent>
                    <Typography>Адресс: {restaurant.address}</Typography>
                    <Typography>Порт: {restaurant.port}</Typography>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Grid>
    )
}

export default memo(RestaurantCard)
