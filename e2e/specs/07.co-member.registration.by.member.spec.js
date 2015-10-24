describe('Co-member Registration', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        login.page.signout();
        if (browser.params.save) {
            sandboxApi.storeTestData('07-co-member');
        }
    });

    beforeEach(function() {
        sandboxApi.loadTestData('04-secondary-product');

        login.page.get();
        login.steps.conditionalMemberLogin('asmith');
    });

    afterEach(function() {
    });

    it('should add a co-member to member profile', function() {
        sidebar.page.selectItem('VIEW/EDIT PROFILE');

        element(by.css('flex-form[ff-section*="coMember"] ff-btn[sense="new"] button')).click();

        element(by.model('coMember.fullName')).sendKeys('Poul Greg');
        element(by.model('coMember.email')).sendKeys('pgreg@mail.com');
        element(by.model('coMember.phone')).sendKeys('222.333.4444');
        element(by.model('coMember.login')).sendKeys('pgreg');
        element(by.model('coMember.password')).sendKeys('123456');

        element(by.model('coMember.canMakeReservations')).click();
        element(by.model('coMember.getAccountingNotices')).click();
        element(by.model('coMember.getCenterNotices')).click();

        element(by.model('coMember.notes')).sendKeys('Will use conference room.');

        element(by.css('flex-form[ff-section*="coMember"] ff-btn[sense="ok"] button')).click();

        sidebar.page.selectItem('VIEW/EDIT PROFILE');

        expect(element.all(by.repeater('coMember in upCoMembers.userProfile.coMembers')).count()).toEqual(1);
    });
});
