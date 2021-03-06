var path = require('path');
var express = require('express');
var app = express();
var conf = require('./env.js');
var root = path.join(__dirname, "..");

var views = require(path.join(root, 'site-conf/views.js'));
var menu = require(path.join(root, 'site-conf/menu.js'));
var sitecss = require(path.join(root, 'site-conf/sitecss.js'));
var sitejs = require(path.join(root, 'site-conf/sitejs.js'));

var envName = process.env.NODE_ENV;
if (!conf[envName]) {
  console.error("No env in env.js named: " + envName);
  return -255;
}
var myConf = conf[envName];

console.log("Server env: " + envName);

console.log("Listening @ " + myConf.listen + ":" + myConf.port +
  (myConf.debugjs ? " (serving full js under /debugjs)" : " (using uglified js)"));

app.set('view engine', 'jade');
app.set('views', 'public/views');

app.set('appviews', views);
app.set('menu', menu);
app.set('env', myConf);
app.set('sitejs', sitejs);
app.set('sitecss', sitecss);
app.set('title', "KeyParser");

app.use('/css', express.static('dist/css'));
app.use('/js', express.static('dist/js'));
app.use('/assets', express.static('bower_components')); // bower components at /assets
if (myConf.debugjs) app.use('/debugjs', express.static('public/js')); // serve unminified js at /debugjs?

app.get('/:view?', function(req, res) {
  var view = views[req.params.view] || "app";
  if (myConf.debugServer) console.log("Get " + view + " from " + req.connection.remoteAddress);
  res.render(view, {
    view: view
  });
});

var server = app.listen(myConf.port, function() {
  var host = myConf.listen || server.address().addres;
  var port = server.address().port;
});
