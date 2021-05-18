import { IDish, IParsingTreeResult } from "@/types/common"
import { Grid } from "@material-ui/core"
import React, { memo, FC, useCallback, useState, useMemo } from "react"
import DishCard from "../DishList/DishCard"
import DishList from "../DishList/DishList"
import TreeItems from "../TreeItems/TreeItems"

interface InputProps {
    items: IParsingTreeResult[]
}

const bulk: IParsingTreeResult = {
    Name: "",
    Type: "",
    Ident: 0,
    childs: [],
    dishes: [],
}

const bulkDish: IDish = {
    Name: "",
    Type: "dish",
    CategPath: "",
    Ident: 0,
    Price: 0,
}

const MenuView: FC<InputProps> = ({ items }) => {
    const [selectedMenuItem, setSelectedMenuItem] =
        useState<IParsingTreeResult>(bulk)

    const [selectedDish, setSelectedDish] = useState<IDish>(bulkDish)

    const memoItems = useMemo(() => items, [items])

    const selectDish = useCallback(
        (dish: IDish) => setSelectedDish(dish),
        [selectedDish]
    )

    const selectMenuItem = useCallback(
        (menuItem: IParsingTreeResult) => {
            setSelectedMenuItem(menuItem)
            selectDish(bulkDish)
        },
        [setSelectedMenuItem]
    )

    return (
        <Grid container>
            <Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
                <TreeItems
                    arr={memoItems}
                    select={selectMenuItem}
                    selected={selectedMenuItem}
                />
            </Grid>
            <Grid item xs={6} style={{ borderRight: "1px solid #e0e0e0" }}>
                <DishList
                    select={selectDish}
                    selectedMenuItem={selectedMenuItem}
                    selectedDish={selectedDish}
                />
            </Grid>
            <Grid item xs={3}>
                {selectedDish.Ident === 0 ? null : (
                    <DishCard dish={selectedDish} />
                )}
            </Grid>
        </Grid>
    )
}

export default memo(MenuView)
