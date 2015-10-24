function ReservationSteps() {
    this.makeReservation = function () {
        sidebar.page.selectedItem('MAKE A NEW RESERVATION');
        element.all(by.css('.weekday>div')).last().click();

        //StartTime-->
        element.all(by.css('.time-selector .half > .time-cell')).get(0).click();
        //EndTime-->
        element.all(by.css('.time-selector .half > .time-cell.time-cell-right')).get(1).click();

        element(by.css('[ng-click="vm.makeReservation()"]')).click();

        browser.wait(EC.visibilityOf(element(by.css('.new-reservation-confirm'))), 2000);

        element.all(by.css('ff-btn[sense="ok"]')).first().click();
    }
}

module.exports = new ReservationSteps();
