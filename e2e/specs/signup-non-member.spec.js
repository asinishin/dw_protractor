var centersPage = require('../simple-reservation/select-center.page');
var reservationTypesPage = require('../simple-reservation/select-reservation-type.page');
var reservationTypeDetailsPage = require('../simple-reservation/reservation-type-details.page');
var reservationTypeDatePage = require('../simple-reservation/select-reservation-date.page');
var reservationUnitsPage = require('../simple-reservation/select-reservation-unit.page');
var reservationUnitTimePage = require('../simple-reservation/select-reservation-time.page');

describe('Sign Up Non-Member test', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

	beforeEach(function() {
        sandboxApi.loadTestData('16-another-center-product-setup');

		centersPage.get();
	});

	describe('Select Center step', function() {
		it('should select center and get to Select Reservation Type page', function() {
			expect(browser.getCurrentUrl()).toContain('/simple-reservation');
			expect(globalPage.getTitle()).toContain('Make New Reservation');
			centersPage.center.click();
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+/);
		});
	});

	describe('Select Reservation Type step', function() {
		beforeEach(function() {
			centersPage.center.click();
		});

		it('should select Reservation Type and get to Reservation Type Details page', function() {
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+/);
			expect(globalPage.getTitle()).toContain('Make New Reservation');
			reservationTypesPage.reservationType.click();
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+\/\d+/);
		});
	});

	describe('Reservation Type Details step', function() {
		beforeEach(function() {
			centersPage.center.click();
			reservationTypesPage.reservationType.click();
		});

		it('should click Reserve button and get to Select Date page', function() {
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+\/\d+/);
			expect(globalPage.getTitle()).toContain('Make New Reservation');
			reservationTypeDetailsPage.reserveButton.click();
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+\/\d+\/date/);
		});
	});

	describe('Select Date step', function() {
		beforeEach(function() {
			centersPage.center.click();
			reservationTypesPage.reservationType.click();
			reservationTypeDetailsPage.reserveButton.click();
		});

		it('should select Date and get to Select Reservation Unit page', function() {
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+\/\d+\/date/);
			expect(globalPage.getTitle()).toContain('Make New Reservation');
			reservationTypeDatePage.lastDateButton.click();
			globalPage.nextButton.click();
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+\/\d+\/date\/-|\d+/);
		});
	});

	describe('Select Reservation Unit step', function() {
		beforeEach(function() {
			centersPage.center.click();
			reservationTypesPage.reservationType.click();
			reservationTypeDetailsPage.reserveButton.click();
			reservationTypeDatePage.lastDateButton.click();
			globalPage.nextButton.click();
		});

		it('should select Reservation Unit and get to Select Time page', function() {
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+\/\d+\/date\/-|\d+/);
			expect(globalPage.getTitle()).toContain('Make New Reservation');
			reservationUnitsPage.reservationUnit.click();
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+\/\d+\/date\/-|\d+\/reservation-unit\/\d+/);
		});
	});

	describe('Select Time step', function() {
		beforeEach(function() {
			centersPage.center.click();
			reservationTypesPage.reservationType.click();
			reservationTypeDetailsPage.reserveButton.click();
			reservationTypeDatePage.lastDateButton.click();
			globalPage.nextButton.click();
			reservationUnitsPage.reservationUnit.click();
		});

		it('should select Time and go to sign in', function() {
			expect(browser.getCurrentUrl()).toMatch(/\/simple-reservation\/\d+\/\d+\/date\/-|\d+\/reservation-unit\/\d+/);
			reservationUnitTimePage.startTime.click();
			reservationUnitTimePage.endTime.click();
			globalPage.nextButton.click();
			expect(browser.getCurrentUrl()).toMatch(/\/sign-in/);
		});
	});

	describe('Sign In page / Sign Up step', function() {
		beforeEach(function() {
			centersPage.center.click();
			reservationTypesPage.reservationType.click();
			reservationTypeDetailsPage.reserveButton.click();
			reservationTypeDatePage.lastDateButton.click();
			globalPage.nextButton.click();
			reservationUnitsPage.reservationUnit.click();
			reservationUnitTimePage.startTime.click();
			reservationUnitTimePage.endTime.click();
			globalPage.nextButton.click();
		});

		it('should click Sign Up and get to New User Registration page', function() {
			login.page.signupButton.click();
			expect(browser.getCurrentUrl()).toMatch(/\/new-user.+self-registration/);
		});
	});

	describe('New User Registration step', function() {
		beforeEach(function() {
			navigateToUserProfile();
		});

		it('should create New User Profile and get to Billing Profile page', function() {
			expect(browser.getCurrentUrl()).toMatch(/\/new-user.+self-registration/);
			expect(globalPage.getTitle()).toContain('New User Registration');
			expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 1 of 3');
			//userProfile.steps.createUserProfile();
            userProfile.steps.createNonMemberProfile(false);
			expect(browser.getCurrentUrl()).toMatch(/\/new-user\/\d+\/membership\/billing-profile.+self-registration/);
		});
	});

	describe('Billing Profile step', function() {
		beforeEach(function() {
			navigateToUserProfile();
			//userProfile.steps.createUserProfile();
            userProfile.steps.createNonMemberProfile(false);
		});

		it('should create Billing Profile and get to Confirm and Purchase Reservation page', function() {
			expect(browser.getCurrentUrl()).toMatch(/\/new-user\/\d+\/membership\/billing-profile.+self-registration/);
			expect(globalPage.getTitle()).toContain('Billing Profile');
			expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 2 of 3');
			billingProfile.steps.createBillingProfile();
			expect(browser.getCurrentUrl()).toMatch(/\/new-user\/\d+\/membership\/billing-profile\/purchase\/\d+.+self-registration/);
		});
	});

	describe('Confirm and Purchase Reservation step', function() {
		beforeEach(function() {
			navigateToUserProfile();
			//userProfile.steps.createUserProfile();
            userProfile.steps.createNonMemberProfile(false);
			billingProfile.steps.createBillingProfile();
		});

        afterEach(function() {
            purchase.page.clickBackToHomePageButton();
            login.page.signout();
        });

        it('should confirm Payment and get to Welcome page', function() {
			expect(browser.getCurrentUrl()).toMatch(/\/new-user\/\d+\/membership\/billing-profile\/purchase\/\d+.+self-registration/);
			expect(globalPage.getTitle()).toContain('Confirm and Purchase Reservation');
			expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 3 of 3');
			purchase.page.clickPaymentButton();
			expect(browser.getCurrentUrl()).toMatch(/\/new-user\/\d+\/membership\/billing-profile\/purchase\/\d+\/welcome.+self-registration/);
			globalPage.nextButton.click();
			expect(purchase.page.welcomeThanks.isDisplayed()).toBeTruthy();
		});
	});

	function navigateToUserProfile() {
		centersPage.center.click();
		reservationTypesPage.reservationType.click();
		reservationTypeDetailsPage.reserveButton.click();
		reservationTypeDatePage.lastDateButton.click();
		globalPage.nextButton.click();
		reservationUnitsPage.reservationUnit.click();
		reservationUnitTimePage.startTime.click();
		reservationUnitTimePage.endTime.click();
		globalPage.nextButton.click();
		browser.wait(EC.visibilityOf(login.page.loginForm), 2000); // Animation delay
		login.page.signupButton.click();
	}
});
