import { IParsingTreeResult } from "@/types/common"
import React, { FC } from "react"
import TreeItem from "./TreeItem"
interface InputProps {
    arr: IParsingTreeResult[]
}
const TreeItems: FC<InputProps> = ({ arr }) => {
    return (
        <>
            {arr.length > 0
                ? arr.map((item) => (
                      <TreeItem key={item.Ident} treeItem={item} />
                  ))
                : null}
        </>
    )
}

export default TreeItems
