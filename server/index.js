var express = require('express');
var app = express();

var inProd = process.env.NODE_ENV === 'production';

console.log("Server env: " + (inProd ? "production" : "development"));

app.set('view engine', 'jade');
app.set('views', 'public/views');

app.use('/css', express.static('dist/css'));
app.use('/js', express.static('dist/js'));
if (!inProd) app.use('/debugjs', express.static('public/js'));
app.use('/assets', express.static('bower_components')); // bower components at /assets

app.get('/', function(req, res) {
  res.render('index', {
    production: inProd
  });
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
});
