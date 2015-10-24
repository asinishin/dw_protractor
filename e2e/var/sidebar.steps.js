function SidebarSteps() {
	var self = this;

	self.openSidebar = function() {
		sidebar.page.sidebar.isDisplayed().then(function(result) {
			if(!result) {
				sidebar.page.menuButton.click();
			}
		});
		browser.sleep(400); // Animation delay
	};

	self.logout = function() {
		self.openSidebar();
		sidebar.page.signinButton.getInnerHtml().then(function(result) {
			if(result === 'Sign Out') {
				sidebar.page.signinButton.click();
			}
		});
	};
}

module.exports = new SidebarSteps();
