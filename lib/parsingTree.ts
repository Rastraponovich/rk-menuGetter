import { IDish, IParsingTreeResult } from "@/types/common"
import { IRIChildItems } from "@/types/rk7"
import { ICategListItem } from "@/types/rk7CategList"
import { IMenuItem } from "@/types/rk7Menuitems"

export const getStatusItem = (value: string): string => {
    switch (value) {
        case "rsDeleted":
            return "Удален"
        case "rsInactive":
            return "Неактивен"
        case "rsActive":
            return "Активен"
        case "rsDraft":
            return "Черновик"
        default:
            break
    }
}

export const pasringTree = (value: any): IParsingTreeResult[] => {
    const result: IRIChildItems =
        value.RK7QueryResult.CommandResult.RK7Reference.RIChildItems
    if (Array.isArray(result.TCategListItem)) {
        return result.TCategListItem.map((item) => {
            return { ...parsingDirectory(item) }
        })
    } else {
        return parsingDirectory(result.TCategListItem).childs
    }
}
const parsingDirectory = (item: ICategListItem | ICategListItem[]) => {
    if (Array.isArray(item)) {
        return item.map((element) => {
            let childs: any
            let dishes: any
            if (element.RIChildItems?.TCategListItem) {
                childs = parsingDirectory(element.RIChildItems.TCategListItem)
            }
            if (element.RIChildItems?.TRK7MenuItem) {
                dishes = parsingDishes(element.RIChildItems.TRK7MenuItem)
            }

            return {
                Name: element.Name,
                Ident: element.Ident,
                Status: element.Status,
                Type: "category",
                childs: childs || [],
                dishes: dishes || [],
            }
        })
    } else {
        if (item.RIChildItems?.TCategListItem) {
            let dishes: any
            if (item.RIChildItems?.TRK7MenuItem) {
                dishes = parsingDishes(item.RIChildItems.TRK7MenuItem)
            }
            return {
                Ident: item.Ident,
                Name: item.Name,
                Status: item.Status,
                Type: "category",
                childs:
                    parsingDirectory(item.RIChildItems.TCategListItem) || [],
                dishes: dishes || [],
            }
        }
        if (item.RIChildItems?.TRK7MenuItem) {
            return {
                Ident: item.Ident,
                Name: item.Name,
                Status: item.Status,
                childs: [],
                Type: "category",
                dishes: parsingDishes(item.RIChildItems.TRK7MenuItem) || [],
            }
        }
    }
}

const parsingDishes = (dish: IMenuItem | IMenuItem[]): IDish[] => {
    if (Array.isArray(dish)) {
        return dish.map((item) => {
            return {
                Name: item.Name,
                Ident: item.Ident,
                Status: item.Status,
                Type: "dish",
                CategPath: item.CategPath,
                Price: item["PRICETYPES-3"],
            }
        })
    } else {
        return [
            {
                Name: dish.Name,
                Ident: dish.Ident,
                Type: "dish",
                Status: dish.Status,
                CategPath: dish.CategPath,
                Price: dish["PRICETYPES-3"],
            },
        ]
    }
}
