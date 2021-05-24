import { IDish, IParsingTreeResult } from "@/types/common"
import { IRIChildItems } from "@/types/rk7"
import { ICategListItem } from "@/types/rk7CategList"
import { IMenuItem } from "@/types/rk7Menuitems"

enum Types {
    "rsDeleted" = "Удален",
    "rsInactive" = "Неактивен",
    "rsActive" = "Активен",
    "rsDraft" = "Черновик",
}

export const getStatusItem = (value: string): string => {
    switch (Types[value]) {
        case Types[value]:
            return Types[value]
    }
}

let xlsx = []

export const pasringTree = (
    value: any,
    type?: string
): { menu: IParsingTreeResult[]; xlsx: any } => {
    xlsx.push(["Каталог", "Блюдо", "цена", "статус"])
    let result: IRIChildItems =
        value.RK7QueryResult.CommandResult.RK7Reference.RIChildItems

    if (type) {
        result =
            value.RK7QueryResult.CommandResult.RK7Reference.Items.Item
                .RIChildItems
    }

    if (Array.isArray(result.TCategListItem)) {
        const prepareMenu = result.TCategListItem.map((item) =>
            parsingDirectory(item)
        )
        return {
            menu: prepareMenu.filter((item) => item !== undefined),
            xlsx,
        }
    } else {
        const prepareMenu = parsingDirectory(result.TCategListItem).childs
        return { menu: prepareMenu.filter((item) => item !== undefined), xlsx }
    }
}
const parsingDirectory = (item: ICategListItem | ICategListItem[]) => {
    if (Array.isArray(item)) {
        return item.map((element) => {
            if (element.Ident) {
                xlsx.push([
                    element.Name,
                    null,
                    null,
                    getStatusItem(element.Status),
                ])
                let childs: any
                let dishes: any
                if (element.RIChildItems?.TCategListItem) {
                    childs = parsingDirectory(
                        element.RIChildItems.TCategListItem
                    )
                }
                if (element.RIChildItems?.TRK7MenuItem) {
                    dishes = parsingDishes(element.RIChildItems.TRK7MenuItem)
                }

                return {
                    name: element.Name,
                    ident: element.Ident || null,
                    status: getStatusItem(element.Status),
                    type: "category",
                    childs: childs || [],
                    dishes: dishes || [],
                }
            }
        })
    } else {
        xlsx.push([item.Name, null, null, getStatusItem(item.Status)])
        if (item.RIChildItems?.TCategListItem) {
            let dishes: any
            if (item.RIChildItems?.TRK7MenuItem) {
                dishes = parsingDishes(item.RIChildItems.TRK7MenuItem)
            }
            return {
                ident: item.Ident || null,
                name: item.Name,
                status: getStatusItem(item.Status),
                type: "category",
                childs:
                    parsingDirectory(item.RIChildItems.TCategListItem) || [],
                dishes: dishes || [],
            }
        }
        if (item.RIChildItems?.TRK7MenuItem) {
            return {
                ident: item.Ident || null,
                name: item.Name,
                status: getStatusItem(item.Status),
                childs: [],
                type: "category",
                dishes: parsingDishes(item.RIChildItems.TRK7MenuItem) || [],
            }
        }
    }
}

const parsingDishes = (dish: IMenuItem | IMenuItem[]): IDish[] => {
    if (Array.isArray(dish)) {
        return dish.map((item) => {
            xlsx.push([
                null,
                item.Name,
                (item["PRICETYPES-3"] / 100).toString() || "0",
                getStatusItem(item.Status),
            ])

            return {
                name: item.Name,
                ident: item.Ident,
                status: getStatusItem(item.Status),
                type: "dish",
                categPath: item.CategPath,
                price: item["PRICETYPES-3"] / 100 || 0,
            }
        })
    } else {
        xlsx.push([
            null,
            dish.Name,
            (dish["PRICETYPES-3"] / 100).toString() || "0",
            getStatusItem(dish.Status),
        ])
        return [
            {
                name: dish.Name,
                ident: dish.Ident,
                type: "dish",
                status: getStatusItem(dish.Status),
                categPath: dish.CategPath,
                price: dish["PRICETYPES-3"] / 100 || 0,
            },
        ]
    }
}
