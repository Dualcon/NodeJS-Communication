var expect    = require('chai').expect;
var assert = require('chai').assert;
var myFunction = require('../lib/request');

describe('How to use the curl module.', function() {

	var file;

	before(function () {
	});

	after(function () {
	});

	beforeEach(function(){
	});

	it('Encode the file name.', function(done) {
		var serverUrl = 'https://dualcon.ddns.net/';
		var mp3 = 'Sean Paul - Crick Neck ft. Chi Ching Ching.mp3';
		var expectedEncodedFileUrl = serverUrl + 'Sean%20Paul%20-%20Crick%20Neck%20ft.%20Chi%20Ching%20Ching.mp3';
		var actualEncodedFileUrl = myFunction.replace(mp3);
		expect(serverUrl + actualEncodedFileUrl).to.equal(expectedEncodedFileUrl);
		file = serverUrl + actualEncodedFileUrl; 
		done();
	});

	it('Make a HTTP request.', function(done) {
		var url = 'https://api.shorte.st/v1/data/url';
		var expected = 'http://sh.st/1fZZQ';
		myFunction.request(url, file, function(err, response) {
			expect(response).to.equal(expected);
			done();
		});
	});

});
