import { getData } from "@/lib/getData"
import { GetSystemInfo } from "@/schemas/schema"
import { IRK7QueryResult } from "@/types/rk7"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { url } = req.body

        const schema = GetSystemInfo()
        const result: { RK7QueryResult: IRK7QueryResult } = await getData(
            schema,
            url
        )
        res.status(200).json({ ...result.RK7QueryResult })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
