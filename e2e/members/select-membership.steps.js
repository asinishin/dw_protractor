function SelectMembershipSteps() {

	this.storeMembership = function() {
		flow.execute(function() { return selectMembership.page.selectCenterOption(2) });
		flow.execute(function() { return selectMembership.page.selectMembershipRadio(0) });
		flow.execute(function() { return selectMembership.page.selectPackageOption(1) });
		globalPage.nextButton.click();
	};

}

module.exports = new SelectMembershipSteps();
