"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
var bandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    musicStyle: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    }
});
var band = mongoose_1.default.model("band", bandSchema);
module.exports = band;
//# sourceMappingURL=band.js.map