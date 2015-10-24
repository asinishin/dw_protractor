module.exports = {
	firstNameInput: element(by.css("input[name='firstName']")),
	lastNameInput: element(by.css("input[name='lastName']")),
	emailInput: element(by.css("input[name='email']")),
	//personalInfoOkButton: element(by.css("#upPersonalInfo ff-btn[sense=ok]")),

	phoneInput: element(by.css("input[name='number']")),
	//phoneOkButton: element(by.css("form[name^='formPhone'] ff-btn[sense=ok]")),

	loginInput: element(by.css("input[name='login']")),
	passwordInput: element(by.css("input[name='password']")),
	passwordConfirmationInput: element(by.css("input[name='passwordConfirmation']")),
	//loginOkButton: element(by.css("form[name='formPhoto'] ff-btn[sense=ok]")),

	cityInput: element(by.css("#upAddresses input[name='city']")),
	streetInput: element(by.css("#upAddresses input[name='street']")),
	zipInput: element(by.css("#upAddresses input[name='zip']")),
	//addressOkButton: element(by.css("form[name^='formAddress'] ff-btn[sense=ok]")),

	membershipStatusSelected: element(by.css("select[name='membershipStatus'] option:checked")),

	//leadSourceOkButton: element(by.css("form[name='formLeadSource'] ff-btn[sense=ok]")),
    paymentButton: element.all(by.css('.flex-form ff-btn[sense=save]')).first(),

	activatedAt: element(by.binding('upSystemInfo.userProfile.activatedAt')),
	membershipType: element(by.css('#upMembership [name="type"]')),
	membershipStatus: element(by.css('#upMembership [name="status"]')),
	membershipPriceList: element(by.css('#upMembership [name="priceList"]')),

	get: function(isRegistration) {
		if (isRegistration) {
			return browser.get(browser.baseUrl + '#/new-member?self-registration');
		} else {
			return browser.get(browser.baseUrl + '#/profile');
		}
	},

	enterInput: function(input, val) {
		return input.sendKeys(val);
	},
	clickButton: function(btn) {
		return btn.click();
	},

	selectStateOption: function(val) {
		return element(by.css("#upAddresses select[name='state'] option[label='" + val + "']")).click();
	},
	selectStatusOption: function(val) {
		return element(by.css("#upMembership select[name='status'] option[label='" + val + "']")).click();
	},
	selectMembershipPriceListOption: function(val) {
		return element(by.css("#upMembership select[name='priceList'] option[label='" + val + "']")).click();
	},
	selectMembershipTypeOption: function(val) {
		return element(by.css("#upMembership select[name='type'] option[label='" + val + "']")).click();
	},
	selectPlanTypeOption: function(val) {
		return element(by.css("#upMembership select[name='plan'] option[label='" + val + "']")).click();
	},
	selectLeadSourceOption: function() {
		return element.all(by.options('opt.name for opt in upLeadSource.userProfile.options.leadSources')).last().click();
	},
	selectTermsOfServiceOption: function() {
		return element(by.model("upTerms.userProfile.termsOfService")).click();
	}
};
