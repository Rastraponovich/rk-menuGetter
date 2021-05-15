import { getData } from "@/lib/getData"
import { GetRefData } from "@/schemas/schema"
import { NextApiRequest, NextApiResponse } from "next"

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { name, wmp, active, childs, defaults, ...filter } = req.query

        const params = {
            WithMacroProps: wmp || "0",
            OnlyActive: active ? "1" : "0",
            WithChildItems: childs ? "1" : "0",
            IgnoreDefaults: defaults ? "1" : "0",
        }

        const schema = GetRefData({ name, filter, params })
        console.log(schema)
        const result = await getData(schema)
        res.status(200).json({ ...result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
