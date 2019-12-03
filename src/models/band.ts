import mongoose from 'mongoose'

import Iband  from "./Iband"

interface IbandModel extends Iband, mongoose.Document { }

var bandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    musicStyle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
var band = mongoose.model<IbandModel>("band", bandSchema);

export = band;