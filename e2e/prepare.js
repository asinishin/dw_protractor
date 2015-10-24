/**
 * Global app configuration and mocking. This code is executed by protractor.config.onPrepare handler once before starting specs.
 */

global.EC = protractor.ExpectedConditions;
global.flow = browser.controlFlow();
global.api = require('./api');
global.sandboxApi = require('./sandbox.api');
global.globalPage = require('./var/global.page.js');

global.sidebar = {page: require('./var/sidebar.page'), steps: require('./var/sidebar.steps')};
global.login = {page: require('./var/login.page'), steps: require('./var/login.steps')};

global.userProfile = {page: require('./members/user-profile.page'), steps: require('./members/user-profile.steps')};
global.selectMembership = {page: require('./members/select-membership.page'), steps: require('./members/select-membership.steps')};
global.billingProfile = {page: require('./billing/billing-profile.page'), steps: require('./billing/billing-profile.steps')};
global.purchase = {page: require('./billing/purchase.page')};
global.pricelist = {page: require('./products/pricelist.page')};
global.product = {page: require('./products/product.page')};
global.reservationUnit = {page: require('./products/reservation.unit.page')};
global.reservation = {steps: require('./reservation/reservation.steps')};
global.usage = {page: require('./products/usage.page')};

/**
 * Mock config and set correct testable apiBaseUrl
 */
var mockConfig = function(apiBaseUrl) {
	angular.module('deskworks').config(function(deskworksConfigProvider) {
		deskworksConfigProvider.setApiUrl(apiBaseUrl);
	});
};
browser.addMockModule('deskworks', mockConfig, browser.params.apiBaseUrl);
