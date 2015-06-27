var express = require('express');
var app = express();

app.use(express.static('www')); // public www
app.use('/assets', express.static('bower_components')); // bower components at /assets
app.use('/js', express.static('build')); // built js

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
});
