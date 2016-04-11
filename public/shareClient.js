
// connect to the same host this was served from
var client = new BinaryClient('ws://' + document.location.host);
client.on('stream', function(stream, meta){
    // collect stream data
    var parts = [];
    stream.on('data', function(data){
        parts.push(data);
    });
    // when finished, set it as the background image
    stream.on('end', function(){
        var url = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
        document.body.style.backgroundImage = 'url(' + url + ')';
    });
});
// listen for a file being chosen
fileinput.addEventListener('change', function(event){
    var file = event.target.files[0];
    client.send(file);
}, false);