describe('LogIn and LogOut test', function() {
	beforeEach(function() {
        sandboxApi.login();
        sandboxApi.loadTestData('16-another-center-product-setup');
		login.page.get();
	});

	describe('Open Login Dialog step', function() {
		it('should open Login Dialog', function() {
			expect(login.page.loginForm.isDisplayed()).toBeTruthy();
		});
	});

	describe('Login step', function() {
		it('should Fail to Login with Random Credentials', function() {
			login.steps.storeRandomLogin();
			expect(login.page.authError.isDisplayed()).toBeTruthy();
		});

        describe('successful', function() {
            afterEach(function() {
                login.page.signout();
            });

            it('should Login with Coordinator Credentials', function() {
                login.steps.storeCoordinatorLogin();
                expect(login.page.loginForm.isPresent()).toBeFalsy();
            });
        });
	});

	describe('Logout', function() {
        beforeEach(function() {
            login.steps.storeCoordinatorLogin();
        });

        describe('prepare', function() {
            afterEach(function() {
                login.page.signout();
            });

            it('should see SignOut link', function() {
                expect(login.page.signinButton.element(by.css('a span')).getInnerHtml()).toEqual('Sign Out');
            });
        });

        describe('step', function() {
            it('should Logout and see Sign In link', function() {
                login.page.signout();
                expect(login.page.signinButton.element(by.css('a span')).getInnerHtml()).toEqual('Sign In');
            });
        });
	});

});
