//const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
//const JasmineReporters = require('jasmine-reporters');

exports.config = {
    //seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    allScriptsTimeout: 20000,
    
    specs: [
        './e2e/simulator/manufacturing-orders.spec.ts'
    ],
    
    capabilities: {
        'browserName': 'chrome',
        'phantomjs.binary.path': require('phantomjs-prebuilt').path,
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
    },
    
    directConnect: true,

    baseUrl: 'http://localhost:8080/',

    framework: 'jasmine2',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 720000
    },

    params: {
    },

    beforeLaunch: function() {
        
    },

    onPrepare: function() {
        require('ts-node').register({
            project: ''
        });
        /*
        browser.driver.manage().window().setSize(1280, 1024);
        jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
            savePath: 'build/reports/e2e',
            consolidateAll: false
        }));
        jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: "build/reports/e2e/screenshots"
        }));
        */
    },

    useAllAngular2AppRoots: true
};
