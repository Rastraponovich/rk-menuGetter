import axios from "axios"
import { Agent } from "https"
import { ICred } from "@/types/common"
import { xmlParser } from "./xmlParser"

const agent = new Agent({
    secureProtocol: "TLSv1_method",
    rejectUnauthorized: false,
})

const URL =
    process.env.URL || "https://10.20.31.2:86/rk7api/v0/xmlinterface.xml"

const cred: ICred = {
    username: "Wilde",
    password: "1024",
}

export const getData = async (schema: string, url?: string): Promise<any> => {
    const result = await axios.post(url || URL, schema, {
        headers: {
            "Content-Type": "xml/text",
        },
        httpsAgent: agent,
        auth: cred,
    })
    return xmlParser(result.data)
}
