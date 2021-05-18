import React, { FC, memo, useEffect } from "react"
import LinearProgress from "@material-ui/core/LinearProgress"

interface InputProps {
    loading: boolean
}

const LoadingLayout: FC<InputProps> = ({ loading }) => {
    const [progress, setProgress] = React.useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0
                }
                const diff = Math.random() * 10
                return Math.min(oldProgress + diff, 100)
            })
        }, 500)

        return () => {
            clearInterval(timer)
        }
    }, [loading])

    return (
        <div style={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={progress} />
        </div>
    )
}
export default memo(LoadingLayout)
