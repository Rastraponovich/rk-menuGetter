import { Button, Paper } from "@material-ui/core"
import React, { FC, memo } from "react"

interface InputProps {
    checkConnection?: () => void
    getMenu?: () => void
    exportMenu?: () => void
}

const RestaurantButtonLayout: FC<InputProps> = ({
    checkConnection,
    getMenu,
    exportMenu,
}) => {
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
                Сохранить в файл
            </Button>
        </div>
    )
}

export default memo(RestaurantButtonLayout)
