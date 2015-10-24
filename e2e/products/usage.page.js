module.exports = {
    addUsage: function(date, from, to, openMembers) {
        if (openMembers) {
            sidebar.page.selectMenuItem('MEMBERS', 'MEMBER USAGE');
        } else {
            sidebar.page.selectItem('MEMBER USAGE');
        }
        element.all(by.css('.member-usage ff-btn[sense="new"] button')).last().click();

        element(by.css('input[name="vm.editingUsage.checkInTimedate"]')).clear().sendKeys(date);
        element(by.css('input[name="vm.editingUsage.checkOutTimedate"]')).clear().sendKeys(date);
        element(by.css('input[name="vm.editingUsage.checkInTimetime"]')).clear().sendKeys(from);
        element(by.css('input[name="vm.editingUsage.checkOutTimetime"]')).clear().sendKeys(to);
        element(by.css('.member-usage-edit ff-btn[sense="save"] button')).click();
    }
};
