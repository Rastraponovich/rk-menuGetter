import { IRestaurant } from "@/types/common"
import { Button, Divider, Grid, GridSize } from "@material-ui/core"
import React, { FC, useState } from "react"
import RestaurantCard from "../RestaurantCard/RestaurantCard"

interface InputProps {
    restaurants: IRestaurant[]
    select: (restaurant: IRestaurant) => void
}

const RestaurantList: FC<InputProps> = ({ restaurants, select }) => {
    const [sort, setSort] = useState<GridSize>(3)

    const handleChangeView = () => {
        setSort(sort === 3 ? 12 : 3)
    }
    return (
        <>
            <Button onClick={handleChangeView}>изменить вид</Button>
            <Divider />
            <Grid container spacing={2} alignItems="stretch" direction="row">
                {restaurants.map((restaurant, idx) => (
                    <RestaurantCard
                        restaurant={restaurant}
                        idx={idx}
                        key={restaurant.name}
                        sort={sort}
                        select={select}
                    />
                ))}
            </Grid>
        </>
    )
}

export default RestaurantList
