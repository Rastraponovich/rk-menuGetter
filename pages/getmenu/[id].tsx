import React, { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { IParsingTreeResult, IRestaurant } from "@/types/common"
import { restConf } from "@/restconf/restconf"
import styles from "@/styles/Restaurant.module.css"

import Layout from "@/components/Layout/Layout"
import { Button, Divider, Paper, Typography } from "@material-ui/core"
import { pasringTree } from "@/lib/parsingTree"
import axios, { AxiosResponse } from "axios"
import RestaurantButtonLayout from "@/components/Layout/RestaurantButtonLayout"
import { makeUrl } from "@/lib/getData"
import { IRK7QueryResult } from "@/types/rk7"
import { useTimer } from "@/hooks/useTimer"

interface InputProps {}

const bulk: IRestaurant = {
    name: "",
    address: "",
    port: 0,
    genRestName: "",
    id: 0,
}

const Restaurant: FC<InputProps> = (props) => {
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [tree, setTree] = useState<IParsingTreeResult[]>([])
    const [status, setStatus] = useState<string>("")
    const [restaurant, setRestaurant] = useState<IRestaurant>(bulk)
    const [timer, setTimer] = useState(10)

    // const timerF = useTimer(120, setTimer, 1000)

    // console.log(timer)
    useEffect(() => {
        const result = restConf.restaurants.find(
            (item) => item.id.toString() === router.query.id
        )
        setRestaurant({ ...restaurant, ...result })
    }, [router.query.id])

    useEffect(() => {
        if (restaurant.address.length > 0) {
            handleCheckConnection()
        }
    }, [router.query.id])

    const handleCheckConnection = async () => {
        const url: string = makeUrl(restaurant.address, restaurant.port)
        const request: AxiosResponse<IRK7QueryResult> = await axios.post(
            "/api/status",
            { url }
        )
        if (request.data?.Status) {
            setStatus(request.data.Status)
        } else {
            setStatus("")
        }
    }

    const handleGetMenu = async () => {
        setLoading(true)
        const url = `/api/categlist`
        const response = await axios.get(url)
        if (response.data) {
            const result: IParsingTreeResult[] = pasringTree(response.data)
            console.log(result)
            setTree(result)
            setLoading(false)
        }
    }

    const hanldeExportMenu = () => {}
    const handleBack = () => {
        router.back()
    }
    return (
        <Layout>
            <section className={styles.block}>
                <Typography variant="h3">
                    Ресторан: {restaurant.name}
                </Typography>

                <Divider />
                <Paper sx={{ mb: 1, p: 2 }}>
                    <Typography>Адрес сервера: {restaurant.address}</Typography>
                    <Typography>Порт: {restaurant.port}</Typography>
                    <Typography variant="caption">
                        Статус Сервера: {status === "Ok" ? "Ок" : "Нет связи"}
                    </Typography>
                    <RestaurantButtonLayout
                        checkConnection={handleCheckConnection}
                        getMenu={handleGetMenu}
                        exportMenu={hanldeExportMenu}
                    />
                </Paper>

                {loading ? (
                    <Typography>Подождите идет загрузка</Typography>
                ) : null}

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
