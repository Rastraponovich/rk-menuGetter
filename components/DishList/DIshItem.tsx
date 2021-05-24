import { getStatusItem } from "@/lib/parsingTree"
import { IDish } from "@/types/common"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import React, { FC, memo } from "react"
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded"
interface InputProps {
    dish: IDish
    select: (dish: IDish) => void
    selected: IDish
}

const DIshItem: FC<InputProps> = ({ dish, select, selected }) => {
    const { name, price, status, type, ident } = dish
    const handleClick = () => {
        select(dish)
    }

    return (
        <ListItem
            dense
            button
            selected={ident === selected.ident}
            divider
            onClick={handleClick}
        >
            <ListItemIcon>
                <InsertDriveFileRoundedIcon />
            </ListItemIcon>
            <ListItemText
                primary={name}
                // secondary={"Цена: " + dish.Price / 100}
                secondary={status}
            />
        </ListItem>
    )
}

export default memo(DIshItem)
