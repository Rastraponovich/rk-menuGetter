import { IParsingTreeResult } from "@/types/common"
import { List } from "@material-ui/core"
import React, { FC } from "react"
import TreeItem from "./TreeItem"
interface InputProps {
    arr: IParsingTreeResult[]
}
const TreeItems: FC<InputProps> = ({ arr }) => {
    return (
        <List dense>
            {arr.length > 0
                ? arr.map((item) => (
                      <TreeItem key={item.Ident + item.Name} treeItem={item} />
                  ))
                : null}
        </List>
    )
}

export default TreeItems
