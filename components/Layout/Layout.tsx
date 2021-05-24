import React, { FC } from "react"
import Head from "next/head"
import Header from "../Header/Header"
import LoadingLayout from "./LoadingLayout"

interface InputLayoutProps {
    title?: string
    children: any
    loading: boolean
}

const Layout: FC<InputLayoutProps> = ({ title, children, loading }) => {
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
            {loading ? <LoadingLayout loading={loading} /> : null}

            <main className="container">{children}</main>
            <footer></footer>
        </>
    )
}

export default Layout
