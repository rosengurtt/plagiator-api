import { Request, Response } from "express";
import {postUploadFile} from './uploadController';
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

/*
export default [
    {
        path: "/api/uploads",
        method: "post",
        handler: [
            async (req: Request, res: Response, next: any)=>{
                console.log("empieza el sorete")
                console.log(req)
            await upload.single('musicFile');
            console.log("empieza el sorete")
            console.log(req)
            next()
            },
            async (req: Request, res: Response) => {
                console.log("Holaaaaaaaaaaaaaaaaaaaaa ppaaaaaaaaaaaaaaaaaaaai")
                if (req.file.mimetype !== 'application/zip') {
                    res.status(400).send({ Result: "File is not a zip file" });
                }
                const result = await postUploadFile(req.file.path);
                res.status(200).send(result);
            }
        ]
    }
];
*/