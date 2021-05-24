import React, { useCallback, useState } from "react"
import Link from "next/link"
import { restConf } from "@/restconf/restconf"
import { IRestaurant, IResult } from "@/types/common"

import Layout from "@/components/Layout/Layout"
import RestaurantList from "@/components/RestaurantList/RestaurantList"
import { GetServerSideProps, NextPage } from "next"
import {
    Backdrop,
    Button,
    CircularProgress,
    Typography,
    useTheme,
} from "@material-ui/core"
import LoadingLayout from "@/components/Layout/LoadingLayout"
import axios, { AxiosResponse } from "axios"
import { makeUrl } from "@/lib/getData"

interface InputProps {
    restaurants: IRestaurant[]
}

const Home: NextPage<InputProps> = ({ restaurants }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant>()
    const theme = useTheme()
    const handleClick = useCallback(
        (restaurant: IRestaurant) => {
            setSelectedRestaurant(restaurant)
            setLoading(true)
        },
        [setSelectedRestaurant]
    )
    const handleClose = () => {
        setLoading(false)
    }

    return (
        <Layout title="Главная" loading={loading}>
            <RestaurantList restaurants={restaurants} select={handleClick} />

            <Backdrop
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    color: "#fff",
                }}
                open={loading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Layout>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            restaurants: restConf.restaurants,
        },
    }
}
