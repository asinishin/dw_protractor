/**
 * Global selectors and actions
 */
module.exports = {
	getTitle: function() { return browser.getTitle(); },
	stepTitle: element.all(by.css(".step-title")).first(),

	nextButton: element.all(by.css('.buttons-bottom ff-btn[sense=next]')).first()
};
