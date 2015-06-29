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

// TODO: mapping from config
KeyParser.prototype.getCSV = function() {
	var res = "name,url,username,password\n";
	for (var index in this.results) {
		if (this.results.hasOwnProperty(index)) {
			var el = this.results[index];
			res += el.name + "," + el.url + "," + el.username + "," + el.password + "\n";
		}
	}
	return res;
};
