module.exports = {
    addCategory: function(categoryName, openInventory) {
        if (openInventory) {
            sidebar.page.selectMenuItem('INVENTORY', 'MEMBERSHIP CATEGORIES');
        } else {
            sidebar.page.selectItem('MEMBERSHIP CATEGORIES');
        }
        element.all(by.css('ff-btn[sense="new"] button')).first().click();
        element(by.model('vm.membershipType.name')).sendKeys(categoryName);
        element.all(by.css('ff-btn[sense="save"] button')).first().click();
    },

    addProduct: function(name, itemCategory, itemNumber, productType, options) {
        if (options && options.openInventory) {
            sidebar.page.selectMenuItem('INVENTORY', 'PRODUCTS');
        } else {
            sidebar.page.selectItem('PRODUCTS');
        }

        element.all(by.css('ff-btn[sense="new"] button')).first().click();
        element(by.model('vm.product.name')).sendKeys(name);
        element(by.model('vm.product.itemCategory')).clear().sendKeys(itemCategory);
        element(by.model('vm.product.itemNumber')).clear().sendKeys(itemNumber);
        element(by.model('vm.product.type')).element(by.css("option[label='" + productType + "']")).click();
        if (options && options.passSize) {
            element(by.model('vm.product.passSize')).sendKeys(options.passSize);
        }
        if (options && options.hasPasses) {
            element(by.model('vm.product.hasPasses')).click();
            element(by.model('vm.product.passProduct')).element(by.css("option[label='" + options.passProduct + "']")).click();
        }
        if (options && options.membershipType) {
            element(by.model('vm.product.membershipType')).element(by.css("option[label='" + options.membershipType + "']")).click();
        }
        if (options && options.billingFrequency) {
            element(by.model('vm.product.billingFrequency')).element(by.css("option[label='" + options.billingFrequency + "']")).click();
        }
        if (options && options.allowReservationCredits) {
            element(by.model('vm.product.allowReservationCredits')).click();
        }
        element.all(by.css('ff-btn[sense="save"] button')).first().click();
    }
};
