import { Request, Response } from "express";
import {postUploadFile} from './uploadController';
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

export default [
    {
        path: "/api/upload",
        method: "post",
        handler: [
            upload.single('musicFile'),
            async (req: Request, res: Response) => {
                if (req.file.mimetype !== 'application/zip') {
                    res.status(400).send({ Result: "File is not a zip file" });
                }
                const result = await postUploadFile(req.file.path);
                res.status(200).send(result);
            }
        ]
    }
];