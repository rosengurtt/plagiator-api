import song from '../../models/song';
import band from '../../models/band';
import { midi2json } from "../../midiUtils/midi2json";
import Isong = require('../../models/Isong');
import Iband = require('../../models/Iband');
let myMidi2json = new midi2json();

export const getAllSongsForStyle = async (styleId: string) => {
    let myBands = await band.find({ musicStyle: styleId }).select('_id').exec();
    let mySongs = await song.find({ band: { $in: myBands } }).select('name').sort({ name: 1 }).exec();
    return {
        songs: mySongs
    }
};

export const getAllSongs = async () => {
    let mySongs = await song.find().select('name').sort({ name: 1 }).exec();
    return {
        songs: mySongs
    }
};

export const getAllSongsForBand = async (bandId: string) => {
    let mySongs = await song.find({ band: bandId }).select('name').sort({ name: 1 }).exec();
    return {
        songs: mySongs
    }
};

export const getSongById = async (songId: string) => {
    let mySong = await song.findOne({ _id: songId }).exec();
    let myBand = await band.findOne({ _id: mySong!.band }).exec();
    return {
        id: songId,
        name: mySong!.name,
        band: { name: myBand!.name, id: mySong!.band }
    }
};

export const getSongMidiById = async (songId: string) => {
    let mySong = await song.find({ _id: songId }).exec();
    return mySong[0].midiFile
};




