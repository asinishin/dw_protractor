describe('Sign Up Non-Member By Coordinator', function() {
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

        sidebar.page.selectCenter('Felton Telework Center');

        sidebar.page.selectMenuItem('MEMBERS', 'REGISTER NON-MEMBER');

        userProfile.steps.createNonMemberProfile(true);
        userProfile.steps.storeBilling();
    });

    afterEach(function() {
    });

    it('should register non-member in Los Gatos', function() {
        sidebar.page.selectItem('VIEW/EDIT PROFILE');

        expect(userProfile.page.activatedAt.getText()).toContain('Felton');

        // It is confusing, now we cannot identify membership or non-membership from profile
        //expect(userProfile.page.membershipType.getText()).toContain('Non-Member');

        expect(userProfile.page.membershipPriceList.getText()).toEqual('Walkin (Felton Telework Center)');
    });
});
