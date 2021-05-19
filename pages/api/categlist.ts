import { getData, makeUrl } from "@/lib/getData"
import { GetCategList, GetSystemInfo } from "@/schemas/schema"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { genRestName, username, password, address, port } = req.body
    const endpoint = makeUrl(address, port)

    try {
        const schema = GetCategList()
        const result = await getData(schema, endpoint, username, password)
        res.status(200).json({ ...result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
