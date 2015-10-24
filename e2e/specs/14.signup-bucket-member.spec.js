describe('Sign Up Member with Bucket By Coordinator', function () {
    var memberOptions = {
        membershipType: 'Bucket of Hours',
        membershipPlan: 'Club, 3 day pass',
        priceList: 'Monthly Membership (Felton Telework Center)'
    };

    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        if (browser.params.save) {
            sandboxApi.storeTestData('14-bucket-member');
        }
        login.page.signout();
    });

    beforeEach(function() {
        sandboxApi.loadTestData('13-bucket-setup');

        login.page.get();
        login.steps.conditionalCoordinatorLogin();
    });

    afterEach(function() {
    });

    describe('Registration Start', function () {
        beforeEach(function() {
            sidebar.page.selectCenter('Felton Telework Center');
        });

        it('should select center', function() {
            expect(element(by.model('dwSelectCenter.curCenterId')).$('option:checked').getText()).toEqual('Felton Telework Center');
        });

        it('should open Register New Member form', function() {
            sidebar.page.selectMenuItem('MEMBERS', 'REGISTER NEW MEMBER');

            expect(browser.getCurrentUrl()).toContain('/new-member?center=1');
            expect(globalPage.getTitle()).toContain('New Member Registration');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 1 of 3');
        });
    });

    describe('Registration Steps', function() {
        beforeEach(function() {
            sidebar.page.selectCenter('Felton Telework Center');

            sidebar.page.selectMenuItem('MEMBERS', 'REGISTER NEW MEMBER');
            userProfile.steps.createUserProfile(true, memberOptions);
        });

        it('should fill up details of the registration step 1 and move to the step 2', function() {
            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership.+billing-profile\?center=1/);
            expect(globalPage.getTitle()).toContain('Billing Profile');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 2 of 3');
        });

        it('should fill up details of the registration step 2 and move to the step 3', function() {
            userProfile.steps.CreateBillingProfile();

            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership\/billing-profile\/purchase\/\d+.+?center=1/);
            expect(globalPage.getTitle()).toContain('Confirm and Purchase Membership');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 3 of 3');
        });
    });

    describe('Confirm and Purchase Membership', function() {
        beforeEach(function() {
            sidebar.page.selectCenter('Felton Telework Center');
            sidebar.page.selectMenuItem('MEMBERS', 'REGISTER NEW MEMBER');
            userProfile.steps.createUserProfile(true, memberOptions);
            userProfile.steps.CreateBillingProfile();
        });

        it('should validate activation at center', function() {
            userProfile.page.paymentButton.click();

            // Got to VIEW/EDIT PROFILE
            sidebar.page.selectItem('VIEW/EDIT PROFILE');
            // Expect that the member is activated at Felton Telework Center
            expect(element(by.binding('upSystemInfo.userProfile.activatedAt')).getText()).toEqual('Felton Telework Center');
        });
    });

});
