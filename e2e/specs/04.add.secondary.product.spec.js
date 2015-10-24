describe('Secondary Product By Coordinator', function() {
    beforeAll(function() {
        sandboxApi.login();
    });

    afterAll(function() {
        // Create price list
        pricelist.page.createPriceList('Walkin', 'Non-Members');

        // Add Rental Hours
        pricelist.page.addProduct('Rental Hours', '4-0100 Conference Room, Large, hour', '40');

        login.page.signout();
        if (browser.params.save) {
            sandboxApi.storeTestData('04-secondary-product');
        }
    });

    beforeEach(function() {
        sandboxApi.loadTestData('02-member-self-registration');

        login.page.get();
        login.steps.conditionalCoordinatorLogin();

        // Conference Room product
        product.page.addProduct(
            'Conference Room, Large, hour',
            '4',
            '100',
            'Rental Hours',
            {openInventory: true, passSize: '1'}
        );

        // Edit price list
        pricelist.page.editPriceList();

        // Add Rental Hours
        pricelist.page.addProduct('Rental Hours', '4-0100 Conference Room, Large, hour', '30');
    });

    afterEach(function() {
    });

    it('should add secondary product', function() {
        sidebar.page.selectItem('PRODUCTS');

        expect(element.all(by.repeater('product in productType.products')).count()).toEqual(3);
    });

    it('should add secondary reservation unit', function() {
        reservationUnit.page.addCategory(
            'Conference Room',
            false,
            {
                description: 'Conference Room, Large, hour',
                product: '4-0100 Conference Room, Large, hour',
                membersCanReserve: true
            }
        );

        reservationUnit.page.addUnit('Conference Room 1', 'Conference Room', {whoCanReserve: 'Members & Staff'});
        reservationUnit.page.addUnit('Conference Room 2', 'Conference Room', {whoCanReserve: 'Members & Staff'});

        sidebar.page.selectItem('RESERVATION UNITS');

        expect(element.all(by.repeater('reservationUnit in vm.reservationUnits')).count()).toEqual(2);
    });
});
