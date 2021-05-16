import { IRestaurant } from "@/types/common"

interface IRestConf {
    restaurants: IRestaurant[]
}

export const restConf: IRestConf = {
    restaurants: [
        {
            address: "10.20.30.2",
            port: 86,
            name: "Лондон",
            genRestName: "Лондон",
            id: 30,
        },
        {
            address: "10.20.31.2",
            port: 86,
            name: "Сибас",
            genRestName: "Сибас",
            id: 31,
        },
        {
            address: "10.20.2.2",
            port: 86,
            name: "ЯпонаМама",
            genRestName: "ЯпонаМама",
            id: 5,
        },
        {
            address: "10.20.5.2",
            port: 86,
            name: "ХмелиСунели",
            genRestName: "ХмелиСунели",
            id: 6,
        },
        {
            address: "10.20.3.2",
            port: 86,
            name: "Синдикат",
            genRestName: "Синдикат",
            id: 3,
        },
    ],
}
