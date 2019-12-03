"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let gracefulShutdown;
const settings_1 = require("../settings");
// if (process.env.NODE_ENV === 'production') {
//     dbURI = 'mongodb://jose:monguito1pass@ds055565.mlab.com:55565/loc8r';
// }
mongoose_1.default.connect(settings_1.dbURI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
});
mongoose_1.default.connection.on('connected', function () {
    console.log('Mongoose connected to ' + settings_1.dbURI);
});
mongoose_1.default.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose_1.default.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
gracefulShutdown = function (msg, callback) {
    mongoose_1.default.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
require('./song');
require('./band');
require('./musicStyle');
//# sourceMappingURL=db.js.map