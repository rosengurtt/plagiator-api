import { Request, Response } from "express";
import { getAllStyles } from "./styleController";

export default [
    {
        path: "/api/styles",
        method: "get",
        handler: [
            async ({ query }: Request, res: Response) => {
                const result = await getAllStyles();
                res.status(200).send(result);
            }
        ]
    }
];