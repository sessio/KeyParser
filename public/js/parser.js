function KeyParser() {
	this.results = [];
	this.failures = [];

	/** csv column => json key */
	this.mapping = {
		"name": "service",
		"url": "url",
		"username": "username",
		"password": "password"
	};
}

KeyParser.prototype.setMapping = function(mapping) {
	this.mapping = mapping;
};

KeyParser.prototype.parse = function(data) {
	var self = this;

	var obj = JSON.parse(data);
	if (!obj.data) throw "No data object in JSON";

	_.forEach(obj.data, function(entry, key) {
		var resObj = {};
		_.forEach(self.mapping, function(srcName, destName) {
			if (entry.hasOwnProperty(srcName)) {
				resObj[destName] = entry[srcName];
			} else {
				console.warn("no key: " + srcName + ": " + JSON.stringify(entry));
			}
		});
		self.results.push(resObj);
	});
};

KeyParser.prototype.getCSV = function() {
	var self = this;
	var res = ""; // resulttext

	_.forEach(self.mapping, function(o, k) {
		res += k + ",";
	});
	res = res.slice(0, -1) + "\n";

	_.forEach(self.results, function(res_o, res_k) {
		_.forEach(res_o, function(val, key) {
			res += '"' + val + '",';
		});
		res = res.slice(0, -1) + "\n";
	});

	return res;
};
