module.exports = {
	reservationType: element.all(by.repeater('reservationType in vm.reservationTypes')).first()
};
