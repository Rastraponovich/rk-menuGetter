import {
    IParceCategListItem,
    IParsingTreeResult,
    IRestaurant,
} from "@/types/common"
import { List } from "@material-ui/core"
import React, { FC, memo } from "react"
import TreeItem from "./TreeItem"
interface InputProps {
    arr: IParceCategListItem[]
    select?: (menuItem: IParceCategListItem) => void
    selected?: IParceCategListItem
    showDeleted: boolean
}

const TreeItems: FC<InputProps> = ({ arr, select, selected, showDeleted }) => {
    console.info("render treeList")

    const flter = showDeleted ? "" : "Удален"

    return (
        <List dense>
            {arr
                .filter((filter) => filter.status !== flter)
                .map((item) => (
                    <TreeItem
                        key={item.ident + item.name}
                        treeItem={item}
                        select={select}
                        selected={selected.ident}
                        showDeleted={flter}
                    />
                ))}
        </List>
    )
}

export default memo(TreeItems)
