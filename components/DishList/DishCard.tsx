import { IDish } from "@/types/common"
import { Card, CardContent, Typography } from "@material-ui/core"
import React, { FC, memo } from "react"

interface InputProps {
    dish: IDish
}

const DishCard: FC<InputProps> = ({ dish }) => {
    const { name, ident, status, price, type, categPath } = dish
    return (
        <Card>
            <CardContent>
                <Typography>Наименование: {name}</Typography>
                <Typography>Цена: {price}</Typography>
                <Typography>Каталог: {categPath}</Typography>
            </CardContent>
        </Card>
    )
}

export default memo(DishCard)
