"use strict";
const mongoose = require("mongoose");
var songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    musicStyle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    band: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    midiFile: {
        type: Buffer,
        required: true
    },
    hash: {
        type: Buffer,
        required: true
    }
});
var song = mongoose.model("song", songSchema);
module.exports = song;
//# sourceMappingURL=song.js.map