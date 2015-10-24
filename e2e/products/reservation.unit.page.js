module.exports = {
    addCategory: function(categoryName, openInventory, options) {
        if (openInventory) {
            sidebar.page.selectMenuItem('INVENTORY', 'RESERVATION CATEGORIES');
        } else {
            sidebar.page.selectItem('RESERVATION CATEGORIES');
        }

        element.all(by.css('ff-btn[sense="new"]')).first().click();
        element(by.model('vm.reservationType.name')).sendKeys(categoryName);

        if (options && options.description) {
            element.all(by.model('html')).first().clear().sendKeys(options.description);
        }

        if (options && options.product) {
            element(by.model('vm.reservationType.product')).element(by.css("option[label='" + options.product + " ']")).click();
        }

        if (options && options.membersCanReserve) {
            element(by.model('vm.reservationType.membersCanReserve')).click();
        }

        element.all(by.css('ff-btn[sense="save"]')).first().click();
    },

    addUnit: function(name, reservationCategory, options) {
        sidebar.page.selectItem('RESERVATION UNITS');
        element.all(by.css('ff-btn[sense="new"]')).first().click();
        element(by.model('vm.reservationUnit.name')).sendKeys(name);

        element(by.model('vm.reservationUnit.reservationType')).element(by.css("option[label='" + reservationCategory + "']")).click();

        if (options && options.whoCanReserve) {
            element(by.model('vm.reservationUnit.whoCanReserve')).element(by.css("option[label='" + options.whoCanReserve + "']")).click();
        }

        element.all(by.css('ff-btn[sense="save"]')).first().click();
    }
};
