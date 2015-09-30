var sd = require('skin-deep'),
    expect = require('chai').expect,
    Details = require('../../../ui/components/details.jsx'),
    passDetails = require('../../fixtures/components/pass-details.js'),
    failDetails = require('../../fixtures/components/fail-details.js');

describe('Details', function() {
  var tree;

  describe('Passing', function() {
    beforeEach(function() {
      tree = sd.shallowRender(<Details paths={passDetails}/>);
    });

    it('should render the baseline', function() {
      expect(tree.findNode('.baseline')).to.not.be.false;
    });

    it('should not render the diff', function() {
      expect(tree.findNode('.diff')).to.be.false;
    });

    it('should not render the screenshot', function() {
      expect(tree.findNode('.screenshot')).to.be.false;
    });

    it('should have the correct baseline path', function() {
      expect(tree.findNode('.baseline').props.src).to.be.
        equal(failDetails.baseline);
    });
  });

  describe('Fail details', function() {
    beforeEach(function() {
      tree = sd.shallowRender(<Details paths={failDetails}/>);
    });

    it('should render the diff', function() {
      expect(tree.findNode('.diff')).to.not.be.false;
    });

    it('should render the screenshot', function() {
      expect(tree.findNode('.screenshot')).to.not.be.false;
    });

    it('should have the correct screenshot path', function() {
      expect(tree.findNode('.screenshot').props.src).to.be.
        equal(failDetails.screenshot);
    });

    it('should have the correct diff path', function() {
      expect(tree.findNode('.diff').props.src).to.be.equal(failDetails.diff);
    });
  });
});
