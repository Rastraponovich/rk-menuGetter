import { ICommandResult, IRK7QueryResult, IRK7Reference } from "./rk7"

export interface IRK7MenuItemsResult {
    RK7QueryResult: IRK7QueryResult & {
        CommandResult: IMenuItemsCommandResult
    }
}

export interface IMenuItemsCommandResult extends ICommandResult {
    RK7Reference: IRK7Reference & {
        Items: IMenuItems
    }
}
export interface IMenuItems {
    Item: IMenuItem[]
}

export interface IMenuItem {
    CategPath: string
    Code: number
    Comment: string
    GUIDString: string
    HighLevelGroup1: number
    Ident: number
    Name: string
    Parent: number
    Status: string
    "PRICETYPES-3": number
}
