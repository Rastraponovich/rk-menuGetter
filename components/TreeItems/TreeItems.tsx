import { IParsingTreeResult } from "@/types/common"
import { List } from "@material-ui/core"
import React, { FC, memo } from "react"
import TreeItem from "./TreeItem"
interface InputProps {
    arr: IParsingTreeResult[]
    select?: (menuItem: IParsingTreeResult) => void
    selected?: IParsingTreeResult
    showDeleted: boolean
}

const TreeItems: FC<InputProps> = ({ arr, select, selected, showDeleted }) => {
    console.info("render treeList")

    const flter = showDeleted ? "" : "rsDeleted"

    return (
        <List dense>
            {arr
                .filter((filter) => filter.Status !== flter)
                .map((item) => (
                    <TreeItem
                        key={item.Ident + item.Name}
                        treeItem={item}
                        select={select}
                        selected={selected.Ident}
                        showDeleted={flter}
                    />
                ))}
        </List>
    )
}

export default memo(TreeItems)
