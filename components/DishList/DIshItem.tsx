import { IDish } from "@/types/common"
import { ListItem, ListItemText } from "@material-ui/core"
import React, { FC, memo } from "react"

interface InputProps {
    dish: IDish
    select: (dish: IDish) => void
    selected: IDish
}

const DIshItem: FC<InputProps> = ({ dish, select, selected }) => {
    const handleClick = () => {
        select(dish)
    }

    return (
        <ListItem
            dense
            button
            selected={dish.Ident === selected.Ident}
            divider
            onClick={handleClick}
        >
            <ListItemText
                primary={dish.Name}
                secondary={"Цена: " + dish.Price / 100}
            />
        </ListItem>
    )
}

export default memo(DIshItem)
