import { IRK7QueryResult } from "./rk7"

export interface ICred {
    username: string
    password: string
}

export interface IResult {
    RK7QueryResult?: IRK7QueryResult
    isAxiosError?: boolean
    code?: string
    message?: string
}

export interface IErrorResponse {
    isAxiosError?: boolean
    code?: string
    message?: string
}

export interface IParsingTreeResult {
    name: string
    ident: number
    parent: number
    status: string
    type: string
    childs?: IParsingTreeResult[]
    dishes?: IDish[]
}
export interface IDish {
    name: string
    ident: number
    type: string
    categPath: string
    price: number
    status: string
}

export interface IRestaurant {
    address: string
    port: number
    name: string
    genRestName?: string
    id: number
    username: string
    password: string
    ident?: number
    type?: string
}

export interface IParceCategListItem {
    ident: number
    name: string
    parent: number
    status: string
    type: string
    childs?: IParceCategListItem[] | []
}
