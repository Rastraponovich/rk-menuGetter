import React from "react"
import { GetServerSideProps, NextPage } from "next"

import axios, { AxiosResponse } from "axios"
import { pasringTree } from "@/lib/parsingTree"
import { IParsingTreeResult, IRestaurant, IResult } from "@/types/common"
import { restConf } from "@/restconf/restconf"

import RestaurantPage from "@/components/RestaurantPage/RestaurantPage"

interface InputProps {
    restaurant: IRestaurant
    connectionState: IResult
    menu: IParsingTreeResult[] | []
    dataVersion?: number
    xlsx: any[][]
}

const Restaurant: NextPage<InputProps> = ({
    connectionState,
    restaurant,
    dataVersion,
    menu,
    xlsx,
}) => {
    return (
        <RestaurantPage
            connectionState={connectionState}
            restaurant={restaurant}
            menu={menu}
            dataVersion={dataVersion}
            bookData={xlsx}
        />
    )
}

export default Restaurant

export const getServerSideProps: GetServerSideProps = async (context) => {
    const restaurant: IRestaurant = restConf.restaurants.find(
        (item) => item.id.toString() === context.query.id
    )
    const request: AxiosResponse<IResult> = await axios.post(
        "http://localhost:3000/api/status",
        restaurant
    )

    let dataVersion: number = 0

    const getMenu = async () => {
        const endpoint = `http://localhost:3000/api/categlist`
        const response: AxiosResponse<IResult> = await axios.post(
            endpoint,
            restaurant
        )

        let result: { menu: IParsingTreeResult[]; xlsx: any } = {
            menu: [],
            xlsx: "",
        }
        if (response.data) {
            dataVersion =
                response.data.RK7QueryResult.CommandResult.RK7Reference
                    .DataVersion
            result = pasringTree(response.data, restaurant.type)
        }
        return result
    }
    const { menu, xlsx } = await getMenu()
    return {
        props: {
            restaurant,
            connectionState: request.data,
            menu,
            dataVersion,
            xlsx,
        },
    }
}
