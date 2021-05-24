import React, { FC } from "react"
import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core"

import { useRouter } from "next/router"

interface InputProps {
    title: string
}

const Header: FC<InputProps> = ({ title }) => {
    const router = useRouter()

    const hanldeClick = () => {
        router.push("/")
    }

    const StyledToolbar = withStyles({
        root: {
            background: "linear-gradient(45deg, #4BA25D 30%, #70D27B 90%)",
        },
    })(Toolbar)

    return (
        <AppBar position="static">
            <StyledToolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    onClick={hanldeClick}
                >
                    {title}
                </Typography>
                <div className="bulk"></div>
            </StyledToolbar>
        </AppBar>
    )
}

export default Header
