import Layout from "@/components/Layout/Layout"
import { IRIChildItems, IRK7QueryResult } from "@/types/rk7"
import { ICategListItem, IRK7CategListResult } from "@/types/rk7CategList"
import { IMenuItem, IMenuItems } from "@/types/rk7Menuitems"
import axios from "axios"
import React, { useState } from "react"

const Home = () => {
    const [restIdent, setRestIdent] = useState(0)
    const [menuItems, setMenuItems] = useState([])
    const [tree, setTree] = useState([])

    const handleClick = async () => {
        const url = `/api/refdata?name=PRICES&wmp=1&Value=15000`
        const result = await axios.get(url)
        console.log(
            result.data.RK7QueryResult?.CommandResult?.RK7Reference?.Items.Item
        )
    }

    const getMenuItems = async () => {
        const url = `/api/refdata?name=MENUITEMS&wmp=1&HighLevelGroup1=${restIdent}`
        const response = await axios.get(url)

        if (response.data) {
            const result: IMenuItem[] =
                response.data.RK7QueryResult.CommandResult.RK7Reference.Items
                    .Item

            console.log(result)
            setMenuItems(result)
        }
    }

    const getCategList = async () => {
        const url = `/api/refdata?name=CATEGLIST&wmp=1&childs=true&genRestName=Сибас`
        const response = await axios.get(url)
        if (response.data) {
            const result: ICategListItem =
                response.data.RK7QueryResult.CommandResult.RK7Reference.Items
                    .Item
            setRestIdent(result.Ident)
        }
    }

    const getCategList2 = async () => {
        const url = `/api/categlist`
        const response = await axios.get(url)
        if (response.data) {
            const result: IRIChildItems =
                response.data.RK7QueryResult.CommandResult.RK7Reference
                    .RIChildItems
            let test

            if (Array.isArray(result.TCategListItem)) {
                test = {
                    ...test,
                    directories: result.TCategListItem.map((item) => {
                        const x = parsing(item)
                        return {
                            Ident: item.Ident,
                            Name: item.Name,
                            childs: x,
                        }
                    }),
                }
            } else {
                test = {
                    ...test,
                    directiores: [
                        {
                            Ident: result.TCategListItem.Ident,
                            Name: result.TCategListItem.Name,
                        },
                    ],
                }
            }
            setTree(test.directories)
        }
    }

    const parsingDishes = (dish: IMenuItem | IMenuItem[]) => {
        if (Array.isArray(dish)) {
            return dish.map((item) => {
                return {
                    Name: item.Name,
                    Ident: item.Ident,
                    CategPath: item.CategPath,
                    Price: item["PRICETYPES-3"],
                }
            })
        } else {
            return [{ ...dish }]
        }
    }

    const parsing = (item: ICategListItem | ICategListItem[]) => {
        if (Array.isArray(item)) {
            return item.map((element) => {
                let childs: any
                let dishes: any
                if (element.RIChildItems.TCategListItem) {
                    childs = parsing(element.RIChildItems.TCategListItem)
                }
                if (element.RIChildItems.TRK7MenuItem) {
                    dishes = parsingDishes(element.RIChildItems.TRK7MenuItem)
                }

                return {
                    Name: element.Name,
                    Ident: element.Ident,
                    childs: childs || [],
                    dishes: dishes || [],
                }
            })
        } else {
            if (item.RIChildItems.TCategListItem) {
                let dishes: any
                if (item.RIChildItems.TRK7MenuItem) {
                    dishes = parsingDishes(item.RIChildItems.TRK7MenuItem)
                }
                return {
                    Ident: item.Ident,
                    Name: item.Name,
                    childs: parsing(item.RIChildItems.TCategListItem) || [],
                    dishes: dishes || [],
                }
            }
        }
    }

    return (
        <Layout title="Главная">
            <h2>hello</h2>
            <h5>{restIdent}</h5>
            <h5>Количество блюд : {menuItems.length}</h5>
            <button onClick={handleClick}>test</button>
            <button onClick={getCategList}>категории</button>
            <button onClick={getMenuItems}>блюда</button>
            <button onClick={getCategList2}>getCategList2</button>

            {tree.map((item) => (
                <div key={item.Name}>
                    {item.Name.childs
                        ? item.Name.childs.map((child) => <p>{child.Name}</p>)
                        : item.Name}
                </div>
            ))}
        </Layout>
    )
}

export default Home
