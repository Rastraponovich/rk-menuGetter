import React, { useCallback, useMemo, useState } from "react"
import { GetServerSideProps, NextPage } from "next"

import { useRouter } from "next/router"
import axios, { AxiosResponse } from "axios"
import { makeUrl } from "@/lib/getData"
import { pasringTree } from "@/lib/parsingTree"

import { IParsingTreeResult, IRestaurant, IResult } from "@/types/common"
import { restConf } from "@/restconf/restconf"
import styles from "@/styles/Restaurant.module.css"

import Layout from "@/components/Layout/Layout"
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Typography,
} from "@material-ui/core"
import RestaurantButtonLayout from "@/components/Layout/RestaurantButtonLayout"
import LoadingLayout from "@/components/Layout/LoadingLayout"
import MenuView from "@/components/MenuView/MenuView"

interface InputProps {
    restaurant: IRestaurant
    connectionState: IResult
    menu: any
}

const Restaurant: NextPage<InputProps> = ({
    connectionState,
    restaurant,
    menu,
}) => {
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [show, setShow] = useState(false)

    const [tree, setTree] = useState<IParsingTreeResult[]>(menu)
    const [status, setStatus] = useState<string>(
        connectionState.RK7QueryResult.Status
    )

    const memoTree = useMemo(() => tree, [tree])

    const handleCheckConnection = async () => {
        const url: string = makeUrl(restaurant.address, restaurant.port)
        const request: AxiosResponse<IResult> = await axios.post(
            "/api/status",
            { url }
        )

        if (request.data?.RK7QueryResult.Status) {
            setStatus(request.data.RK7QueryResult.Status)
        } else {
            setStatus(request.data.message)
        }
    }

    const handleGetMenu = async () => {
        setLoading(true)
        const url = `/api/categlist`
        const response = await axios.get(url)

        if (response.data) {
            setTree(pasringTree(response.data))
            setLoading(false)
        }
    }

    const checkConnect = useCallback(() => {
        handleCheckConnection()
    }, [status])

    const getMenu = useCallback(() => {
        handleGetMenu()
    }, [status])

    const exportMenu = useCallback(() => {}, [status])

    const handleBack = () => {
        router.back()
    }
    return (
        <Layout title={`Ресторан : ${restaurant.name}`}>
            <section className={styles.block}>
                <Typography variant="h3">
                    Ресторан: {restaurant.name}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography>
                            Адрес сервера: {restaurant.address}
                        </Typography>
                        <Typography>Порт: {restaurant.port}</Typography>
                        <Typography>Статус Сервера: {status}</Typography>
                        <Divider />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={show}
                                    onChange={() => setShow(!show)}
                                />
                            }
                            label="Показать меню"
                        />
                    </Grid>
                    <Grid item container xs={6}>
                        <RestaurantButtonLayout
                            checkConnection={checkConnect}
                            getMenu={getMenu}
                            exportMenu={exportMenu}
                        />
                    </Grid>
                </Grid>

                <LoadingLayout loading={loading} />
                <Divider />
                {show ? <MenuView items={memoTree} /> : null}

                <div style={{ flexGrow: 1 }}></div>
                <Button
                    sx={{ alignSelf: "flex-start" }}
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                >
                    Назад
                </Button>
            </section>
        </Layout>
    )
}

export default Restaurant

export const getServerSideProps: GetServerSideProps = async (context) => {
    const restaurant: IRestaurant = restConf.restaurants.find(
        (item) => item.id.toString() === context.query.id
    )
    const url = makeUrl(restaurant.address, restaurant.port)

    const getMenu = async (params?: any) => {
        const endpoint = `http://localhost:3000/api/categlist`
        const response = await axios.post(endpoint, { url: params })
        if (response.data) {
            return pasringTree(response.data)
        } else return []
    }

    const request: AxiosResponse<IResult> = await axios.post(
        "http://localhost:3000/api/status",
        { url }
    )

    let menu = []

    if (request.data.RK7QueryResult.Status === "Ok") {
        menu = await getMenu(url)
    }

    return {
        props: {
            restaurant,
            connectionState: request.data,
            menu,
        },
    }
}
