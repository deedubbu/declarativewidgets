// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var wd = require('wd');
var Boilerplate = require('./utils/boilerplate');
var boilerplate = new Boilerplate();

describe('Widgets System Test', function() {
    boilerplate.setup(this.title, '/notebooks/tests/Walkthrough.ipynb');

    it('should not execute Urth.whenReady API until components have upgraded', function(done) {
        boilerplate.browser
            .elementById('apiTestText')
            .text().should.eventually.include('Luke')
            .nodeify(done);
    });
    it('should print the correct variable that is used for urth-core-function', function(done) {
        boilerplate.browser
            .elementById('invokeButton')
            .click()
            .click() // Safari requires extra click for some reason
            .waitForElementById('test1', wd.asserters.textInclude('world'), 10000)
            .nodeify(done);
    });

    it('should bind variable to channel a', function(done) {
        boilerplate.browser
            .elementById('aInput')
            .type('A')
            .waitForElementById('test2', wd.asserters.textInclude('A'), 10000)
            .nodeify(done);
    });

    it('should bind variable to channel b', function(done) {
        boilerplate.browser
            .elementById('bInput')
            .type('B')
            .waitForElementById('test3', wd.asserters.textInclude('B'), 10000)
            .nodeify(done);
    });

    it('should bind variables to channels independently', function(done) {
        boilerplate.browser
            .elementById('aInput')
            .type('2')
            .elementByCssSelector('#test2')
            .text().should.eventually.include('A2')
            .waitForElementById('test2', wd.asserters.textInclude('A2'), 10000)
            .waitForElementById('test3', wd.asserters.textInclude('B'), 10000)
            .nodeify(done);
    });

    it('should watch for changes in a watched variable', function(done) {
        boilerplate.browser
            .elementById('watchInput')
            .type('watched message')
            .waitForElementById('test4', wd.asserters.textInclude('watched message'), 10000)
            .nodeify(done);
    });

    it('should update output when DataFrame is modified and set to auto', function(done) {
        boilerplate.browser
            .elementByXPath('//div[contains(@class, "code_cell")]/div[contains(@class, "input")]/*[contains(., "Set dataframe data.")]')
            .click()
            .elementByLinkText('<', 'Cell')
            .click()
            .waitForElementByLinkText('Run Cells', wd.asserters.isDisplayed, 10000)
            .elementByLinkText('Run Cells')
            .click()
            .waitForElementByClassName('test5', wd.asserters.textInclude('Jane Doe'), 10000)
            .nodeify(done);
    });
});
