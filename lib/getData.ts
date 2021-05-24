import axios, { AxiosError } from "axios"
import { Agent } from "https"
import { ICred, IResult } from "@/types/common"
import { xmlParser } from "./xmlParser"

const agent = new Agent({
    secureProtocol: "TLSv1_method",
    rejectUnauthorized: false,
})

const cred: ICred = {
    username: `${process.env.LOGIN}` || "Wilde",
    password: `${process.env.PASS}` || "1024",
}

export const getData = async (
    schema: string,
    url?: string,
    username?: string,
    password?: string
): Promise<IResult> => {
    try {
        const result = await axios.post(url, schema, {
            headers: {
                "Content-Type": "xml/text",
            },
            httpsAgent: agent,
            auth: username ? { username, password } : cred,
        })
        return xmlParser(result.data)
    } catch (error) {
        console.log("error in lib")
        const { code, isAxiosError, message }: AxiosError = error
        return { code, isAxiosError, message }
    }
}

export const makeUrl = (address: string, port: number): string => {
    return `https://${address}:${port}/rk7api/v0/xmlinterface.xml`
}
