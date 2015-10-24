exports.config = {

	baseUrl: 'https://01.satellitedeskworks.com/desktop/', // Front-End URL

	params: {
		apiBaseUrl: 'https://01.satellitedeskworks.com/api/v1', // Back-End URL
        sandboxApiBaseUrl: 'https://sandbox.satellitedeskworks.com/api',
        sandbox: '01', // Sandbox name
        sandboxUser: 'test',
        sandboxPassword: '123456'
	},

	specs: ['**/*.spec.js'],

	allScriptsTimeout: 80000,

	directConnect: true,
	capabilities: {browserName: 'chrome'},

	framework: 'jasmine2',
	jasmineNodeOpts: {
		defaultTimeoutInterval: 70000
	},

	onPrepare: 'prepare.js'
};
