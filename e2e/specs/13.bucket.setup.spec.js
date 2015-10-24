describe('Bucket product setup', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        login.page.signout();
        if (browser.params.save) {
            sandboxApi.storeTestData('13-bucket-setup');
        }
    });

    beforeEach(function() {
        sandboxApi.loadTestData('00-ground-zero');

        login.page.get();
        login.steps.conditionalCoordinatorLogin();

        sidebar.page.selectCenter('Felton Telework Center');

        product.page.addCategory('Bucket of Hours', true);

        // Day Pass product
        product.page.addProduct(
            'Coworking Day Pass',
            '2',
            '1001',
            'Rental Hours',
            {
                passSize: '16',
                allowReservationCredits: true,
                description: 'Use of the coworking space for one day. Valid Mon - Fri, 8:30 am - 6 pm.'
            }
        );

        // Unlimited Lounge product
        product.page.addProduct(
            'Club, 3 day pass',
            '1',
            '1104',
            'Membership',
            {
                membershipType: 'Bucket of Hours',
                hasPasses: true,
                billingFrequency: 'As Needed',
                passProduct: 'Coworking Day Pass'
            }
        );

        // Registration product
        product.page.addProduct('Registration', '1', '100', 'Registration');

        // Create price list
        pricelist.page.createPriceList('Monthly Membership', 'Members');

        // Add Membership
        pricelist.page.addProduct('Membership', '1-1104 Club, 3 day pass', '160', {passQty: '3'});

        // Add Registration
        pricelist.page.addProduct('Registration', '1-0100 Registration', '50');

        // Add Rental Hours
        pricelist.page.addProduct('Rental Hours', '2-1001 Coworking Day Pass', '20');
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
            'Day Pass',
            false,
            {
                description: 'Day Passes give you access to IgnitedSpaces thoughtful workspace.',
                product: '2-1001 Coworking Day Pass',
                membersCanReserve: true
            }
        );

        reservationUnit.page.addUnit('Open Space', 'Day Pass', {whoCanReserve: 'Only Staff'});

        // Check number of reservation units
        sidebar.page.selectItem('RESERVATION UNITS');
        expect(element.all(by.repeater('reservationUnit in vm.reservationUnits')).count()).toEqual(1);
    });
});
