function LoginSteps() {

	this.openLoginForm = function() {
		login.page.signinButton.click();
	};

	this.storeRandomLogin = function() {
		login.page.loginInput.sendKeys('random97835434597344');
		login.page.passwInput.sendKeys('random97835434597344');
		login.page.loginButton.click();
	};

    function coordinatorLogin() {
        login.page.loginInput.sendKeys('coordinator');
        login.page.passwInput.sendKeys('123456');
        login.page.loginButton.click();
    }
    function memberLogin(username) {
        login.page.loginInput.sendKeys(username);
        login.page.passwInput.sendKeys('123456');
        login.page.loginButton.click();
    }

	this.storeCoordinatorLogin = function() {
        coordinatorLogin();
	};

    this.conditionalCoordinatorLogin = function() {
        login.page.signinButton.element(by.css('a span')).getInnerHtml().then(function(text) {
            if (text === 'Sign In') {
                coordinatorLogin();
            }
        });
    };
    this.conditionalMemberLogin = function(username) {
        login.page.signinButton.element(by.css('a span')).getInnerHtml().then(function(text) {
            if (text === 'Sign In') {
                memberLogin(username);
            }
        });
    };
}

module.exports = new LoginSteps();
