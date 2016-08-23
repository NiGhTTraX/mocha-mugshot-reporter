'use strict';
import _ from 'lodash';
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

  before(function(done) {
    client = webdriverio.remote(BROWSER_OPTIONS).init()
      .setViewportSize(VIEWPORT_SIZE)
      .url(URL)
      .then(function() {
        done();
      });
  });

  it('should display the navigation bar', function(done) {
    client
        .isExisting('.navbar')
        .then(function(exists) {
          expect(exists).to.be.true;
          done();
        });
  });

  it('should display the results', function(done) {
    client
        .isExisting('.results')
        .then(function(exists) {
          expect(exists).to.be.true;
          done();
        });
  });

  it('should toggle the details when clicking on a test title', function(done) {
    client
        // clicks on the first test title
        .click('.test-title')
        // gets the class atribute for all tests
        // but only the first one is toggled
        .getAttribute('.test', 'class')
        .then(function(testsClasses) {
          expect(testsClasses[0]).to.contain('toggled');
          done();
        });
  });

  it('should display only the passed tests when clicking on Passed',
    function(done) {
      client
          .click('.passes')
          .getText('.test-state')
          .then(function(content) {
            expect(_.includes(content, 'failed')).to.not.be.true;
            done();
          });
    });

  it('should display only the failed tests when clicking on Failures',
    function(done) {
      client
          .click('.failures')
          .getText('.test-state')
          .then(function(content) {
            expect(_.includes(content, 'passed')).to.not.be.true;
            done();
          });
    });
});
