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
bs.on('connection', function(client){

    // Incoming stream from browsers
    client.on('stream', function(stream, meta){

        // broadcast to all other clients
        for(var id in bs.clients){
            if(bs.clients.hasOwnProperty(id)){
                var otherClient = bs.clients[id];
                if(otherClient != client) {
                    var send = otherClient.createStream(meta);
                    stream.pipe(send);
                } else {
                    var send = otherClient.createStream();
                    var file = fs.createReadStream(__dirname + '/public/media/ok.jpeg')
                    file.pipe(send);
                }
            }
        }
    });
});

server.listen(80);
console.log('HTTP and BinaryJS server started on port 80');