(function() {

  window.Parsers = window.Parsers || [];
  window.Parsers.push({
    id: "lastpass",
    name: "LastPass",
    parseJson: function(data) {
      var results = "url,name,username,password\n";
      for (var i in data.data) {
        if (data.data.hasOwnProperty(i)) {
          var entry = data.data[i];
          results += (entry.url || entry.service) + "," + entry.service +
            "," + entry.username + "," + entry.password + "\n";
        }
      }
      return results;
    }
  });

})();
