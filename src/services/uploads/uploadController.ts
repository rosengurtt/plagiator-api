import multer from 'multer';
let upload = multer({ dest: 'uploads/' });
let extract = require('extract-zip')
let randomstring = require("randomstring");
import { processUnzippedSongs } from "../../midiUtils/processUnzippedSongs";
let unzippedSongProcessor = new processUnzippedSongs();
import musicStyle = require('../../models/musicStyle');
const fs = require('fs');


export const postUploadFile = async (filepath: any) => {    
    var outputFolder = 'uploads/unzipped' + randomstring.generate(7);
    extract(filepath, { dir: outputFolder }, function (err: any) {
        if (err) {
            console.log('The unzip of ' + filepath + 'failed');
            console.log(err);
            return { Result: "The file could not be unzziped" };
        }
        else {
            unzippedSongProcessor.Parse(outputFolder)
                .then(function (results: string) {
                    return { Result: "File processed OK" };
                })
                .catch(function (err) {
                    console.log("Error processing unzipped file.");
                    console.log(err);
                    return { Result: err.message  };
                });
        }
    })
};

