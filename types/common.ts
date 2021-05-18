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
    Name: string
    Ident: number
    Type: string
    childs?: IParsingTreeResult[]
    dishes?: IDish[]
}
export interface IDish {
    Name: string
    Ident: number
    Type: string
    CategPath: string
    Price: number
}

export interface IRestaurant {
    address: string
    port: number
    name: string
    genRestName: string
    id: number
}
