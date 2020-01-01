import multer from 'multer';
let upload = multer({ dest: 'uploads/' });
let extract = require('extract-zip')
let randomstring = require("randomstring");
import { processUnzippedSongs } from "../../midiUtils/processUnzippedSongs";
let unzippedSongProcessor = new processUnzippedSongs();
import musicStyle = require('../../models/musicStyle');
const fs = require('fs');
const path = require('path')

var sendJSONresponse = function (res:any, status:any, content:any) {
    res.status(status);
    res.json(content);
};

export const postUploadFile = async function (req:any, res:any) {
    console.log("entre a postUploadFile");
    if (req.file.mimetype !== 'application/zip') {
        sendJSONresponse(res, 400, { Result: "File is not a zip file" });
    }
    var outputFolder = 'uploads/unzipped' + randomstring.generate(7);
    extract(req.file.path, { dir: path.resolve(outputFolder) }, function (err: any) {
        if (err) {
            console.log('The unzip of ' + req.file.originalname + 'failed');
            console.log(err);
            sendJSONresponse(res, 400, { Result: "The file could not be unzziped" });
        }
        else {
            console.log(req.file.originalname + 'unzipped OK');
            unzippedSongProcessor.Parse(outputFolder)
                .then(function (results: string) {
                    sendJSONresponse(res, 200, { Result: "File processed OK" });
                })
                .catch(function (err) {
                    console.log("Error processing unzipped file.");
                    console.log(err);
                    sendJSONresponse(res, 400, { Result: err.message  });
                });
        }
    })
}

