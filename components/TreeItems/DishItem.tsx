import React, { FC } from "react"
import { IDish } from "@/types/common"

interface InputPorps {
    dish: IDish
    idx?: number
}
const DishItem: FC<InputPorps> = ({ dish, idx }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 1.5rem",
            }}
        >
            {idx + 1}. {dish.Name} : {dish.Price / 100}
        </div>
    )
}

export default DishItem
