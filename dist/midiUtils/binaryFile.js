"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var _ = require('underscore');
class binaryFile {
    readFile(filePath) {
        let promise = new Promise(function resolver(resolve, reject) {
            fs.stat(filePath, function (err, stats) {
                if (err)
                    return reject(err);
                var fileLength = stats.size;
                openFile(filePath, fileLength, function (e, buffer) {
                    if (e)
                        return reject(e);
                    resolve(buffer);
                });
            });
        });
        return promise;
    }
}
exports.binaryFile = binaryFile;
function openFile(filePath, fileLength, callback) {
    fs.open(filePath, 'r', function opened(err, fd) {
        if (err) {
            callback(err, null);
        }
        var readBuffer = new Buffer(fileLength), bufferOffset = 0, bufferLength = readBuffer.length, filePosition = 0;
        fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition, function read(err, readBytes) {
            if (err) {
                callback(err, null);
            }
            callback(null, readBuffer);
        });
    });
}
;
//# sourceMappingURL=binaryFile.js.map