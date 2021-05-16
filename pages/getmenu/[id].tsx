import React, { useCallback, useEffect, useMemo, useState } from "react"
import { NextPage } from "next"

import { useRouter } from "next/router"
import axios, { AxiosResponse } from "axios"
import { makeUrl } from "@/lib/getData"
import { pasringTree } from "@/lib/parsingTree"

import { IParsingTreeResult, IRestaurant } from "@/types/common"
import { restConf } from "@/restconf/restconf"
import { IRK7QueryResult } from "@/types/rk7"
import styles from "@/styles/Restaurant.module.css"

import Layout from "@/components/Layout/Layout"
import { Button, Divider, Paper, Typography } from "@material-ui/core"
import RestaurantButtonLayout from "@/components/Layout/RestaurantButtonLayout"
import LoadingLayout from "@/components/Layout/LoadingLayout"
import TreeItems from "@/components/TreeItems/TreeItems"

interface InputProps {}

const bulk: IRestaurant = {
    name: "",
    address: "",
    port: 0,
    genRestName: "",
    id: 0,
}

const Restaurant: NextPage<InputProps> = (props) => {
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [tree, setTree] = useState<IParsingTreeResult[]>([])
    const [status, setStatus] = useState<string>("")
    const [restaurant, setRestaurant] = useState<IRestaurant>(bulk)

    const memoTree = useMemo(() => tree, [tree])

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
        console.log(request.data)
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
                        checkConnection={checkConnect}
                        getMenu={getMenu}
                        exportMenu={exportMenu}
                    />
                </Paper>

                <LoadingLayout loading={loading} />
                <TreeItems arr={memoTree} />

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
