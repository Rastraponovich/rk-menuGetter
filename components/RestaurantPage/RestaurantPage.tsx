import React, { FC, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

import { IParsingTreeResult, IRestaurant, IResult } from "@/types/common"
import styles from "@/styles/Restaurant.module.css"
import { pasringTree } from "@/lib/parsingTree"

import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Typography,
} from "@material-ui/core"
import Layout from "../Layout/Layout"
import LoadingLayout from "../Layout/LoadingLayout"
import axios, { AxiosResponse } from "axios"
import { createBook } from "@/lib/xlsxLib"

interface InputProps {
    restaurant: IRestaurant
    connectionState: IResult
    menu: IParsingTreeResult[] | []
    dataVersion?: number
    bookData: any[][]
}

const RestaurantButtonLayout = dynamic(
    () => import("@/components/Layout/RestaurantButtonLayout"),
    {
        ssr: false,
    }
)
const MenuView = dynamic(() => import("@/components/MenuView/MenuView"), {
    ssr: false,
})

const RestaurantPage: FC<InputProps> = ({
    connectionState,
    restaurant,
    menu,
    bookData,
    dataVersion,
}) => {
    const router = useRouter()
    const { address, port, username, password, name } = restaurant

    const [show, setShow] = useState(false)
    const [showDeleted, setShowDeleted] = useState(false)
    const [tree, setTree] = useState<IParsingTreeResult[]>(menu)
    const [book, setBook] = useState(bookData)
    const [loading, setLoading] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)

    const [status, setStatus] = useState<string>(
        connectionState.RK7QueryResult?.Status || connectionState.message
    )

    useEffect(() => {
        if (tree.length === 0) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [tree])

    useEffect(() => {
        if (status !== "Ok") {
            setLoadingStatus(true)
        } else {
            setLoadingStatus(false)
        }
    }, [status])

    const checkConnect = async () => {
        setStatus("Обновляем")
        const request: AxiosResponse<IResult> = await axios.post(
            "/api/status",
            restaurant
        )
        if (request.data) {
            setStatus(
                request.data.RK7QueryResult?.Status || connectionState.message
            )
        }
    }

    const getMenu = async () => {
        setTree([])
        setBook([])
        const response = await axios.post("/api/categlist", {
            ...restaurant,
            dataVersion,
        })

        let result
        if (restaurant.type) {
            result = pasringTree(response.data, restaurant.type)
        } else result = pasringTree(response.data)

        const { menu, xlsx } = result
        setBook(xlsx)
        setTree(menu)
    }

    const exportMenu = () => {
        createBook(book, restaurant)
    }

    const memoTree = useMemo(() => tree.filter((item) => item.ident), [tree])

    const handleBack = () => {
        router.back()
    }
    return (
        <Layout title={`Ресторан : ${name}`} loading={loading}>
            <section className={styles.block}>
                <Typography variant="h5">Ресторан: {name}</Typography>
                <Grid container spacing={2}>
                    <Grid item container xs={4} alignItems="start">
                        <RestaurantButtonLayout
                            checkConnection={checkConnect}
                            getMenu={getMenu}
                            exportMenu={exportMenu}
                            loading={loading}
                            loadingStatus={loadingStatus}
                        />
                    </Grid>
                    <Grid item container xs={4} alignItems="start">
                        <div className="button__group">
                            <Typography>Опции</Typography>
                            <Divider />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={show}
                                        onChange={() => setShow(!show)}
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        Показать меню
                                    </Typography>
                                }
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
                                label={
                                    <Typography variant="body2">
                                        Показать Удаленные
                                    </Typography>
                                }
                            />
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography>Свойства</Typography>
                        <Divider />

                        <Typography variant="body2">
                            Адрес сервера: {address}
                        </Typography>
                        <Typography variant="body2">Порт: {port}</Typography>
                        <Typography variant="body2">
                            Статус Сервера: {status}
                        </Typography>
                        <Typography variant="body2">
                            Версия данных: {dataVersion}
                        </Typography>
                        <Typography variant="body2">
                            Количество элементов: {book.length}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: "0.5rem" }} />

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

export default RestaurantPage
