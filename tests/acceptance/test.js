import {expect} from 'chai';
import webdriverio from 'webdriverio';
import path from 'path';

const BROWSER_OPTIONS = {
  desiredCapabilities: {
    browserName: 'PhantomJS'
  }
};
const VIEWPORT_SIZE = {
  width: 1024,
  height: 768
};
const URL = 'file://' + path.join(__dirname, '..', '..', 'visual-report',
            'statics', 'index.html');

describe('Mocha Mugshot acceptace tests', function() {
  let client;

  before(function() {
    return client = webdriverio.remote(BROWSER_OPTIONS).init()
      .setViewportSize(VIEWPORT_SIZE)
      .url(URL);
  });

  it('should display the navigation bar', function() {
    client
        .isExisting('.navbar')
        .then(function(exists) {
          return expect(exists).to.be.true;
        });
  });

  it('should display the results', function() {
    client
        .isExisting('.results')
        .then(function(exists) {
          return expect(exists).to.be.true;
        });
  });

  it('should toggle the details when clicking on a test title', function() {
    client
        .click('.test-title:first')
        // gets the class atribute for all tests
        // but only the first one is toggled
        .getAttribute('.test', 'class')
        .then(function(testsClasses) {
          return expect(testsClasses[0]).to.contain('toggled');
        });
  });

  it('should display only the passed tests when clicking on Passed',
    function() {
      client
          .click('.passes')
          .getText('.test-state')
          .then(function(content) {
            return expect(content).to.not.contain('failed');
          });
    });

  it('should display only the failed tests when clicking on Failures',
    function() {
      client
          .click('.failures')
          .getText('.test-state')
          .then(function(content) {
            return expect(content).to.not.contain('passed');
          });
    });
});
