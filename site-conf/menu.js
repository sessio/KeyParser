(function() {
  var root = this;

  var menu = [{
    "url": "/app",
    "title": "Converter",
  }, {
    "title": "About",
    "sub": [{
      "title": "This",
      "url": "/about"
    }, {
      "title": "GitHub",
      "url": "http://github.com/sessio/KeyParser"
    }, {
      "title": "Me",
      "url": "http://sessio.fi"
    }]
  }];

  if (module && module.exports) module.exports = menu;
  else root.menu = menu;

}).call(this);
