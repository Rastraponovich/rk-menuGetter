import { getStatusItem } from "@/lib/parsingTree"
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
    const dishStatus = getStatusItem(dish.Status)

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
                // secondary={"Цена: " + dish.Price / 100}
                secondary={dishStatus}
            />
        </ListItem>
    )
}

export default memo(DIshItem)
