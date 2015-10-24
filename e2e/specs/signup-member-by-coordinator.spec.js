describe('Sign Up Member By Coordinator', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        login.page.signout();
    });

    beforeEach(function() {
        sandboxApi.loadTestData('16-another-center-product-setup');

        login.page.get();
        login.steps.conditionalCoordinatorLogin();
    });

    afterEach(function() {
    });

    it('should login with Coordinator Credentials', function() {
        expect(login.page.loginForm.isPresent()).toBeFalsy();
    });

    describe('Registration Start', function() {
        beforeEach(function() {
            sidebar.page.selectCenter('Satellite@Los Gatos');
        });

        it('should select center', function() {
            expect(element(by.model('dwSelectCenter.curCenterId')).$('option:checked').getText()).toEqual('Satellite@Los Gatos');
        });

        it('should open Register New Member form', function() {
            sidebar.page.selectMenuItem('MEMBERS', 'REGISTER NEW MEMBER');

            expect(browser.getCurrentUrl()).toContain('/new-member?center=2');
            expect(globalPage.getTitle()).toContain('New Member Registration');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 1 of 3');
        });
    });

    describe('Registration Steps', function() {
        beforeEach(function() {
            sidebar.page.selectCenter('Satellite@Los Gatos');

            sidebar.page.selectMenuItem('MEMBERS', 'REGISTER NEW MEMBER');
            userProfile.steps.createUserProfile(
                true,
                {
                    firstName: 'Ivan',
                    lastName: 'Petrov',
                    email: 'ipetrov@mail.com',
                    login: 'ipetrov'
                }
            );
        });

        it('should fill up details of the registration step 1 and move to the step 2', function() {
            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership.+billing-profile\?center=2/);
            expect(globalPage.getTitle()).toContain('Billing Profile');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 2 of 3');
        });

        it('should fill up details of the registration step 2 and move to the step 3', function() {
            userProfile.steps.CreateBillingProfile();

            expect(browser.getCurrentUrl()).toMatch(/\/new-member\/\d+\/membership\/billing-profile\/purchase\/\d+.+?center=2/);
            expect(globalPage.getTitle()).toContain('Confirm and Purchase Membership');
            expect(globalPage.stepTitle.getInnerHtml()).toBe('Step 3 of 3');
        });
    });

    describe('Confirm and Purchase Membership', function() {
        beforeEach(function () {
            sidebar.page.selectCenter('Satellite@Los Gatos');
            sidebar.page.selectMenuItem('MEMBERS', 'REGISTER NEW MEMBER');
            userProfile.steps.createUserProfile(
                true,
                {
                    firstName: 'Ivan',
                    lastName: 'Petrov',
                    email: 'ipetrov@mail.com',
                    login: 'ipetrov'
                }
            );
            userProfile.steps.CreateBillingProfile();
        });

        it('should validate activation at center', function() {
            userProfile.page.paymentButton.click();

            // Got to VIEW/EDIT PROFILE
            sidebar.page.selectItem('VIEW/EDIT PROFILE');
            // Expect that the member is activated at Satellite@Los Gatos
            expect(userProfile.page.activatedAt.getText()).toEqual('Satellite@Los Gatos');
        });
    });

});
