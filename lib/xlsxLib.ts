import { IDish, IParsingTreeResult, IRestaurant } from "@/types/common"
import XLSX from "xlsx"

const getChilds = (childs: IParsingTreeResult[]) => {
    let result = childs.map((child) => {
        let childsResult = []
        childsResult.push([child.name, null, null, child.status])
        if (child.childs.length > 0) {
            const x = getChilds(child.childs)
            childsResult.push(x)
        }
        return childsResult
    })

    return result
}

export const createBook = (data: any[][], restaurant: IRestaurant) => {
    const book = XLSX.utils.book_new()

    const workSheet = XLSX.utils.aoa_to_sheet(data)

    XLSX.utils.book_append_sheet(book, workSheet, restaurant.name)

    const file = XLSX.writeFile(book, `${restaurant.name}-${Date.now()}.xlsx`, {
        bookType: "xlsx",
    })

    console.log(file)
}
