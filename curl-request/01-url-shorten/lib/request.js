var curl = require('curlrequest');

module.exports.replace = function(file) {
	return encodeURIComponent(file);
};

module.exports.request = function(url, file, cb) {
	
	var options = {
			url: url,
			method: 'PUT',
			headers: {
				'public-api-token': '783c5bfa0fb0b7a3870e01299d4b7023'				
			},
			data: {
				'urlToShorten': file				
			}
	};
	curl.request(options, function(err, stdout, meta) {
		var obj = JSON.parse(stdout);
		cb(err, obj.shortenedUrl);
	});
};

module.exports.createUrl = function() {
	
};
