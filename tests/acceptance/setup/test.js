import {expect} from 'chai';
import chai from 'chai';
import Mugshot from 'mugshot';
import chaiMugshot from 'chai-mugshot';
import WebdriverIOAdapter from 'mugshot-webdriverio';
import webdriverio from 'webdriverio';
import path from 'path';

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

    before(function(done) {
      webdriverioInstance = webdriverio.remote(BROWSER_OPTIONS).init()
        .url(URL)
        .then(function() {
          browser = new WebdriverIOAdapter(webdriverioInstance);
          mugshot = new Mugshot(browser, MUGSHOT_OPTIONS);

          done();
        });
    });

    it('should be ok', function() {
      const captureItem = {name: 'screen1'};

      chai.use(chaiMugshot(mugshot, this.test.ctx));
      return expect(captureItem).to.be.identical;
    });

    it('should fail and generate diffs', function() {
      const captureItem = {name: 'screen2'};

      chai.use(chaiMugshot(mugshot, this.test.ctx));
      return expect(captureItem).to.be.identical;
    });

    after(function() {
      return webdriverioInstance.end();
    });
  });

  describe('Second suite', function() {
    let browser, webdriverioInstance;

    before(function(done) {
      webdriverioInstance = webdriverio.remote(BROWSER_OPTIONS).init()
        .url(URL)
        .then(function() {
          browser = new WebdriverIOAdapter(webdriverioInstance);
          done();
        });
    });

    it('should fail with \'No browser provided\' error', function() {
      const captureItem = {name: 'screen3'},
            mugshot = new Mugshot();

      chai.use(chaiMugshot(mugshot, this.test.ctx));
      return expect(captureItem).to.be.identical;
    });

    it('should be ok', function() {
      const captureItem = {name: 'screen4'},
            mugshot = new Mugshot(browser, MUGSHOT_OPTIONS);

      chai.use(chaiMugshot(mugshot, this.test.ctx));
      return expect(captureItem).to.be.identical;
    });

    after(function() {
      return webdriverioInstance.end();
    });
  });
});
