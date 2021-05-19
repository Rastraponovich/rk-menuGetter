import { Button, Paper } from "@material-ui/core"
import React, { FC, memo, useEffect, useState } from "react"
import dynamic from "next/dynamic"

interface InputProps {
    checkConnection?: () => void
    getMenu?: () => void
    exportMenu?: () => void
    data?: any
}

const RestaurantButtonLayout: FC<InputProps> = ({
    checkConnection,
    getMenu,
    exportMenu,
    data,
}) => {
    const result = data.map((item) => JSON.stringify(item, null, " "))
    const blob = new Blob([result], { type: "application/json" })

    return (
        <div className="button__group">
            <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={!checkConnection}
                onClick={checkConnection}
            >
                Проверка связи
            </Button>
            <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={!getMenu}
                onClick={getMenu}
            >
                Получить меню
            </Button>
            <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={!exportMenu}
                onClick={exportMenu}
            >
                <a href={URL.createObjectURL(blob)} download="my-text.txt">
                    Сохранить в файл
                </a>
            </Button>
        </div>
    )
}

export default memo(RestaurantButtonLayout)
