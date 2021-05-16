import { IParsingTreeResult } from "@/types/common"
import {
    Collapse,
    List,
    ListItem,
    ListItemText,
    MenuItem,
} from "@material-ui/core"
import React, { FC, memo, useState } from "react"
import DishItem from "./DishItem"

interface InputProps {
    treeItem: IParsingTreeResult
}

const TreeItem: FC<InputProps> = ({ treeItem }) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            {treeItem.childs?.length > 0 ? (
                <>
                    <ListItem onClick={handleOpen}>
                        <ListItemText
                            primary={`${treeItem.Name} ${
                                treeItem.dishes?.length > 0
                                    ? ` - ` + treeItem.dishes.length
                                    : null
                            }`}
                        />
                    </ListItem>
                    <Collapse in={open}>
                        <List>
                            {treeItem.childs.map((item) => (
                                <ListItem
                                    key={item.Ident + item.Name}
                                    dense
                                    button
                                    divider
                                >
                                    <TreeItem
                                        treeItem={item}
                                        key={item.Ident}
                                    />
                                </ListItem>
                            ))}
                            {treeItem.dishes
                                ? treeItem.dishes.map((item, idx) => (
                                      <DishItem
                                          dish={item}
                                          idx={idx}
                                          key={item.Ident}
                                      />
                                  ))
                                : null}
                        </List>
                    </Collapse>
                </>
            ) : (
                <>
                    <ListItem onClick={handleOpen}>
                        <ListItemText
                            primary={`${treeItem.Name} ${
                                treeItem.dishes?.length > 0
                                    ? ` - ` + treeItem.dishes.length
                                    : null
                            }`}
                        />
                    </ListItem>
                    {/* {treeItem.dishes
                        ? treeItem.dishes.map((item, idx) => (
                              <DishItem
                                  dish={item}
                                  idx={idx}
                                  key={item.Ident}
                              />
                          ))
                        : null} */}
                </>
            )}
            {/* {treeItem.dishes
                ? treeItem.dishes.map((item, idx) => (
                      <DishItem dish={item} idx={idx} key={item.Ident} />
                  ))
                : null} */}
            {/* </details> */}
        </>
    )
}

export default memo(TreeItem)
