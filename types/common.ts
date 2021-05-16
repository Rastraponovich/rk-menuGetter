export interface ICred {
    username: string
    password: string
}

export interface IErrorResponse {
    status: number
    statusText: string
    data: any
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
