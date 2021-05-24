import { getStatusItem } from "@/lib/parsingTree"
import {
    IParceCategListItem,
    IParsingTreeResult,
    IRestaurant,
} from "@/types/common"
import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Typography,
} from "@material-ui/core"
import ExpandMore from "@material-ui/icons/ExpandMore"
import ExpandLess from "@material-ui/icons/ExpandLess"

import FolderRoundedIcon from "@material-ui/icons/FolderRounded"
import axios from "axios"
import React, {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react"

interface InputProps {
    treeItem: IParsingTreeResult
    select?: (treeItem: IParsingTreeResult) => void
    selected?: number
    showDeleted: string
}

const TreeItem: FC<InputProps> = ({
    treeItem,
    select,
    selected,
    showDeleted,
}) => {
    const [open, setOpen] = useState(false)
    const { name, ident, parent, type, status } = treeItem

    const memoTreeItem = useMemo(() => treeItem, [treeItem])

    console.log("render treeitem", name)

    // const itemStatus = getStatusItem(memoTreeItem.Status)

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
                selected={selected === ident}
            >
                <ListItemIcon>
                    <FolderRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={name} secondary={status} />
                {/* <Typography variant="caption">
                    Количество блюд : {memoTreeItem.dishes.length}
                </Typography> */}

                {memoTreeItem.childs?.length > 0 ? (
                    open ? (
                        <ExpandLess />
                    ) : (
                        <ExpandMore />
                    )
                ) : null}
            </ListItem>
            {memoTreeItem.childs?.length > 0
                ? memoTreeItem.childs
                      .filter((filter) => filter.status !== showDeleted)
                      .map((child) => (
                          <Collapse
                              in={open}
                              timeout="auto"
                              unmountOnExit
                              key={child.ident + child.name}
                          >
                              <List
                                  component="div"
                                  disablePadding
                                  sx={{ pl: 2 }}
                              >
                                  <TreeItem
                                      treeItem={child}
                                      select={select}
                                      selected={selected}
                                      key={child.ident * 3 + child.name}
                                      showDeleted={showDeleted}
                                  />
                              </List>
                          </Collapse>
                      ))
                : null}
        </>
    )
}

export default TreeItem
