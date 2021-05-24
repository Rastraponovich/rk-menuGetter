import { Button, Divider, Paper, Typography } from "@material-ui/core"
import React, { FC, memo, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { LoadingButton } from "@material-ui/lab"
interface InputProps {
    checkConnection?: () => void
    getMenu?: () => void
    exportMenu?: () => void
    loading: boolean
    loadingStatus: boolean
}

const RestaurantButtonLayout: FC<InputProps> = ({
    checkConnection,
    getMenu,
    exportMenu,
    loading,
    loadingStatus,
}) => {
    return (
        <div className="button__group">
            <Typography>Функции</Typography>
            <Divider />

            <LoadingButton
                loading={loadingStatus}
                size="small"
                variant="contained"
                color="primary"
                disabled={!checkConnection}
                onClick={checkConnection}
            >
                Проверка связи
            </LoadingButton>
            <LoadingButton
                loading={loading}
                size="small"
                variant="contained"
                color="primary"
                disabled={!getMenu}
                onClick={getMenu}
            >
                Получить меню
            </LoadingButton>
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
