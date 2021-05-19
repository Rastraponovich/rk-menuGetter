import React, { useCallback, useEffect, useMemo, useState } from "react"
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
    Typography,
} from "@material-ui/core"

// import MenuView from "@/components/MenuView/MenuView"
import dynamic from "next/dynamic"

const RestaurantButtonLayout = dynamic(
    () => import("@/components/Layout/RestaurantButtonLayout"),
    {
        ssr: false,
    }
)
const MenuView = dynamic(() => import("@/components/MenuView/MenuView"), {
    ssr: false,
})

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
    const { address, port, username, password, name } = restaurant
    const [show, setShow] = useState(false)
    const [showDeleted, setShowDeleted] = useState(false)

    const [tree, setTree] = useState<IParsingTreeResult[]>(menu)
    const [info, setInfo] = useState("")
    const [status, setStatus] = useState<string>(
        connectionState.RK7QueryResult?.Status || connectionState.message
    )

    const memoTree = useMemo(() => tree, [tree])

    const handleCheckConnection = async () => {
        const url: string = makeUrl(address, port)
        const request: AxiosResponse<IResult> = await axios.post(
            "/api/status",
            { url, username, password }
        )
        let infoMessage = ""

        if (request.data?.RK7QueryResult?.Status) {
            setStatus(request.data.RK7QueryResult.Status)
            for (let [key, value] of Object.entries(
                request.data.RK7QueryResult
            )) {
                infoMessage += `${key}: ${value} ,`
            }
        } else {
            setStatus(request.data.message)

            for (let [key, value] of Object.entries(request.data)) {
                infoMessage += `${key}: ${value} ,`
            }
        }
        setInfo(infoMessage)
    }

    // const handleGetMenu = async () => {
    //     const url = `/api/categlist`
    //     const params = makeUrl(restaurant.address, restaurant.port)
    //     const response = await axios.post(url, { url: params })
    //     if (response.data) {
    //         setTree(pasringTree(response.data))
    //     }
    // }

    const checkConnect = useCallback(() => {
        handleCheckConnection()
    }, [status])

    const getMenu = useCallback(() => {
        // handleGetMenu()
    }, [status])

    const exportMenu = useCallback(() => {}, [status])

    const handleBack = () => {
        router.back()
    }
    return (
        <Layout title={`Ресторан : ${name}`}>
            <section className={styles.block}>
                <Typography variant="h3">Ресторан: {name}</Typography>
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showDeleted}
                                    onChange={() =>
                                        setShowDeleted(!showDeleted)
                                    }
                                />
                            }
                            label="Показать Удаленные"
                        />
                    </Grid>
                    <Grid item container xs={3}>
                        <RestaurantButtonLayout
                            checkConnection={checkConnect}
                            data={memoTree}
                            // getMenu={getMenu}
                            exportMenu={exportMenu}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        {info.length > 0 ? info : null}
                    </Grid>
                </Grid>

                <Divider />
                {show ? (
                    <MenuView items={memoTree} showDeleted={showDeleted} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const restaurant: IRestaurant = restConf.restaurants.find(
        (item) => item.id.toString() === context.query.id
    )

    const getMenu = async () => {
        const endpoint = `http://localhost:3000/api/categlist`
        const response = await axios.post(endpoint, restaurant)
        if (response.data) {
            return pasringTree(response.data)
        } else return []
    }

    const request: AxiosResponse<IResult> = await axios.post(
        "http://localhost:3000/api/status",
        restaurant
    )

    let menu = []

    if (request.data?.RK7QueryResult?.Status === "Ok") {
        menu = await getMenu()
    }

    return {
        props: {
            restaurant,
            connectionState: request.data,
            menu: menu.filter((item) => item.Ident),
        },
    }
}
