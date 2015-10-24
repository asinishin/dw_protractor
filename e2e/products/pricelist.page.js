module.exports = {
    addProduct: function(sectionName, productCode, price, options) {
        var sections = function() {
            return element.all(by.repeater('productType in vm.productTypes'))
                .all(by.css("flex-form[ff-label='" + sectionName + "']"));
        };

        var sectionPresent = function() {
            var deferred = protractor.promise.defer();
            sections().then(function(data) {
                deferred.fulfill(data.length > 0);
            });
            return deferred.promise;
        };

        browser.wait(sectionPresent, 2000);

        sections().all(by.css("button[ng-click*='vm.addProduct']")).first().click();

        sections().all(by.model('product.product'))
            .all(by.css("option[label='" + productCode + " ']")).first().click();

        sections().all(by.model('product.price')).first().sendKeys(price);

        if (options && options.passQty) {
            sections().all(by.model('product.passQty')).first().clear().sendKeys(options.passQty);
        }

        sections().all(by.css("button[ng-click*='vm.saveProduct']")).first().click();
    },

    createPriceList: function(name, useFor) {
        // Create price list
        sidebar.page.selectItem('PRICE LISTS');
        element.all(by.css('ff-btn[sense="new"] button')).first().click();
        element(by.model('vm.pricelist.name')).sendKeys(name);

        if (useFor) {
            element(by.model('vm.pricelist.useFor')).element(by.css("option[label='" + useFor + "']")).click();
        }

        // FIll up price list
        //var endDate = new Date();
        //endDate = new Date(endDate.setFullYear(endDate.getFullYear() + 1)).toISOString().split('T')[0];
        //var yesterday = new Date();
        //yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1)).toISOString().split('T')[0];
        //element(by.model('vm.pricelist.startDate')).clear().sendKeys(yesterday);
        //element(by.model('vm.pricelist.endDate')).clear().sendKeys(endDate);
        element.all(by.css('ff-btn[sense="save"] button')).first().click();
    },

    // TODO: Add price list name parameter to select it by the name
    editPriceList: function() {
        sidebar.page.selectItem('PRICE LISTS');
        element(by.css("button[ng-click*='vm.editPricelist']")).click();
    }
};
