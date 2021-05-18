import { IDish, IParsingTreeResult } from "@/types/common"
import {
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@material-ui/core"
import React, { memo, FC, useCallback, useState, useMemo } from "react"
import TreeItems from "../TreeItems/TreeItems"

interface InputProps {
    items: IParsingTreeResult[]
}

const bulk: IParsingTreeResult = {
    Name: "",
    Type: "",
    Ident: 0,
    childs: [],
    dishes: [],
}

const bulkDish: IDish = {
    Name: "",
    Type: "dish",
    CategPath: "",
    Ident: 0,
    Price: 0,
}

const MenuView: FC<InputProps> = ({ items }) => {
    const [selectedMenuItem, setSelectedMenuItem] =
        useState<IParsingTreeResult>(bulk)

    const [selectedDish, setSelectedDish] = useState<IDish>(bulkDish)

    const memoItems = useMemo(() => items, [items])

    const selectDish = useCallback(
        (dish: IDish) => setSelectedDish(dish),
        [selectedDish]
    )

    const selectMenuItem = useCallback(
        (menuItem: IParsingTreeResult) => {
            setSelectedMenuItem(menuItem)
            selectDish(bulkDish)
        },
        [setSelectedMenuItem]
    )

    return (
        <Grid container>
            <Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
                <TreeItems
                    arr={memoItems}
                    select={selectMenuItem}
                    selected={selectedMenuItem}
                />
            </Grid>
            <Grid item xs={6} style={{ borderRight: "1px solid #e0e0e0" }}>
                <List dense>
                    {selectedMenuItem.dishes.map((dish) => (
                        <ListItem
                            dense
                            button
                            selected={dish.Ident === selectedDish.Ident}
                            divider
                            onClick={() => selectDish(dish)}
                            key={dish.Ident + dish.Name}
                        >
                            <ListItemText
                                primary={dish.Name}
                                secondary={"Цена: " + dish.Price / 100}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={3}>
                {selectedDish.Ident === 0 ? null : (
                    <Card>
                        <CardContent>
                            <Typography>
                                Наименование: {selectedDish.Name}
                            </Typography>
                            <Typography>
                                Цена: {selectedDish.Price / 100}
                            </Typography>
                            <Typography>
                                Каталог: {selectedDish.CategPath}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </Grid>
    )
}

export default memo(MenuView)
