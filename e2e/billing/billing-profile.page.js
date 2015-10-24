module.exports = {
	billingInfo: element(by.css(".panel-title")),

	ccNumber: element(by.css("input[name='number']")),
	verificationCode: element(by.css("input[name='ccv']")),
	//ccOkButton: element(by.css("form[name^='formCreditCard'] ff-btn[sense=ok]")),

	enterInput: function(input, val) {
		return input.sendKeys(val);
	},
	clickButton: function(btn) {
		return btn.click();
	},

	selectExpiryMonthOption: function(val) {
		return element(by.css("select[name='expiryMonth']")).all(by.options('opt.name for opt in dwCC.monthOpts')).last().click();
	},
	selectExpiryYearOption: function(val) {
		return element(by.css("select[name='expiryYear']")).all(by.options('opt.name for opt in dwCC.yearOpts')).last().click();
	}
};
