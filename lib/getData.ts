import axios, { AxiosError } from "axios"
import { Agent } from "https"
import { ICred } from "@/types/common"
import { xmlParser } from "./xmlParser"

const agent = new Agent({
    secureProtocol: "TLSv1_method",
    rejectUnauthorized: false,
})

const URL = "https://10.20.30.2:86/rk7api/v0/xmlinterface.xml"
//process.env.URL ||
const cred: ICred = {
    username: `${process.env.LOGIN}` || "Wilde",
    password: `${process.env.PASS}` || "1024",
}

export const getData = async (schema: string, url?: string): Promise<any> => {
    try {
        const result = await axios.post(url || URL, schema, {
            headers: {
                "Content-Type": "xml/text",
            },
            httpsAgent: agent,
            auth: cred,
        })
        return xmlParser(result.data)
    } catch (error) {
        const err: AxiosError = error
        const { status, statusText, data } = err.response

        console.log(err.response)
        return { status, statusText, data }
    }
}
