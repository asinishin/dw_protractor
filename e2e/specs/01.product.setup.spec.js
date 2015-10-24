describe('Product Setup By Coordinator', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        login.page.signout();
        if (browser.params.save) {
            sandboxApi.storeTestData('01-product-setup');
        }
    });

    beforeEach(function() {
        sandboxApi.loadTestData('00-ground-zero');

        login.page.get();
        login.steps.storeCoordinatorLogin();

        sidebar.page.selectCenter('Felton Telework Center');
    });

    afterEach(function() {
    });

    it('should prepare Reservation Categories in Felton', function() {
        product.page.addCategory('Cafe Membership', true);

        // Cafe Unlimited product
        product.page.addProduct('Cafe Unlimited', '1', '409', 'Membership', {membershipType: 'Cafe Membership'});

        // Registration product
        product.page.addProduct('Registration', '1', '100', 'Registration');

        // Create price list
        pricelist.page.createPriceList('Monthly Membership', 'Members');

        // Add Membership
        pricelist.page.addProduct('Membership', '1-0409 Cafe Unlimited', '250');

        // Add Registration
        pricelist.page.addProduct('Registration', '1-0100 Registration', '50');

        // Check number of products
        sidebar.page.selectItem('PRODUCTS');
        expect(element.all(by.repeater('product in productType.products')).count()).toEqual(2);
    });
});
