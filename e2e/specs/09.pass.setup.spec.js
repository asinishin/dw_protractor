describe('Product Pass Setup By Coordinator', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        login.page.signout();
        if (browser.params.save) {
            sandboxApi.storeTestData('09-pass-setup');
        }
    });

    beforeEach(function() {
        sandboxApi.loadTestData('00-ground-zero');

        login.page.get();
        login.steps.conditionalCoordinatorLogin();

        sidebar.page.selectCenter('Felton Telework Center');

        product.page.addCategory('Laptop Lounge', true);

        // Day Pass product
        product.page.addProduct(
            'Day Pass, Full',
            '1',
            '419',
            'Rental Hours',
            {passSize: '16', allowReservationCredits: true}
        );

        // Unlimited Lounge product
        product.page.addProduct(
            'Unlimited Lounge', '1', '429', 'Membership',
            {
                membershipType: 'Laptop Lounge',
                hasPasses: true,
                billingFrequency: 'Monthly',
                passProduct: 'Day Pass, Full'
            }
        );

        // Registration product
        product.page.addProduct('Registration', '1', '100', 'Registration');

        // Create price list
        pricelist.page.createPriceList('Monthly Membership', 'Members');

        // Add Membership
        pricelist.page.addProduct('Membership', '1-0429 Unlimited Lounge', '395', {passQty: '16'});

        // Add Registration
        pricelist.page.addProduct('Registration', '1-0100 Registration', '50');

        // Add Rental Hours
        pricelist.page.addProduct('Rental Hours', '1-0419 Day Pass, Full', '25');
    });

    afterEach(function() {
    });

    it('should add products', function() {
        // Check number of products
        sidebar.page.selectItem('PRODUCTS');
        expect(element.all(by.repeater('product in productType.products')).count()).toEqual(3);
    });

    it('should prepare Reservation Categories', function() {
        reservationUnit.page.addCategory(
            'Day Pass, Full',
            false,
            {
                description: 'Enjoy a productive day in our comfortable and inspired business lounge.',
                product: '1-0419 Day Pass, Full',
                membersCanReserve: true
            }
        );

        reservationUnit.page.addUnit('Non-member Day Pass, open lounge 1', 'Day Pass, Full', {whoCanReserve: 'Members & Staff'});

        // Check number of reservation units
        sidebar.page.selectItem('RESERVATION UNITS');
        expect(element.all(by.repeater('reservationUnit in vm.reservationUnits')).count()).toEqual(1);
    });
});
