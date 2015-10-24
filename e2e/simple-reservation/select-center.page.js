module.exports = {
	get: function() { return browser.get(browser.baseUrl + '#/simple-reservation'); },

	//center: element(by.css('.centers > a[href="#/2"]'))
	center: element(by.css('#center-1'))
};
