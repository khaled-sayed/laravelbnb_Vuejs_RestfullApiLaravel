// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();
var port = process.env.PORT || 5000
app.listen(port);
console.log('starting project at ' + port);
app.engine('pug', require('pug').__express);
app.set('views', '/');
app.set('view engine', 'pug');
//Look for statics first
app.use(serveStatic(path.join(__dirname, '/')));
//Return the index for any other GET request
app.get('/*', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '/')});
});