function UserProfileSteps() {

	this.storePersonalInfo = function(options) {
        var firstName;
        if (options && options.firstName) {
            firstName = options.firstName;
        } else {
            firstName = 'Adam'
        }

        var lastName;
        if (options && options.lastName) {
            lastName = options.lastName;
        } else {
            lastName = 'Smith'
        }

        var email;
        if (options && options.email) {
            email = options.email;
        } else {
            email = 'asmith@mail.com'
        }

		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.firstNameInput, firstName) });
		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.lastNameInput, lastName) });
		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.emailInput, email) });
	};

	this.storeLogin = function(options) {
        var login;
        if (options && options.login) {
            login = options.login;
        } else {
            login = 'asmith'
        }

		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.loginInput, login) });
		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.passwordInput, '123456') });
		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.passwordConfirmationInput, '123456') });
	};

	this.storeAddress = function() {
		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.streetInput, '123 Sem Lane') });
		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.cityInput, 'Belmont') });
		flow.execute(function() { return userProfile.page.selectStateOption('CA'); });
		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.zipInput, '930035') });
	};

	this.storePhone = function() {
		flow.execute(function() { return userProfile.page.enterInput(userProfile.page.phoneInput, '222.333.4444'); });
	};

	this.storeLeadSource = function(isCoordinator) {
		flow.execute(function() { return userProfile.page.selectLeadSourceOption(); });
		if (!isCoordinator) {
			flow.execute(userProfile.page.selectTermsOfServiceOption);
		}
	};
	this.storeBilling = function() {
		flow.execute(function() { return billingProfile.page.enterInput(billingProfile.page.ccNumber, '4111111111111111') });
		flow.execute(function() { return billingProfile.page.selectExpiryMonthOption(12) });
		flow.execute(function() { return billingProfile.page.selectExpiryYearOption(3) });
		flow.execute(function() { return billingProfile.page.enterInput(billingProfile.page.verificationCode, '123') });
		globalPage.nextButton.click();
		//flow.execute(function() { return billingProfile.page.clickButton(billingProfile.page.ccOkButton) });
	};

	this.storeMembership = function() {
		flow.execute(function() { return selectMembership.page.selectCenterOption(0) });
		flow.execute(function() { return selectMembership.page.selectMembershipRadio(0) });
		flow.execute(function() { return selectMembership.page.selectPackageOption(1) });
		globalPage.nextButton.click();
	};

	this.CreateBillingProfile = function() {
		this.storeBilling();
	};


	this.createUserProfile = function(isCoordinator, options) {
		this.storePersonalInfo(options);
		this.storeLogin(options);
		this.storeAddress();

		this.storePhone();

		if (isCoordinator) {
			flow.execute(function() { return userProfile.page.selectStatusOption('Active'); });

            var opts;

            if (options) {
                opts = options;
            } else {
                opts = {};
            }

            if (!opts.membershipType) {
                opts.membershipType = 'Cafe Membership';
            }

            if (!opts.membershipPlan) {
                opts.membershipPlan = 'Cafe Unlimited';
            }

            if (!opts.priceList) {
                opts.priceList = 'Monthly Membership (Satellite@Los Gatos)';
            }

			flow.execute(function() { return userProfile.page.selectMembershipTypeOption(opts.membershipType); });
			flow.execute(function() { return userProfile.page.selectPlanTypeOption(opts.membershipPlan); });
			flow.execute(function() { return userProfile.page.selectMembershipPriceListOption(opts.priceList); });
		}

		this.storeLeadSource(isCoordinator);
		return globalPage.nextButton.click();
	};

	this.createNonMemberProfile = function(isCoordinator) {
		this.storePersonalInfo({
            firstName: 'Ivan',
            lastName: 'Petrov',
            email: 'ipetrov@mail.com'
        });

        if (!isCoordinator) {
            this.storeLogin({login: 'ipetrov'});
        }

		this.storeAddress();

		this.storePhone();

		this.storeLeadSource(isCoordinator);
		return globalPage.nextButton.click();
	}

}

module.exports = new UserProfileSteps();
