var sd = require('skin-deep'),
    expect = require('chai').expect,
    Details = require('../../../ui/components/details.jsx'),
    passDetails = require('../../fixtures/components/pass-details.js'),
    failDetails = require('../../fixtures/components/fail-details.js');

describe('Details', function() {
  var tree;

  describe('Passing', function() {
    beforeEach(function() {
      tree = sd.shallowRender(<Details details={passDetails}/>);
    });

    it('should render the PassedTest component', function() {
      expect(tree.findNode('PassedTest')).to.not.be.false;
    });

    it('should pass the baseline to the PassedTest component', function() {
      expect(tree.findNode('PassedTest').props.paths.baseline).to.be.equal(
        passDetails.paths.baseline);
    });

    it('should not pass a screenshot to the PassedTest component',
        function() {
          expect(tree.findNode('PassedTest').props.paths.screenshot)
              .to.be.undefined;
        });

    it('should not pass a diff to the PassedTest component', function() {
      expect(tree.findNode('PassedTest').props.paths.diff).to.be.undefined;
    });

    it('should pass the correct baseline path', function() {
      expect(tree.findNode('PassedTest').props.paths.baseline).to.be.
        equal(failDetails.paths.baseline);
    });
  });

  describe('Fail details', function() {
    beforeEach(function() {
      tree = sd.shallowRender(<Details details={failDetails}/>);
    });

    it('should render the FailedTest component', function() {
      expect(tree.findNode('FailedTest')).to.not.be.false;
    });

    it('should pass the baseline to the FailedTest component', function() {
      expect(tree.findNode('FailedTest').props.paths.baseline).to.be.equal(
        failDetails.paths.baseline);
    });

    it('should pass the screenshot to the FailedTest component', function() {
      expect(tree.findNode('FailedTest').props.paths.screenshot).to.be.equal(
        failDetails.paths.screenshot);
    });

    it('should pass the diff to the FailedTest component', function() {
      expect(tree.findNode('FailedTest').props.paths.diff).to.be.equal(
        failDetails.paths.diff);
    });

    it('should pass the correct screenshot path', function() {
      expect(tree.findNode('FailedTest').props.paths.screenshot).to.be.
        equal(failDetails.paths.screenshot);
    });

    it('should pass the correct diff path', function() {
      expect(tree.findNode('FailedTest').props.paths.diff)
          .to.be.equal(failDetails.paths.diff);
    });
  });
});
