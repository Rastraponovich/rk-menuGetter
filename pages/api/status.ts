import { getData, makeUrl } from "@/lib/getData"
import { GetSystemInfo } from "@/schemas/schema"
import { IResult } from "@/types/common"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { username, password, address, port } = req.body
        const endpoint = makeUrl(address, port)

        const schema = GetSystemInfo()
        const request: IResult = await getData(
            schema,
            endpoint,
            username,
            password
        )
        res.status(200).json({ ...request })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
