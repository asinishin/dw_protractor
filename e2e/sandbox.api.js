var request = require('../node_modules/protractor/node_modules/request');
request = request.defaults({jar: true});

function Api() {

    function makeRequest(url, method, params) {
        var defer = protractor.promise.defer();
        var opts = {
            method: method,
            uri: browser.params.sandboxApiBaseUrl + url
        };
        if (params) {
            opts.form = params;
        }
        request(opts, function(error, message) {
            //console.log("Done call to", url);
            if (error || message.statusCode >= 400) {
                console.log("Sandbox Error for :" + url, error, message.body);
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

    this.login = function() {
        flow.execute(function() {
            var params = {
                username: browser.params.sandboxUser,
                password: browser.params.sandboxPassword
            };

            var url = '/login';

            return post(url, params);
        });
    };

    this.runSweep = function(sweepDate) {
        var sweepId;
        flow.execute(function() {
            return requestSweep(sweepDate)
                .then(function(data) {
                    sweepId = JSON.parse(data).id;
                });
        });
        browser.wait(function() {
            return findSweep(sweepId);
        }, 60000);
    };

    function requestSweep(sweepDate) {
        var params = {
            sweepDate: sweepDate
        };

        var sandbox = browser.params.sandbox;
        var url = '/boxes-by-name/' + sandbox + '/run-sweep';
        return post(url, params);
    };

    function findSweep(id) {
        var sandbox = browser.params.sandbox;
        var deferred = protractor.promise.defer();
        get('/boxes-by-name/' + sandbox + '/find-sweep/' + id)
            .then(function(data) {
                var status = JSON.parse(data).status;
                deferred.fulfill(status !== 'in progress');
            });
        return deferred.promise;
    };

    this.loadTestData = function(fileName) {
        var loadId;
        flow.execute(function() {
            return requestTestDataLoad(fileName)
                .then(function(data) {
                    loadId = JSON.parse(data).id;
                });
        });
        browser.wait(function() {
            return findLoad(loadId);
        }, 20000);
    };

    function requestTestDataLoad(fileName) {
        var params = {
            loadFileName: fileName
        };

        var sandbox = browser.params.sandbox;
        var url = '/boxes-by-name/' + sandbox + '/load-test-data';
        return post(url, params);
    };

    function findLoad(id) {
        var sandbox = browser.params.sandbox;
        var deferred = protractor.promise.defer();
        get('/boxes-by-name/' + sandbox + '/find-load/' + id)
            .then(function(data) {
                var status = JSON.parse(data).status;
                deferred.fulfill(status !== 'in progress');
            });
        return deferred.promise;
    };

    this.storeTestData = function(fileName) {
        var uploadId;
        flow.execute(function() {
            return requestTestDataUpload(fileName)
                .then(function(data) {
                    uploadId = JSON.parse(data).id;
                });
        });
        browser.wait(function() {
            return findUpload(uploadId);
        }, 20000);
    };

    function requestTestDataUpload(fileName) {
        var params = {
            uploadFileName: fileName
        };

        var sandbox = browser.params.sandbox;
        var url = '/boxes-by-name/' + sandbox + '/store-test-data';
        return post(url, params);
    };

    function findUpload(id) {
        var sandbox = browser.params.sandbox;
        var deferred = protractor.promise.defer();
        get('/boxes-by-name/' + sandbox + '/find-upload/' + id)
            .then(function(data) {
                var status = JSON.parse(data).status;
                deferred.fulfill(status !== 'in progress');
            });
        return deferred.promise;
    };
}

module.exports = new Api();
