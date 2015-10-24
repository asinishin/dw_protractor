describe('Sign Up Member test', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        if (browser.params.save) {
            sandboxApi.storeTestData('02-member-self-registration');
        }
    });

    beforeEach(function() {
        sandboxApi.loadTestData('01-product-setup');
        userProfile.page.get(true);
    });

    describe('New Member step', function() {
        it('should create User Profile and get to New Membership page', function() {
            expect(browser.getCurrentUrl()).toContain('/new-member?self-registration');
            expect(globalPage.getTitle()).toContain('New Member Registration');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 1 of 4');
            userProfile.steps.createUserProfile();
            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership.+self-registration/);
        });

    });
    describe('New Membership step', function() {
        beforeEach(function() {
            userProfile.steps.createUserProfile();
        });

        it('should store Membership and get to Billing Profile page', function() {
            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership.+self-registration/);
            expect(globalPage.getTitle()).toContain('New Membership');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 2 of 4');
            userProfile.steps.storeMembership();
            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership\/billing-profile.+self-registration/);
        });
    });

    describe('Billing Info step', function() {
        beforeEach(function() {
            userProfile.steps.createUserProfile();
            userProfile.steps.storeMembership();
        });

        it('should create Billing Profile and get to Confirm and Purchase Membership page', function() {
            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership\/billing-profile.+self-registration/);
            expect(globalPage.getTitle()).toContain('Billing Profile');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 3 of 4');
            billingProfile.steps.createBillingProfile();
            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership\/billing-profile\/purchase\/\d+.+self-registration/);
        });
    });
    describe('Confirm and Purchase Membership step', function() {
        beforeEach(function() {
            userProfile.steps.createUserProfile();
            userProfile.steps.storeMembership();
            billingProfile.steps.createBillingProfile();
        });

        afterEach(function() {
            purchase.page.clickBackToHomePageButton();
            login.page.signout();
        });

        it('should confirm the Payment and get to Welcome page', function() {
            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership\/billing-profile\/purchase\/\d+.+self-registration/);
            expect(globalPage.getTitle()).toContain('Confirm and Purchase Membership');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 4 of 4');
            purchase.page.clickPaymentButton();
            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership\/billing-profile\/purchase\/\d+\/welcome.+self-registration/);
            expect(globalPage.getTitle()).toContain('Welcome');
        });
    });

});
