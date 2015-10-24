
module.exports = {
	menuButton: element(by.css('.menu-button')),
	signinButton: element(by.css('sign-in-link')),

	loginForm: element(by.name('formSignIn')),
	loginInput: element(by.model('vm.login')),
	passwInput: element(by.model('vm.password')),
	loginButton: element(by.css('.buttons-bottom ff-btn[sense=ok]')),
	signupButton: element(by.css('.sign-in ff-btn[sense=signup]')),

	authError: element(by.binding('vm.error')),

	get: function() {
		return browser.get(browser.baseUrl);
	},

	logout: function() {
		return browser.setLocation('sign-out?silent=true');
	},

    signout: function() {
        element(by.linkText('SIGN OUT')).click();
        browser.wait(EC.visibilityOf(login.page.loginForm), 2000);
    }
};
