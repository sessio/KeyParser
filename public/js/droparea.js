$(function() {
	function handleFileUpload(files) {
		var reader = new FileReader();
		reader.onload = function(data) {
			var exportsObj = JSON.parse(data.target.result);
			var parser = new KeyParser(exportsObj);
			//$("#droptarget").text(parser.results.length + " Passwords found");
			if (parser.results.length > 0) {
				var csv = parser.getCSV();
				var dataurl = "data:application/octet-stream," + encodeURIComponent(csv);
				$("#download-results").prop("href", dataurl);
				$("#headline").text(parser.results.length + " Passwords found");
				$("#droptarget").addClass("fadeout").one("transitionend", function() {
					$("#droptarget").hide();
					$("#app-results").fadeIn();
				});
			} else {
				AppAlerts.Error("Wrong file format or 0 passwords");
			}
		};
		reader.readAsText(files[0]);
	}

	function dragenter(e) {
		e.stopPropagation();
		e.preventDefault();
		var el = $("#droptarget");
		if (!el.hasClass("active")) el.addClass("active");
	}

	function dragover(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	function dragleave(e) {
		$("#droptarget").removeClass("active");
	}

	function drop(e) {
		$("#droptarget").removeClass("active");

		e.stopPropagation();
		e.preventDefault();

		var dt = e.dataTransfer;
		var files = dt.files;

		handleFileUpload(files);
	}

	var dropbox = document.getElementById("droptarget");
	dropbox.addEventListener("dragenter", dragenter, false);
	dropbox.addEventListener("dragleave", dragleave, false);
	dropbox.addEventListener("dragover", dragover, false);
	dropbox.addEventListener("drop", drop, false);
});
