import { IParsingTreeResult } from "@/types/common"
import { IRIChildItems } from "@/types/rk7"
import { ICategListItem } from "@/types/rk7CategList"
import { IMenuItem } from "@/types/rk7Menuitems"

export const pasringTree = (value: any): IParsingTreeResult[] => {
    console.log(value)
    const result: IRIChildItems =
        value.RK7QueryResult.CommandResult.RK7Reference.RIChildItems
    if (Array.isArray(result.TCategListItem)) {
        const output = result.TCategListItem.map((item) => {
            return { ...parsingDirectory(item) }
        })

        return output
    } else {
        const output = [{ ...parsingDirectory(result.TCategListItem) }]
        console.log(output, "obj")

        return output
    }
}

const parsingDirectory = (item: ICategListItem | ICategListItem[]) => {
    //1000007

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
                childs:
                    parsingDirectory(item.RIChildItems.TCategListItem) || [],
                dishes: dishes || [],
            }
        }
        if (item.RIChildItems?.TRK7MenuItem) {
            return {
                Ident: item.Ident,
                Name: item.Name,
                childs: [],
                Type: "category",
                dishes: parsingDishes(item.RIChildItems.TRK7MenuItem) || [],
            }
        }
    }
}

const parsingDishes = (dish: IMenuItem | IMenuItem[]) => {
    if (Array.isArray(dish)) {
        return dish.map((item) => {
            return {
                Name: item.Name,
                Ident: item.Ident,
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
                CategPath: dish.CategPath,
                Price: dish["PRICETYPES-3"],
            },
        ]
    }
}
