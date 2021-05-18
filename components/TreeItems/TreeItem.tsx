import { IParsingTreeResult } from "@/types/common"
import {
    Collapse,
    List,
    ListItem,
    ListItemText,
    MenuItem,
} from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import React, { FC, memo, useCallback, useMemo, useState } from "react"

interface InputProps {
    treeItem: IParsingTreeResult
    select?: (treeItem: IParsingTreeResult) => void
    selected?: number
}

const TreeItem: FC<InputProps> = ({ treeItem, select, selected }) => {
    const [open, setOpen] = useState(false)

    const memoTreeItem = useMemo(() => treeItem, [treeItem])

    console.log("render treeitem", treeItem.Name)

    const handleClick = useCallback(() => {
        select(memoTreeItem)
        setOpen(!open)
    }, [open])

    return (
        <>
            <ListItem
                button
                onClick={handleClick}
                divider
                dense
                selected={selected === treeItem.Ident}
            >
                <ListItemText
                    primary={memoTreeItem.Name}
                    secondary={
                        `Количество блюд : ` + memoTreeItem.dishes.length
                    }
                />

                {memoTreeItem.childs?.length > 0 ? (
                    open ? (
                        <ExpandLess />
                    ) : (
                        <ExpandMore />
                    )
                ) : null}
            </ListItem>
            {memoTreeItem.childs?.length > 0
                ? memoTreeItem.childs.map((child) => (
                      <Collapse
                          in={open}
                          timeout="auto"
                          unmountOnExit
                          key={child.Ident + child.Name}
                      >
                          <List component="div" disablePadding sx={{ pl: 2 }}>
                              <TreeItem
                                  treeItem={child}
                                  select={select}
                                  selected={selected}
                                  key={child.Ident * 3 + child.Name}
                              />
                          </List>
                      </Collapse>
                  ))
                : null}
        </>
    )
}

export default TreeItem
