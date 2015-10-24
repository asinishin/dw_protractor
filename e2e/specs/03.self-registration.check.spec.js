describe('Activate Member By Coordinator', function() {
    beforeEach(function() {
        sandboxApi.login();
        sandboxApi.loadTestData('02-member-self-registration');

        login.page.get();
        login.steps.storeCoordinatorLogin();
    });

    afterEach(function() {
        login.page.signout();
    });

    it('should check the post payments or charges', function() {
        sidebar.page.clickSearch().click();

        element.all(by.css('.buttons-bottom ff-btn[sense=search]')).first().click();

        element.all(by.css('.flex-form ff-btn[sense=userSelect]')).last().click();

        sidebar.page.selectMenuItem('BILLING', 'POST PAYMENTS OR CHARGES');

        element.all(by.css('.flex-form ff-btn[sense=edit]')).last().click();

        expect(element.all(by.binding('item.name')).getText()).toEqual([ 'Cafe Unlimited', 'Registration', 'Credit card Payment' ]);
    });
});
