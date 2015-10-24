module.exports = {
	welcomeThanks: element(by.css(".reg-thanks")),
	purchase: element(by.css(".purchase")),

    //paymentButton: element(by.css("#complete-purchase")),
	paymentButton: element(by.css("button[ng-attr-id='complete-purchase']")),

	paymentConfirmation: element(by.css(".form-sheet .page-title")),

	clickPaymentButton: function() {
		return this.paymentButton.click();
	},

	clickBackToHomePageButton: function() {
		element.all(by.css('ff-btn[sense="home"]')).first().click();
	}
};
