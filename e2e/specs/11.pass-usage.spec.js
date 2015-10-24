describe('Usage with Pass Credit', function() {
    var tomorrow = new Date();
    tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1)).toISOString().split('T')[0];

    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        login.page.signout();
    });

    beforeEach(function() {
        sandboxApi.loadTestData('10-pass-member');

        login.page.get();
        login.steps.conditionalCoordinatorLogin();

        sidebar.page.clickSearch().click();
        element(by.css('ff-btn[sense="search"] button')).click();
        element.all(by.css('.flex-form ff-btn[sense=userSelect] button')).last().click();
    });

    afterEach(function() {
    });

    describe('Check In', function() {
        beforeEach(function() {
            sidebar.page.checkIn();
        });

        it('should create a usage log record', function() {
            sidebar.page.selectMenuItem('MEMBERS', 'MEMBER USAGE LOG');

            expect(element.all(by.repeater('log in vm.memberLog.log')).count()).toEqual(1);
        });

        it('should auto check out over night', function() {
            sandboxApi.runSweep(tomorrow);

            sidebar.page.selectMenuItem('MEMBERS', 'MEMBER USAGE LOG');

            expect(element.all(by.repeater('log in vm.memberLog.log')).count()).toEqual(2);
        });
    });

    describe('Billing', function() {
        it('should apply pass credit', function() {
            usage.page.addUsage(tomorrow, '09:00 AM', '06:00 PM', true);

            sidebar.page.selectMenuItem('BILLING', 'RECURRING BILLING');
            element.all(by.css('.recurring-charges ff-btn[sense="edit"] button')).last().click();

            element(by.model('vm.charge.nextBillDate')).getAttribute('value')
                .then(function(nextChargeStr) {
                    var nextChargeDate = new Date(nextChargeStr).toISOString().split('T')[0];
                    sandboxApi.runSweep(nextChargeDate);

                    sidebar.page.selectItem('POST PAYMENTS OR CHARGES');
                    element.all(by.css('.purchase-list ff-btn[sense="edit"] button')).last().click();

                    expect(element.all(by.repeater('item in vm.purchase.items')).count()).toEqual(4);
                });
        });
    });
});
