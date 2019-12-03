import { Request, Response } from "express";
import { getAllBands, getAllBandsForStyle } from "./bandController";

export default [
    {
        path: "/api/bands",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                if (req.query.styleId){
                    const result = await getAllBandsForStyle(req.query.styleId);
                    res.status(200).send(result);
                }
                else{
                    const result = await getAllBands();
                    res.status(200).send(result);
                }
            }
        ]
    } 
];