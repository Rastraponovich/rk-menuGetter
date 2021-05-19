import { IDish, IParsingTreeResult } from "@/types/common"
import { List, ListItem, ListItemText } from "@material-ui/core"
import React, { FC, memo } from "react"
import DIshItem from "./DIshItem"

interface InputProps {
    selectedMenuItem: IParsingTreeResult
    selectedDish: IDish
    select: (dish: IDish) => void
    showDeleted: boolean
}

const DishList: FC<InputProps> = ({
    selectedMenuItem,
    selectedDish,
    select,
    showDeleted,
}) => {
    const filter = showDeleted ? "" : "rsDeleted"

    return (
        <List dense>
            {selectedMenuItem.dishes
                .filter((fil) => fil.Status !== filter)
                .map((dish) => (
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
