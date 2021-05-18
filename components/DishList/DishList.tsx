import { IDish, IParsingTreeResult } from "@/types/common"
import { List, ListItem, ListItemText } from "@material-ui/core"
import React, { FC, memo } from "react"
import DIshItem from "./DIshItem"

interface InputProps {
    selectedMenuItem: IParsingTreeResult
    selectedDish: IDish
    select: (dish: IDish) => void
}

const DishList: FC<InputProps> = ({
    selectedMenuItem,
    selectedDish,
    select,
}) => {
    return (
        <List dense>
            {selectedMenuItem.dishes.map((dish) => (
                <DIshItem
                    select={select}
                    selected={selectedDish}
                    dish={dish}
                    key={dish.Ident + dish.Name}
                />
            ))}
        </List>
    )
}

export default memo(DishList)
