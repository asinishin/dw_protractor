function BillingProfileSteps() {

	this.storeCcInfo = function() {
		flow.execute(function() { return billingProfile.page.enterInput(billingProfile.page.ccNumber, '4111111111111111') });
		flow.execute(function() { return billingProfile.page.selectExpiryMonthOption(0) });
		flow.execute(function() { return billingProfile.page.selectExpiryYearOption(3) });
		flow.execute(function() { return billingProfile.page.enterInput(billingProfile.page.verificationCode, '123') });
	};

	this.createBillingProfile = function() {
		this.storeCcInfo();
		return globalPage.nextButton.click();
	}

}

module.exports = new BillingProfileSteps();
