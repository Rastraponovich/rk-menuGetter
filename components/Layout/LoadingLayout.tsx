import { Typography } from "@material-ui/core"
import React, { FC, memo } from "react"
interface InputProps {
    loading: boolean
}

const LoadingLayout: FC<InputProps> = ({ loading }) => {
    return (
        <>{loading ? <Typography>Подождите идет загрузка</Typography> : null}</>
    )
}

export default memo(LoadingLayout)
