module.exports = {
	selectMembershipRadio: function(idx) {
		return element.all(by.model('vm.membershipType')).get(idx).click();
	},

	selectCenterOption: function(idx) {
		return element.all(by.options('center.name for center in vm.centers')).get(idx).click();
	},

	selectPackageOption: function(idx) {
		return element.all(by.options('product.name for product in vm.membershipType.products')).get(idx).click();
	}
};
