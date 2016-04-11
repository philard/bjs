//// Connect to Binary.js server
//var client = new BinaryClient('ws://localhost:9000');
//// Received new stream from server!
//client.on('stream', function(stream, meta){
//    // Buffer for parts
//    var parts = [];
//    // Got new data
//    stream.on('data', function(data){
//        parts.push(data);
//    });
//    stream.on('end', function(){
//        // Display new data in browser!
//        var img = document.createElement("img");
//        img.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
//        document.body.appendChild(img);
//    });
//});



document.querySelector('#writeText').addEventListener('click', function() {
    "use strict";
    var client = BinaryClient('ws://localhost:9000');
    client.on('open', function(stream){
        debugger;
        var stream = client.createStream({file: 'hello.txt'});
        stream.write('Hello');
        stream.write('World!');
        stream.end();
    });
});


document.querySelector('#readImage').addEventListener('click', function() {
    "use strict";

    var client = new BinaryClient('ws://localhost:9001');
    // Received new stream from server!
    client.on('stream', function(stream, meta){
        // Buffer for parts
        var parts = [];
        // Got new data
        stream.on('data', function(data){
            parts.push(data);
        });
        stream.on('end', function(){
            // Display new data in browser!
            var img = document.createElement("img");
            img.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
            document.body.appendChild(img);
        });
    });
})

