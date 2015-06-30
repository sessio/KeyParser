$(function() {
	/***
	Handle dropare events
	*/

	var zclient = new ZeroClipboard(document.getElementById("copy-results"));

	$("#show-results").click(function() {
		$("#csv-output").toggle();
	});

	function handleFileUpload(files) {
		var file = files[0];
		var reader = new FileReader();

		reader.onload = function(data) {
			try {
				var parser = new KeyParser();
				parser.parse(data.target.result);
				if (parser.results.length === 0) throw "No passwords in file";

				var csv = parser.getCSV();
				var dataurl = "data:application/octet-stream," + encodeURIComponent(csv);

				$("#csv-output").hide().val(csv);
				$("#download-results").prop("href", dataurl);
				$("#headline").text(parser.results.length + " Passwords found");
				$("#droptarget").addClass("fadeout").one("transitionend", function() {
					$("#droptarget").hide();
					$("#app-results").fadeIn();
				});
			} catch (err) {
				AppAlerts.Error(err);
			}
		};

		reader.readAsText(file);
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
	dropbox.addEventListener(
		"dragleave", dragleave, false);
	dropbox.addEventListener("dragover", dragover, false);
	dropbox.addEventListener("drop", drop, false);
});
