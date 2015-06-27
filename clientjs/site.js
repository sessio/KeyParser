$(function() {

  var parsers = window.Parsers;

  function findParser(id) {
    for (var i in parsers) {
      if (parsers[i].id === id) return parsers[i];
    }
    return false;
  }

  for (var i in parsers) {
    var parser = parsers[i];
    $("#parser-select").append("<option value='" + parser.id + "'>" +
      parser.name + "</option>");
  }

  $("#parsebutton").click(DoParse);
  $("#select-parser").change(DoParse);

  function DoParse() {
    console.log("doing parse updated");
    var data = readJson();
    if (data || true) {
      var Parser = findParser($("#parser-select").val());
      var results = Parser.parseJson(data);
      displayOutput(results);
    }
  }

  function readJson() {
    try {
      data = JSON.parse($("#fsecurejson").val());
    } catch (e) {
      return false;
    }
    return data;
  }

  function displayOutput(data) {
    $("#parseoutput").val(data);
  }

  $("#clear-button").click(function() {
    $("#fsecurejson").empty();
    $("#parseoutput").empty();
  });

  function handleFileUpload(files) {
    var reader = new FileReader();
    reader.onload = function(data) {
      $("#fsecurejson").val(data.target.result);
      DoParse();
    };
    reader.readAsText(files[0]);
  }

  /// Drag'n'drop stuff

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    handleFileUpload(files);
  }

  var dropbox = document.getElementById("fsecurejson");
  dropbox.addEventListener(
    "dragenter", dragenter, false);
  dropbox.addEventListener("dragover",
    dragover, false);
  dropbox.addEventListener("drop", drop, false);


});
