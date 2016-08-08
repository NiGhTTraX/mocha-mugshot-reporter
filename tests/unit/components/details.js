var sd = require('skin-deep'),
    expect = require('chai').expect,
    Details = require('../../../ui/components/details.jsx'),
    passDetails = require('../../fixtures/components/pass-details.js'),
    failDetails = require('../../fixtures/components/fail-details.js');

describe('Details', function() {
  var tree, node, passedTestPaths, failedTestPaths;

  describe('Passing', function() {
    beforeEach(function() {
      tree = sd.shallowRender(<Details details={passDetails} />);
      node = tree.findNode('PassedTest');
    });

    it('should render the PassedTest component', function() {
      expect(node).to.not.be.false;
      passedTestPaths = node.props.paths;
    });

    it('should pass the baseline to the PassedTest component', function() {
      expect(passedTestPaths.baseline).to.be.equal(passDetails.paths.baseline);
    });

    it('should not pass a screenshot to the PassedTest component', function() {
      expect(passedTestPaths.screenshot).to.be.undefined;
    });

    it('should not pass a diff to the PassedTest component', function() {
      expect(passedTestPaths.diff).to.be.undefined;
    });

    it('should pass the correct baseline path', function() {
      expect(passedTestPaths.baseline).to.be.equal(failDetails.paths.baseline);
    });
  });

  describe('Fail details', function() {
    beforeEach(function() {
      tree = sd.shallowRender(<Details details={failDetails} />);
      node = tree.findNode('FailedTest');
    });

    it('should render the FailedTest component', function() {
      expect(node).to.not.be.false;
      failedTestPaths = node.props.paths;
    });

    it('should pass the baseline to the FailedTest component', function() {
      expect(failedTestPaths.baseline).to.be.equal(failDetails.paths.baseline);
    });

    it('should pass the screenshot to the FailedTest component', function() {
      expect(failedTestPaths.screenshot)
          .to.be.equal(failDetails.paths.screenshot);
    });

    it('should pass the diff to the FailedTest component', function() {
      expect(failedTestPaths.diff).to.be.equal(failDetails.paths.diff);
    });

    it('should pass the correct screenshot path', function() {
      expect(failedTestPaths.screenshot)
          .to.be.equal(failDetails.paths.screenshot);
    });

    it('should pass the correct diff path', function() {
      expect(failedTestPaths.diff).to.be.equal(failDetails.paths.diff);
    });
  });
});
