import {expect} from 'chai';
import chai from 'chai';
import Mugshot from 'mugshot';
import chaiMugshot from 'chai-mugshot';
import WebdriverIOAdapter from 'mugshot-webdriverio';
import webdriverio from 'webdriverio';
import path from 'path';
import {cleanUp} from '../helpers.js';

const MUGSHOT_OPTIONS = {
  rootDirectory: './tests/acceptance/setup/visual-tests'
};
const BROWSER_OPTIONS = {
  desiredCapabilities: {
    browserName: 'PhantomJS'
  }
};
const URL = 'file://' + path.join(__dirname, 'test.html');

describe('Generate a dummy report for testing', function() {
  describe('First suite', function() {
    let browser, mugshot, webdriverioInstance;

    before(function() {
      // Clean up before running the tests so the visual-report directory
      // will be created from scratch
      return cleanUp('visual-report')
        .then(() => {
          return webdriverioInstance = webdriverio.remote(BROWSER_OPTIONS)
            .init().url(URL);
        })
        .then(() => {
          browser = new WebdriverIOAdapter(webdriverioInstance);
          mugshot = new Mugshot(browser, MUGSHOT_OPTIONS);
        });
    });

    it('should be ok', function() {
      const captureItem = {name: 'screen1'};

      chai.use(chaiMugshot(mugshot, this.test.ctx));
      return expect(captureItem).to.be.identical;
    });

    it('should pass and generate diffs', function() {
      const captureItem = {name: 'screen2'};

      chai.use(chaiMugshot(mugshot, this.test.ctx));
      return expect(captureItem).to.not.be.identical;
    });

    after(function() {
      return webdriverioInstance.end();
    });
  });

  describe('Second suite', function() {
    let browser, mugshot, webdriverioInstance;

    before(function(done) {
      webdriverioInstance = webdriverio.remote(BROWSER_OPTIONS).init()
        .url(URL)
        .then(function() {
          browser = new WebdriverIOAdapter(webdriverioInstance);
          mugshot = new Mugshot(browser, MUGSHOT_OPTIONS);
          done();
        });
    });

    it('should pass and generate diffs', function() {
      const captureItem = {
        name: 'screen3',
        selector: '#rectangle2'
      };

      chai.use(chaiMugshot(mugshot, this.test.ctx));
      return expect(captureItem).to.not.be.identical;
    });

    it('should be ok', function() {
      const captureItem = {
        name: 'screen4',
        selector: '#rectangle3'
      };

      chai.use(chaiMugshot(mugshot, this.test.ctx));
      return expect(captureItem).to.be.identical;
    });

    after(function() {
      return webdriverioInstance.end();
    });
  });
});
