import { getData } from "@/lib/getData"
import { GetCategList, GetSystemInfo } from "@/schemas/schema"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { url, restaurantName } = req.body

    try {
        const schema = GetCategList(restaurantName)
        const result = await getData(schema, url)
        res.status(200).json({ ...result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
