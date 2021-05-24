import { getData, makeUrl } from "@/lib/getData"
import { getTreeList, getTreeListByIdent } from "@/schemas/categList.schema"
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password, address, port, ident, dataVersion } = req.body
    const endpoint = makeUrl(address, port)

    try {
        let schema = getTreeList()
        if (ident) {
            schema = getTreeListByIdent(ident)
        }
        const result = await getData(schema, endpoint, username, password)
        res.status(200).json({ ...result })
    } catch (error) {
        console.log("error in api")
        res.status(500)
    }
}
