describe('Product Setup By Coordinator', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        login.page.signout();
        if (browser.params.save) {
            sandboxApi.storeTestData('16-another-center-product-setup');
        }
    });

    beforeEach(function() {
        sandboxApi.loadTestData('04-secondary-product');

        login.page.get();
        login.steps.storeCoordinatorLogin();

        sidebar.page.selectCenter('Satellite@Los Gatos');
    });

    afterEach(function() {
    });

    it('should prepare a price list in Los Gatos', function() {
        // Check number of products
        sidebar.page.openGroup('INVENTORY');

        // Create price list
        pricelist.page.createPriceList('Monthly Membership', 'Members');

        // Add Membership
        pricelist.page.addProduct('Membership', '1-0409 Cafe Unlimited', '250');

        // Add Registration
        pricelist.page.addProduct('Registration', '1-0100 Registration', '50');

        // Check number of products
        sidebar.page.selectItem('PRODUCTS');
        expect(element.all(by.repeater('product in productType.products')).count()).toEqual(3);
    });
});
