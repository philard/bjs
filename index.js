'use strict';
let i = 1;

let fs = require('fs');
let BinaryServer = require('binaryjs').BinaryServer;
let httpServer = require('./httpServer.js');


var server = BinaryServer({port: 9000});
server.on('connection', function(client){
    client.on('stream', function(stream, meta){
        var file = fs.createWriteStream(meta.file);
        stream.pipe(file);
        stream.on('data', function (data) {
            stream.write({ rx: data.length / meta.size });
        });
        stream.on('end', function () {
            stream.write({ end: true });
        });
    });
});


// Start Binary.js server
var server = BinaryServer({port: 9001});
// Wait for new user connections
server.on('connection', function(client){
    // Stream a flower as a hello!
    var file = fs.createReadStream(__dirname + '/public/media/flower.jpeg');
    client.send(file);
});
