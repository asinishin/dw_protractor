describe('Co-member Reservation', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        if (browser.params.save) {
            sandboxApi.storeTestData('08-co-member-reservation');
        }
    });

    beforeEach(function() {
        sandboxApi.loadTestData('07-co-member');

        login.page.get();
        login.steps.conditionalMemberLogin('pgreg');
    });

    afterEach(function() {
        login.page.signout();
    });

    it('should reserve a conference room on behalf of master', function() {
        sidebar.page.selectCoMemberProfile('Adam Smith');

        reservation.steps.makeReservation();

        sidebar.page.selectedItem('VIEW/EDIT RESERVATIONS');
        expect(element(by.css('.page-title')).getText()).toMatch(/Reservations for Adam Smith/i);
        expect(element.all(by.repeater('reservation in vm.reservations')).count()).toEqual(1);
        expect(element(by.binding('reservation.reservationUnitName')).getText()).toEqual('Conference Room 1');
    });
});
