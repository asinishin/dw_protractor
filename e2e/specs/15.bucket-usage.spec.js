describe('Usage with Pass Credit', function() {
    var tomorrow = new Date();
    tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1)).toISOString().split('T')[0];
    var today = new Date().toISOString().split('T')[0];
    var yesterday = new Date();
    yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1)).toISOString().split('T')[0];
    var beforeYesterday = new Date();
    beforeYesterday = new Date(beforeYesterday.setDate(beforeYesterday.getDate() - 2)).toISOString().split('T')[0];

    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        login.page.signout();
    });

    beforeEach(function() {
        sandboxApi.loadTestData('14-bucket-member');

        login.page.get();
        login.steps.conditionalCoordinatorLogin();

        sidebar.page.clickSearch().click();
        element(by.css('ff-btn[sense="search"] button')).click();
        element.all(by.css('.flex-form ff-btn[sense=userSelect] button')).last().click();
    });

    afterEach(function() {
    });

    xdescribe('Check In', function() {
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
        it('should refill the bucket', function() {
            usage.page.addUsage(beforeYesterday, '05:00 AM', '11:00 PM', true);
            usage.page.addUsage(yesterday, '09:00 AM', '06:00 PM', false);
            usage.page.addUsage(today, '09:00 AM', '06:00 PM', false);

            sandboxApi.runSweep(tomorrow);

            sidebar.page.selectItem('MEMBER USAGE REPORT');

            expect(element.all(by.repeater('usage in memberUsage.usages')).count()).toEqual(5);
            expect(element(by.css('ff-info')).getText()).toContain('2.75');
        });
    });
});
