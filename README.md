First succeful demo of binaryjs.

server.js: 
Run "node server". 
Access http://localhost (see shareServer.js). 
Stream text to hard drive from the browsers client.

shareServer.js: 
Run "node shareServer". 
Access http://localhost in 2 windows. 
Stream images from one client to the server to the 2nd client.



TODO: 
Display the image in the 2nd client before the image has finished  streaming - before "stream.on('end')". 

23th April
