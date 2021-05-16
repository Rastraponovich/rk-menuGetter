import React, { FC } from "react"
import Head from "next/head"
import Header from "../Header/Header"

interface InputLayoutProps {
    title?: string
    children: any
}

const Layout: FC<InputLayoutProps> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Header title={title} />
            <main className="container">{children}</main>
            <footer></footer>
        </>
    )
}

export default Layout
