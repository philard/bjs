'use strict';

let http = require('http');
let express = require('express');

let app = express();
let server = http.createServer(app);

app.use(express.static('public'));

server.listen('80', () => {console.log('express on port 80')});
