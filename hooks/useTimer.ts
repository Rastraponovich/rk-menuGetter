import { useEffect } from "react"

export const useTimer = (
    value: number,
    cb: (value: number) => void,
    delay: number = 1000
) => {
    const data = value
    useEffect(() => {
        const timerID = setInterval(() => {
            if (data > 0) {
                cb(data - 1)
            } else {
                clearInterval(timerID)
            }
        }, delay)
        return function cleanup() {
            clearInterval(timerID)
        }
    })
}
