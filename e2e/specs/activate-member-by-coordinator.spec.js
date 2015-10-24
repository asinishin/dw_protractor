describe('Activate Member By Coordinator', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        login.page.signout();
    });

    beforeEach(function() {
        //sandboxApi.loadTestData('coordinator-start');
        sandboxApi.loadTestData('16-another-center-product-setup');

        login.page.get();
        login.steps.conditionalCoordinatorLogin();

        // Switch to Felton
        sidebar.page.selectCenter('Felton Telework Center');
    });

    afterEach(function() {
    });

    it('should activate the member in Felton', function() {
        sidebar.page.selectMenuItem('MEMBERS', 'VIEW/EDIT PROFILE');
        element(by.css('.user-search ff-btn[sense=search]')).click();
        element.all(by.css('.flex-form ff-btn[sense=userSelect]')).last().click();

        sidebar.page.selectCenter('Satellite@Los Gatos');

        element(by.css('#upMembership ff-btn[sense=edit]')).click();
        element(by.css('#upMembership select[name="status"] option[label="Active"]')).click();
        element(by.css('#upMembership select[name="priceList"] option[label="Monthly Membership (Satellite@Los Gatos)"]')).click();
        element(by.css('#upMembership ff-btn[sense=ok]')).click();

        // Refresh member profile before checking the result
        sidebar.page.linkByName('VIEW/EDIT PROFILE').click();

        expect(userProfile.page.activatedAt.getText()).toContain('Los Gatos');
    });
});
