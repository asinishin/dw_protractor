module.exports = {
	menuButton: element(by.css('.menu-button')),
	sidebar: element(by.css('.sidebar')),
	signinButton: element(by.css('loginout > a')),

	linkByName: function(linkName) {
		return element(by.linkText(linkName));
	},

	groupByName: function(groupName) {
		return element.all(by.repeater('group in userFunctions'))
            .all(by.css('h4.sidebar-group-header'))
			.filter(function(e) {
                if (e) {
                    return e.getText().then(function(text) {
                        return text === groupName;
                    });
                } else {
                    var deferred = protractor.promise.defer();
                    return deferred.reject();
                }
			}).first();
	},
	groupByNames: function(groupNames) {
		return element.all(by.repeater('function in flatFunctions'))
			.all(by.css('a.sidebar-item'))
			.filter(function(e) {
				if (e) {
					return e.getText().then(function(text) {
						return text === groupNames;
					});
				} else {
					var deferred = protractor.promise.defer();
					return deferred.reject();
				}
			}).first();
	},
	selectedItem: function(groupNames) {
		var group = this.groupByNames(groupNames);
		group.click();

			var deferred = protractor.promise.defer();
			group.getAttribute('class').then(function(classes) {
				deferred.fulfill(classes.split(' ').indexOf('open') !== -1);
			});
			return deferred.promise;

	},

    openGroup: function(groupName) {
        var group = this.groupByName(groupName);
        group.click();

        browser.wait(function() {
            var deferred = protractor.promise.defer();
            group.getAttribute('class').then(function(classes) {
                deferred.fulfill(classes.split(' ').indexOf('open') !== -1);
            });
            return deferred.promise;
        });
    },

    checkIn: function() {
        var checkInGroup = element.all(by.css('.sidebar-group-header[ng-click*="checkInCollapse"]')).first();
        checkInGroup.click();

        browser.wait(function() {
            var deferred = protractor.promise.defer();
            checkInGroup.getAttribute('class').then(function(classes) {
                deferred.fulfill(classes.split(' ').indexOf('open') !== -1);
            });
            return deferred.promise;
        });

        return element.all(by.css('ff-btn[sense="checkIn"] button')).first().click();
    },

	selectMenuItem: function(groupName, itemName) {
        this.openGroup(groupName);
        return this.selectItem(itemName);
	},

	selectItem: function(itemName) {
        return element(by.linkText(itemName)).click();
    },

	selectCenter: function(centerName) {
		return element(by.model('dwSelectCenter.curCenterId')).element(by.css("option[label='" + centerName + "']")).click();
	},

    selectCoMemberProfile: function(name) {
        return element(by.model('currentProfile')).element(by.css('option[label="' + name + '"]')).click();
    },

	clickSearch: function() {
		//return element(by.css("span[ng-transclude]"));
		return element(by.css("label.user-selector span[ng-transclude]"));
	},

	get: function() {
		return browser.get(browser.baseUrl);
	}
};
