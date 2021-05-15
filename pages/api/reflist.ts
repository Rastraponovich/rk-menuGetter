import { getData } from "@/lib/getData"
import { GetRefList } from "@/schemas/schema"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const schema = GetRefList()
        const result = await getData(schema)
        res.status(200).json({ ...result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
