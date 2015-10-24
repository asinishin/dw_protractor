var request = require('../node_modules/protractor/node_modules/request');
request = request.defaults({gzip: true, pool: {maxSockets: Infinity}, agentOptions: {rejectUnauthorized: false}});

function Api() {

	function makeRequest(url, method, params) {
		var defer = protractor.promise.defer();
		var opts = {
			uri: browser.params.apiBaseUrl + url,
			method: method
		};
		if (params) {
			opts.form = params;
		}
		request(opts, function(error, message) {
			//console.log("Done call to", url);
			if (error || message.statusCode >= 400) {
				console.log("Error:", error, message.body);
				defer.reject({
					error : error,
					message : message.body
				});
			} else {
				defer.fulfill(message.body);
			}
		});
		return defer.promise;
	}

	function get(url) {
		return makeRequest(url, 'GET');
	}

	function post(url, params) {
		return makeRequest(url, 'POST', params);
	}

	function put(url, params) {
		return makeRequest(url, 'PUT', params);
	}

	function destroy(url) {
		return makeRequest(url, 'DELETE');
	}

	this.fixturesUp = function() {
		return post('/test-fixtures.json');
	};

	this.fixturesDown = function() {
		return destroy('/test-fixtures/123.json');
	};

	this.fixturesReservationUnits = function() {
		return put('/test-fixtures/reservationUnits.json');
	};

	this.login = function(user, passw) {
		return post('/sessions.json', {login: user, password: passw});
	};

	this.logout = function() {
		return destroy('/sessions/123.json');
	};

	this.addMembershipType = function(data) {
		return post('/membership-types.json', data);
	};

	this.addPackage = function(data) {
		return post('/packages.json', data);
	};

	this.addPriceList = function(data) {
		return post('/price-lists.json', data);
	};

	this.addPriceListPackage = function(priceListId, data) {
		return post('/price-lists/' + priceListId + '/packages.json', data);
	};

	this.getCenters = function() {
		return get('/centers.json');
	};

	this.getApiBaseUrl = function() {
		return browser.params.apiBaseUrl;
	};
}

module.exports = new Api();
