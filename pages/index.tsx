import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { restConf } from "@/restconf/restconf"
import { IRestaurant } from "@/types/common"

import Layout from "@/components/Layout/Layout"
import RestaurantList from "@/components/RestaurantList/RestaurantList"
import { GetServerSideProps, NextPage } from "next"
import { Typography } from "@material-ui/core"
import LoadingLayout from "@/components/Layout/LoadingLayout"

interface InputProps {
    restaurants: IRestaurant[]
}

const Home: NextPage<InputProps> = ({ restaurants }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant>()

    const handleClick = useCallback(
        (restaurant: IRestaurant) => {
            setSelectedRestaurant(restaurant)
            setLoading(true)
        },
        [setSelectedRestaurant]
    )

    return (
        <Layout title="Главная">
            <h2>hello</h2>

            <LoadingLayout loading={loading} />
            <RestaurantList restaurants={restaurants} select={handleClick} />

            <Link href="/getmenu">Меню</Link>
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
