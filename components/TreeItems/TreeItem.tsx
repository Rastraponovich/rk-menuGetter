import { IParsingTreeResult } from "@/types/common"
import React, { FC } from "react"
import DishItem from "./DishItem"
import TreeItems from "./TreeItems"

interface InputProps {
    treeItem: IParsingTreeResult
}

const TreeItem: FC<InputProps> = ({ treeItem }) => {
    return (
        <details
            style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 1rem",
            }}
        >
            <summary>
                {treeItem.Name}
                {treeItem.dishes?.length > 0
                    ? ` - ` + treeItem.dishes.length
                    : null}
            </summary>
            {treeItem.childs?.length > 0
                ? treeItem.childs.map((item) => (
                      <TreeItem treeItem={item} key={item.Ident} />
                  ))
                : null}
            {treeItem.dishes
                ? treeItem.dishes.map((item, idx) => (
                      <DishItem dish={item} idx={idx} key={item.Ident} />
                  ))
                : null}
        </details>
    )
}

export default TreeItem
