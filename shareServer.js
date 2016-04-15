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
bs.on('connection', function(connectedClient){

    var file = fs.createReadStream(__dirname + '/public/media/flower.jpeg');
    connectedClient.send(file);

    // Incoming stream from browsers
    connectedClient.on('stream', function(inStream, meta){

        var client = i = 0;
        while(client = bs.clients[i]){
            i++;
            if(client === connectedClient) {
                var file = fs.createReadStream(__dirname + '/public/media/ok.jpeg')
                var test = connectedClient.createStream();
                file.pipe(test);
            } else {
                console.log('clinet send')
                inStream.pipe(client);
            }
        }
    });
});

server.listen(80);
console.log('HTTP and BinaryJS server started on port 80');