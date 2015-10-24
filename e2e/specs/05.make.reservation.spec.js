describe('Make Reservation', function() {
    beforeAll(function() {
        sandboxApi.login();
    });
    afterAll(function() {
        login.page.signout();
        if (browser.params.save) {
            sandboxApi.storeTestData('05-make-reservation');
        }
    });

    beforeEach(function() {
        sandboxApi.loadTestData('04-secondary-product');

        login.page.get();
        login.steps.conditionalMemberLogin('asmith');
    });

    it('should make new Reservation', function() {
        reservation.steps.makeReservation();

        sidebar.page.selectedItem('VIEW/EDIT RESERVATIONS');
        expect(element(by.css('.page-title')).getText()).toMatch(/Reservations for Adam Smith/i);
        expect(element.all(by.repeater('reservation in vm.reservations')).count()).toEqual(1);
        expect(element(by.binding('reservation.reservationUnitName')).getText()).toEqual('Conference Room 1');
    });
});
