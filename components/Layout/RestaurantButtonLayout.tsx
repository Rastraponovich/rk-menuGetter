import { Button, Paper } from "@material-ui/core"
import React, { FC } from "react"

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
        <Paper
            sx={{ my: 1, p: 2, ["& > *:not(:last-child)"]: { mr: 1 } }}
            elevation={4}
        >
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
        </Paper>
    )
}

export default RestaurantButtonLayout
