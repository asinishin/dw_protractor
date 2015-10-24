describe('Coordinator Reservation', function() {
    beforeAll(function() {
        sandboxApi.login();
    });
    beforeEach(function() {
        sandboxApi.loadTestData('04-secondary-product');

        login.page.get();
        login.steps.storeCoordinatorLogin();
    });

    it('should reserve conference room', function(){
        sidebar.page.selectMenuItem('INVENTORY', 'RESERVATION CATEGORIES');
        element.all(by.css('.buttons-bottom ff-btn[sense=new]')).first().click();
        element(by.model('vm.reservationType.name')).clear().sendKeys('Conference Room');
        element.all(by.model('html')).first().clear().sendKeys('Conference Room');
        element(by.model('vm.reservationType.product')).click();
        element(by.model('vm.reservationType.product')).element(by.css("option[label='4-0100 Conference Room, Large, hour ']")).click();
        element(by.model('vm.reservationType.membersCanReserve')).click();
        element.all(by.css('.buttons-bottom ff-btn[sense=save]')).first().click();

        sidebar.page.selectItem('RESERVATION UNITS');
        element.all(by.css('.buttons-bottom ff-btn[sense=new]')).first().click();
        element(by.model('vm.reservationUnit.name')).clear().sendKeys('Conference Room, Large');
        element.all(by.css('.buttons-bottom ff-btn[sense=save]')).first().click();

        sidebar.page.selectMenuItem('RESERVATIONS', 'VIEW/EDIT RESERVATIONS');
        element.all(by.css('.buttons-bottom ff-btn[sense=search]')).first().click();
        element.all(by.css('.flex-form ff-btn[sense=userSelect]')).last().click();
        element.all(by.css('[ng-click="vm.newReservation()"]')).last().click();
        element.all(by.css('.weekday>div')).last().click();
        element.all(by.cssContainingText('.time-cell', '8:00')).first().click();
        element.all(by.cssContainingText('.time-cell', '10:30')).first().click();
        element.all(by.css('[ng-click="vm.makeReservation()"]')).last().click();
        element.all(by.css('[ng-click="reservationData.submitReservation(cancelReservation)"]')).last().click();

        sidebar.page.selectItem('VIEW/EDIT RESERVATIONS');

        expect(element.all(by.binding('reservation.reservationUnitName')).getText()).toEqual(['Conference Room 1']);
    });
});
