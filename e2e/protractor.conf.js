exports.config = {

    //baseUrl: 'http://01.sandbox.com/desktop/', // Front-End URL
    baseUrl: 'https://02.satellitedeskworks.com/desktop/', // Front-End URL

    params: {
        //apiBaseUrl: 'http://01.sandbox.com/api/v1', // Back-End URL
        //sandbox: '01', // Sandbox name
        //sandboxApiBaseUrl: 'http://sandbox.com/api',
        apiBaseUrl: 'https://02.satellitedeskworks.com/api/v1', // Back-End URL
        sandboxApiBaseUrl: 'https://sandbox.satellitedeskworks.com/api',
        sandbox: '02', // Sandbox name
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

    suites: {
        //focus: 'specs/02.member.self-registration.spec.js',
        //focus: 'specs/03.self-registration.check.spec.js',
        //focus: 'specs/04-coordinator-reservation.spec.js',
        //focus: 'specs/10.signup-pass-member.spec.js',
        //focus: 'specs/11.pass-usage.spec.js',
        focus: 'specs/15.bucket-usage.spec.js',
        //focus: 'specs/activate-member-by-coordinator.spec.js',
        //focus: 'specs/signup-member.spec.js',
        //focus: 'specs/signup-member-by-coordinator.spec.js',
        //focus: 'specs/signup-non-member-by-coordinator.spec.js',
        //focus: 'specs/signup-non-member.spec.js',
        product: 'specs/01.product.setup.spec.js'
        //product: 'specs/04.add.secondary.product.spec.js'
        //product: 'specs/16.another.center.product.setup.spec.js'
    },

    onPrepare: 'prepare.js'
};
