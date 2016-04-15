var fs = require('fs');
var http = require('http');
var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;

var app = express();

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
// link it to express
var bs = BinaryServer({server: server});

// Wait for new user connections
bs.on('connection', function(connectedClient){   //  connectedClient is a binaryjs.BinaryClient

    var file = fs.createReadStream(__dirname + '/public/media/flower.jpeg');
    connectedClient.send(file);

    // Incoming stream from browsers
    connectedClient.on('stream', function(inStream, meta){ // inStream is a binaryjs.BinaryStream

        var i = 0;
        while(ithClient = bs.clients[i]) {
            i++;
            serve(ithClient, inStream, meta);
        }
    });

    function serve(ithClient, inStream, meta) {
        if(ithClient === connectedClient) {
            // This client is the client transmitting data.
            var file = fs.createReadStream(__dirname + '/public/media/ok.jpeg');
            var imageStream = ithClient.createStream();
            file.pipe(imageStream);
        } else {
            // This client will receive the inStream.
            console.log('clinet send');
            imageStream  = ithClient.createStream(meta);
            inStream.pipe(imageStream);
        }
    }

});

server.listen(80);
console.log('HTTP and BinaryJS server started on port 80');