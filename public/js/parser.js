function KeyParser(data) {
	this.results = [];

	if (!data.data) return;

	for (var key in data.data) {
		if (data.data.hasOwnProperty(key)) {
			var el = data.data[key];
			this.results.push({
				name: el.service || el.url,
				url: el.url,
				username: el.username,
				password: el.password
			});
		}
	}
}

KeyParser.prototype.getCSV = function() {
	var res = "name%2Curl%2Cusername%2Cpassword%0A";
	for (var index in this.results) {
		if (this.results.hasOwnProperty(index)) {
			var el = this.results[index];
			res += el.name + "%2C" + el.url + "%2C" + el.username + "%2C" + el.password + "%0A";
		}
	}
	return res;
};
