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
const songController_1 = require("./songController");
exports.default = [
    {
        path: "/api/songs",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                if (req.query.styleId) {
                    const result = yield songController_1.getAllSongsForStyle(req.query.styleId);
                    res.status(200).send(result);
                }
                else if (req.query.bandId) {
                    const result = yield songController_1.getAllSongsForBand(req.query.bandId);
                    res.status(200).send(result);
                }
                else {
                    const result = yield songController_1.getAllSongs();
                    res.status(200).send(result);
                }
            })
        ]
    },
    {
        path: "/api/songs/:songId",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield songController_1.getSongById(req.params.songId);
                res.status(200).send(result);
            })
        ]
    },
    {
        path: "/api/songs/midi/:songId",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const myMidiSong = yield songController_1.getSongMidiById(req.params.songId);
                res.writeHead(200, {
                    'Content-Type': 'audio/midi'
                });
                res.end(myMidiSong, 'binary');
            })
        ]
    }
];
//# sourceMappingURL=routes.js.map