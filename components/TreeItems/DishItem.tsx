import React, { FC, memo } from "react"
import { IDish } from "@/types/common"
import { ListItem, ListItemText } from "@material-ui/core"

interface InputPorps {
    dish: IDish
    idx?: number
}
const DishItem: FC<InputPorps> = ({ dish, idx }) => {
    const handleClick = () => {
        const message = `${dish.Name} : ${dish.Price}`

        console.log(message)
    }
    return (
        <ListItem button divider dense onClick={handleClick}>
            <ListItemText
                primary={`${idx + 1}. ${dish.Name} : ${dish.Price / 100}`}
            />
        </ListItem>
    )
}

export default memo(DishItem)
