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
const song_1 = __importDefault(require("../../models/song"));
const band_1 = __importDefault(require("../../models/band"));
const midi2json_1 = require("../../midiUtils/midi2json");
let myMidi2json = new midi2json_1.midi2json();
exports.getAllSongsForStyle = (styleId) => __awaiter(void 0, void 0, void 0, function* () {
    let myBands = yield band_1.default.find({ musicStyle: styleId }).select('_id').exec();
    let mySongs = yield song_1.default.find({ band: { $in: myBands } }).select('name').sort({ name: 1 }).exec();
    return {
        songs: mySongs
    };
});
exports.getAllSongs = () => __awaiter(void 0, void 0, void 0, function* () {
    let mySongs = yield song_1.default.find().select('name').sort({ name: 1 }).exec();
    return {
        songs: mySongs
    };
});
exports.getAllSongsForBand = (bandId) => __awaiter(void 0, void 0, void 0, function* () {
    let mySongs = yield song_1.default.find({ band: bandId }).select('name').sort({ name: 1 }).exec();
    return {
        songs: mySongs
    };
});
exports.getSongById = (songId) => __awaiter(void 0, void 0, void 0, function* () {
    let mySong = yield song_1.default.findOne({ _id: songId }).exec();
    let myBand = yield band_1.default.findOne({ _id: mySong.band }).exec();
    return {
        id: songId,
        name: mySong.name,
        band: { name: myBand.name, id: mySong.band }
    };
});
exports.getSongMidiById = (songId) => __awaiter(void 0, void 0, void 0, function* () {
    let mySong = yield song_1.default.find({ _id: songId }).exec();
    return mySong[0].midiFile;
});
//# sourceMappingURL=songController.js.map