describe('Activate and Deactivate Non-member', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
    });

    beforeEach(function() {
        sandboxApi.loadTestData('04-secondary-product');

        login.page.get();
        login.steps.storeCoordinatorLogin();

        sidebar.page.selectMenuItem('MEMBERS', 'REGISTER NON-MEMBER');
        element(by.css("input[name='firstName']")).sendKeys('Jubilee');
        element(by.css("input[name='lastName']")).sendKeys('Osorio');
        element(by.css("input[name='email']")).sendKeys('osorio@mail.com');
        element(by.css("input[name='street']")).sendKeys('1st Street');
        element(by.css("input[name='city']")).sendKeys('Belmont');
        element(by.css("select[name='state'] option[label='CA']")).click();
        element(by.css("input[name='zip']")).sendKeys('930035');
        element(by.css("input[name='number']")).sendKeys('222.222.2222');
        element.all(by.options('opt.name for opt in upLeadSource.userProfile.options.leadSources')).last().click();

        globalPage.nextButton.click();

        userProfile.steps.storeBilling();

        sidebar.page.clickSearch().click();
        element(by.model('vm.activeMembers')).click();
        element(by.model('vm.nonMembers')).click();
        element.all(by.css('.buttons-bottom ff-btn[sense=search]')).first().click();
        element(by.model('vm.inactiveMembers')).click();
        element(by.model('vm.nonMembers')).click();
        element.all(by.css('.buttons-bottom ff-btn[sense=search]')).first().click();

        sidebar.page.selectItem('VIEW/EDIT PROFILE');
    });

    afterEach(function() {
        login.page.signout();
    });

    it('should deactivate the non-member', function() {
        element(by.css('#upMembership ff-btn[sense=edit]')).click();
        element(by.css("#upMembership select[name='status'] option[label='Inactive']")).click();
        element(by.css("#upMembership select[name='priceList'] option[label='Walkin (Felton Telework Center)']")).click();
        element(by.css('#upMembership ff-btn[sense=ok]')).click();

        sidebar.page.clickSearch().click();
        element(by.model('vm.activeMembers')).click();
        element(by.model('vm.inactiveMembers')).click();
        element(by.css('.buttons-bottom ff-btn[sense=search]')).click();
        element(by.model('vm.inactiveMembers')).click();
        element(by.model('vm.nonMembers')).click();
        element(by.css('.buttons-bottom ff-btn[sense=search]')).click();

        sidebar.page.selectItem('VIEW/EDIT PROFILE');

        expect(userProfile.page.activatedAt.getText()).toEqual('');
    });

    it('Should reactivate the non-member', function() {
        element(by.css('#upMembership ff-btn[sense=edit]')).click();
        element(by.css("#upMembership select[name='status'] option[label='Active']")).click();
        element(by.css('#upMembership ff-btn[sense=ok]')).click();

        sidebar.page.clickSearch().click();
        element(by.model('vm.activeMembers')).click();
        element(by.model('vm.nonMembers')).click();
        element(by.css('.buttons-bottom ff-btn[sense=search]')).click();
        element(by.model('vm.nonMembers')).click();
        element(by.model('vm.inactiveMembers')).click();
        element(by.css('.buttons-bottom ff-btn[sense=search]')).click();

        sidebar.page.selectItem('VIEW/EDIT PROFILE');

        expect(userProfile.page.activatedAt.getText()).toContain('Felton Telework Center');
    });
});
