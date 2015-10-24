module.exports = {
    reservationUnit: element.all(by.repeater('reservationUnit in vm.reservationUnits')).first()
};
