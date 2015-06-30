/***
 * urlparam: jade viewname mapping
 */
(function() {
  var root = this;

  var views = {
    "default": "app",
    "app": "app",
    "about": "about"
  };

  if (module && module.exports) module.exports = views;
  else root.views = views;

}).call(this);
