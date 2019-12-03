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
Object.defineProperty(exports, "__esModule", { value: true });
//Used to feed midi files into the Mongo DB
//It expects a full path to a midi file
//The path includes the information of the music style and
//the band, like /root/whatever/whateverElse/rock/beatles/Let it be
//This function will create the records for the music style and the band,
//as well as the song, if they don't exist. If there is already a
//record for the same song, band and style, it will compare the midi files
//If there is already a copy of the same midi file, it will not save anything
//If the midi file is different it will save it, but it will not create a new
//song record, it will just add the midi file to an array of midi files in the song record
const mongoose = require("mongoose");
const musicStyle = require("../models/musicStyle");
const band = require("../models/band");
const song = require("../models/song");
const binaryFile_1 = require("./binaryFile");
const myBinaryFile = new binaryFile_1.binaryFile();
const crypto = require('crypto');
mongoose.Promise = global.Promise;
function SaveMusicStyle(songDetails) {
    const query = { name: songDetails.musicStyle };
    return musicStyle.findOneAndUpdate(query, query, { upsert: true, new: true }).exec().then(function (doc) {
        songDetails.musicStyleObjectId = doc.id;
        return songDetails;
    });
}
function SaveBand(songDetails) {
    const query = { name: songDetails.band };
    return band.findOneAndUpdate(query, { name: songDetails.band, musicStyle: songDetails.musicStyleObjectId }, { upsert: true, new: true }).exec()
        .then(function (doc) {
        songDetails.bandObjectId = doc.id;
        return songDetails;
    });
}
function CheckSongDuplication(songDetails) {
    return song.find({
        "$or": [{
                "name": songDetails.songName,
                "band": songDetails.bandObjectId
            },
            { "hash": songDetails.hash }]
    }).exec()
        .then(function (songs) {
        if (songs.length === 0) {
            return songDetails;
        }
        Promise.reject("Found a duplicated song, aborting.");
    });
}
function SaveSong(songDetails) {
    let newSong = new song({
        name: songDetails.songName,
        musicStyle: songDetails.musicStyleObjectId,
        band: songDetails.bandObjectId,
        midiFile: songDetails.midiFile,
        hash: songDetails.hash
    });
    return newSong.save();
}
class midiFile2Db {
    SaveSongData(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filePath || !filePath.toLowerCase().endsWith('.mid'))
                return;
            let parts = filePath.split("/");
            let qtyParts = parts.length;
            //We expect a path structure of style/band/song.mid
            //If that is not the case return without doing anything
            if (parts.length < 3)
                return;
            let songDetails = {
                musicStyle: parts[qtyParts - 3],
                band: parts[qtyParts - 2],
                songName: parts[qtyParts - 1],
                filePath: filePath,
                midiFile: null,
                hash: null
            };
            try {
                songDetails = yield SaveMusicStyle(songDetails);
                songDetails = yield SaveBand(songDetails);
                //Read the content of the uploaded midi file and calculate hash
                songDetails.midiFile = yield myBinaryFile.readFile(songDetails.filePath);
                songDetails.hash = crypto.createHash('md5').update(songDetails.midiFile).digest();
                songDetails = yield CheckSongDuplication(songDetails);
                songDetails = yield SaveSong(songDetails);
                return "OK";
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
}
exports.midiFile2Db = midiFile2Db;
//# sourceMappingURL=midiFile2Db.js.map