"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
let upload = multer_1.default({ dest: 'uploads/' });
let extract = require('extract-zip');
let randomstring = require("randomstring");
const processUnzippedSongs_1 = require("../../midiUtils/processUnzippedSongs");
let unzippedSongProcessor = new processUnzippedSongs_1.processUnzippedSongs();
const fs = require('fs');
const path = require('path');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
exports.postUploadFile = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entre a postUploadFile");
        if (req.file.mimetype !== 'application/zip') {
            sendJSONresponse(res, 400, { Result: "File is not a zip file" });
        }
        var outputFolder = 'uploads/unzipped' + randomstring.generate(7);
        extract(req.file.path, { dir: path.resolve(outputFolder) }, function (err) {
            if (err) {
                console.log('The unzip of ' + req.file.originalname + 'failed');
                console.log(err);
                sendJSONresponse(res, 400, { Result: "The file could not be unzziped" });
            }
            else {
                console.log(req.file.originalname + 'unzipped OK');
                unzippedSongProcessor.Parse(outputFolder)
                    .then(function (results) {
                    sendJSONresponse(res, 200, { Result: "File processed OK" });
                })
                    .catch(function (err) {
                    console.log("Error processing unzipped file.");
                    console.log(err);
                    sendJSONresponse(res, 400, { Result: err.message });
                });
            }
        });
    });
};
//# sourceMappingURL=uploadController.js.map