var fs = require('fs');
var _ = require('underscore');


export class binaryFile {

    public readFile(filePath: string): Promise<any> {
        let promise = new Promise(
            function resolver(resolve, reject) {
                fs.stat(filePath, function (err:any, stats:any) {
                    if (err)
                        return reject(err);

                    var fileLength = stats.size;
                    openFile(filePath, fileLength, function(e:any, buffer:any){
                        if (e)
                            return reject(e);
                        resolve(buffer);
                    });
                })
            }
        );
        return promise;
    }
}




function openFile(filePath:string, fileLength:number, callback:any) {
    fs.open(filePath, 'r', function opened(err:any, fd:any) {
        if (err) {
            callback(err, null);
        }
        var readBuffer = new Buffer(fileLength),
            bufferOffset = 0,
            bufferLength = readBuffer.length,
            filePosition = 0;
        fs.read(fd,
            readBuffer,
            bufferOffset,
            bufferLength,
            filePosition,
            function read(err:any, readBytes:any) {
                if (err) {
                    callback(err, null);
                }
                callback(null, readBuffer);
            });
    })
};



