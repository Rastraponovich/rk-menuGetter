import { IDish } from "@/types/common"
import { Card, CardContent, Typography } from "@material-ui/core"
import React, { FC, memo } from "react"

interface InputProps {
    dish: IDish
}

const DishCard: FC<InputProps> = ({ dish }) => {
    return (
        <Card>
            <CardContent>
                <Typography>Наименование: {dish.Name}</Typography>
                <Typography>Цена: {dish.Price / 100}</Typography>
                <Typography>Каталог: {dish.CategPath}</Typography>
            </CardContent>
        </Card>
    )
}

export default memo(DishCard)
