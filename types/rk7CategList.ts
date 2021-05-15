import {
    ICommandResult,
    IRIChildItems,
    IRK7QueryResult,
    IRK7Reference,
} from "./rk7"

export interface IRK7CategListResult {
    RK7QueryResult: IRK7QueryResult & {
        CommandResult: ICategListCommandResult
    }
}

export interface ICategListCommandResult extends ICommandResult {
    RK7Reference: IRK7Reference & {
        Items: ICategListItems
    }
}
export interface ICategListItems {
    Item: ICategListItem
}

export interface ICategListItem {
    Code: number
    GUIDString: string
    Ident: number
    CategPath: string
    MainParentIdent: number
    Name: string
    Parent: number
    RIChildItems?: IRIChildItems
    Status: string
}
