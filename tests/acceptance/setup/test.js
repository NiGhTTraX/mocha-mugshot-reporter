'use strict';
import {expect} from 'chai';
import chai from 'chai';
import Mugshot from 'mugshot';
import chaiMugshot from 'chai-mugshot';
import webdriverio from 'webdriverio';
import path from 'path';

const WebdriverIOAdapter = Mugshot.adapters.WebdriverIO;
const MUGSHOT_OPTIONS = {
  rootDirectory: './tests/acceptance/setup/visual-tests'
};
const BROWSER_OPTIONS = {
  desiredCapabilities: {
    browserName: 'PhantomJS'
  }
};
const URL = 'file://' + path.join(__dirname, 'test.html');

describe('Testing the first time', function() {
  let browser, webdriverioInstance;

  before(function(done) {
    webdriverioInstance = webdriverio.remote(BROWSER_OPTIONS).init()
      .url(URL)
      .then(function() {
        browser = new WebdriverIOAdapter(webdriverioInstance);

        done();
      });
  });

  it('should be ok', function() {
    const captureItem = {name: 'screen1'},
          mugshot = new Mugshot(browser, MUGSHOT_OPTIONS),
          _this = this;

    chai.use(chaiMugshot(mugshot, _this.test.ctx));
    return expect(captureItem).to.be.identical;
  });

  it('should be ok too', function() {
    const captureItem = {name: 'screen2'},
          mugshot = new Mugshot(browser, MUGSHOT_OPTIONS),
          _this = this;

    chai.use(chaiMugshot(mugshot, _this.test.ctx));
    return expect(captureItem).to.be.identical;
  });

  after(function() {
    return webdriverioInstance.end();
  });
});

describe('Testing the second time', function() {
  let browser, webdriverioInstance;

  before(function(done) {
    webdriverioInstance = webdriverio.remote(BROWSER_OPTIONS).init()
      .url(URL)
      .then(function() {
        browser = new WebdriverIOAdapter(webdriverioInstance);

        done();
      });
  });

  it('should be ok', function() {
    const captureItem = {name: 'screen1'},
          mugshot = new Mugshot(),
          _this = this;

    chai.use(chaiMugshot(mugshot, _this.test.ctx));
    return expect(captureItem).to.be.identical;
  });

  it('should be ok too', function() {
    const captureItem = {name: 'screen2'},
          mugshot = new Mugshot(browser, MUGSHOT_OPTIONS),
          _this = this;

    chai.use(chaiMugshot(mugshot, _this.test.ctx));
    return expect(captureItem).to.be.identical;
  });

  after(function() {
    return webdriverioInstance.end();
  });
});
