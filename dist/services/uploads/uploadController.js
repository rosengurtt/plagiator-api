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
exports.postUploadFile = (filepath) => __awaiter(void 0, void 0, void 0, function* () {
    var outputFolder = 'uploads/unzipped' + randomstring.generate(7);
    extract(filepath, { dir: outputFolder }, function (err) {
        if (err) {
            console.log('The unzip of ' + filepath + 'failed');
            console.log(err);
            return { Result: "The file could not be unzziped" };
        }
        else {
            unzippedSongProcessor.Parse(outputFolder)
                .then(function (results) {
                return { Result: "File processed OK" };
            })
                .catch(function (err) {
                console.log("Error processing unzipped file.");
                console.log(err);
                return { Result: err.message };
            });
        }
    });
});
//# sourceMappingURL=uploadController.js.map