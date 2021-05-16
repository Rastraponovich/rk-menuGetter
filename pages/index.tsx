import React, { useState } from "react"
import Link from "next/link"
import { restConf } from "@/restconf/restconf"
import { IRestaurant } from "@/types/common"

import Layout from "@/components/Layout/Layout"
import RestaurantList from "@/components/RestaurantList/RestaurantList"

const Home = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>(
        restConf.restaurants
    )

    return (
        <Layout title="Главная">
            <h2>hello</h2>

            <RestaurantList restaurants={restaurants} />

            <Link href="/getmenu">Меню</Link>
        </Layout>
    )
}

export default Home
