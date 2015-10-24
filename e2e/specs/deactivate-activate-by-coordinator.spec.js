describe('Deactivate Member and Reactivate Member', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    describe('Deactivate Member and Reactivate Member', function() {
        beforeEach(function() {
            sandboxApi.loadTestData('04-secondary-product');
            login.page.get();
            login.steps.storeCoordinatorLogin();

            sidebar.page.selectMenuItem('MEMBERS', 'VIEW/EDIT PROFILE');

            element.all(by.css('.buttons-bottom ff-btn[sense=search]')).first().click();
            element.all(by.css('#searchResults ff-btn[sense=userSelect]')).last().click();
            element(by.css('#upMembership ff-btn[sense=edit]')).click();
            element(by.css('#upMembership select[name=status] option[label="Inactive"]')).click();
            element(by.css('#upMembership ff-btn[sense=ok]')).click();
        });
        afterEach(function() {
            login.page.signout();
        });

        it('should Deactivate Member',function() {
            sidebar.page.linkByName('VIEW/EDIT PROFILE').click();

            //expect Activated At to be Empty
            expect(userProfile.page.activatedAt.getText()).toEqual('');
            expect(userProfile.page.membershipStatus.getText()).toEqual('Inactive');
        });

        it('should Reactivate Member',function() {
            sidebar.page.clickSearch().click();

            element(by.model('vm.activeMembers')).click();
            element(by.model('vm.inactiveMembers')).click();
            element.all(by.css('.buttons-bottom ff-btn[sense=search]')).first().click();
            element.all(by.css('#searchResults ff-btn[sense=userSelect]')).last().click();
            element(by.css('#upMembership ff-btn[sense=edit]')).click();
            element(by.css("#upMembership select[name='status'] option[label='Active']")).click();
            element(by.css('#upMembership ff-btn[sense=ok]')).click();

            sidebar.page.linkByName('VIEW/EDIT PROFILE').click();
            expect(userProfile.page.activatedAt.getText()).toContain('Felton Telework Center');
            expect(userProfile.page.membershipStatus.getText()).toEqual('Active');
        });
    });
});
