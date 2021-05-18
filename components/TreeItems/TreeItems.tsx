import { IParsingTreeResult } from "@/types/common"
import { List } from "@material-ui/core"
import React, { FC, memo, useCallback, useMemo, useState } from "react"
import TreeItem from "./TreeItem"
interface InputProps {
    arr: IParsingTreeResult[]
    select?: (menuItem: IParsingTreeResult) => void
    selected?: IParsingTreeResult
}

const TreeItems: FC<InputProps> = ({ arr, select, selected }) => {
    console.info("render treeList")

    return (
        <List dense>
            {arr.map((item) => (
                <TreeItem
                    key={item.Ident + item.Name}
                    treeItem={item}
                    select={select}
                    selected={selected.Ident}
                />
            ))}
        </List>
    )
}

export default memo(TreeItems)
