import mongoose from 'mongoose';
let gracefulShutdown: any;
import { dbURI } from "../settings";

// if (process.env.NODE_ENV === 'production') {
//     dbURI = 'mongodb://jose:monguito1pass@ds055565.mlab.com:55565/loc8r';
// }

mongoose.connect(dbURI,
    {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    });
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
gracefulShutdown = function (msg: any, callback: any) {
    mongoose.connection.close(function () {
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