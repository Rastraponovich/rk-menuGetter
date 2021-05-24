import axios from "axios"
import React, { useState } from "react"
import { pasringTree } from "@/lib/parsingTree"

import { IParsingTreeResult } from "@/types/common"
import { ICategListItem } from "@/types/rk7CategList"
import Layout from "@/components/Layout/Layout"
import TreeItems from "@/components/TreeItems/TreeItems"

const index = () => {
    const [tree, setTree] = useState<IParsingTreeResult[]>([])
    const [rest, setRest] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (event: any) => {
        const { id, value } = event.target

        setRest(value)
    }

    const getCategList = async () => {
        const url = `/api/refdata?name=CATEGLIST&wmp=1&childs=true&genRestName=Сибас`
        const response = await axios.get(url)
        if (response.data) {
            const result: ICategListItem =
                response.data.RK7QueryResult.CommandResult.RK7Reference.Items
                    .Item
        }
    }

    const getCategList2 = async () => {
        setLoading(true)
        const url = `/api/categlist`
        const response = await axios.get(url)
        if (response.data) {
            const result: IParsingTreeResult[] = pasringTree(response.data)
            console.log(result)
            setTree(result)
            setLoading(false)
        }
    }

    return (
        <Layout title="выгрузка меню">
            <h2>hello</h2>
            <div>
                <input type="text" value={rest} onChange={handleChange} />
                <button onClick={() => alert(rest)}>show data</button>
            </div>
            <button onClick={getCategList}>категории</button>
            <button onClick={getCategList2}>getCategList2</button>
            <span>{loading ? "Загрузка" : null}</span>

            {/* <TreeItems arr={tree} /> */}
        </Layout>
    )
}

export default index
