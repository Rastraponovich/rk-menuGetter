import { ICategListItem } from "./rk7CategList"
import { IMenuItem } from "./rk7Menuitems"

export interface IRK7QueryResult {
    ArrivalDateTime: string
    ErrorText: string
    NetName: string
    ServerVersion: string
    Status: string
    XmlVersion: number
    CommandResult?: ICommandResult
}
export interface ICommandResult {
    CMD: string
    DateTime: Date
    ErrorText: string
    RK7Reference?: IRK7Reference
    SourceCommand?: ISourceCommand
    Status: string
    WorkTime: number
}
export interface IRK7Reference {
    ChildRight: number
    ClassName: string
    DataVersion: number
    DeleteRight: number
    LeafCollectionCount: number
    MaxIdent: number
    MinIdent: number
    Name: string
    RIChildItems?: any
    UpdateRight: number
    ViewRight: number
    XMLExport: boolean
    XMLMask: string
}
export interface ISourceCommand {
    RK7Command2: IRK7Command2
}
export interface IRK7Command2 {
    CMD: string
    IgnoreDefaults?: number
    OnlyActive?: number
    RefName: string
    WithChildItems?: number
    WithMacroProps?: number
    PROPFILTERS?: IPropFilters
}

export interface IPropFilters {
    PROPFILTER: IPropFilter[]
}
export interface IPropFilter {
    name: string
    value: string
}

export interface IRIChildItems {
    TCategListItem?: ICategListItem[] | ICategListItem
    TRK7MenuItem?: IMenuItem[] | IMenuItem
}
