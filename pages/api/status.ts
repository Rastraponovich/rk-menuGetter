import { getData } from "@/lib/getData"
import { GetSystemInfo } from "@/schemas/schema"
import { IResult } from "@/types/common"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { url } = req.body

        const schema = GetSystemInfo()
        const request: IResult = await getData(schema, url)
        res.status(200).json({ ...request })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
