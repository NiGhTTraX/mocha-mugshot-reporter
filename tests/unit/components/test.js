var sd = require('skin-deep'),
    expect = require('chai').expect,
    Test = require('../../../ui/components/test.jsx'),
    passTest = require('../../fixtures/components/pass-test.js'),
    failTest = require('../../fixtures/components/fail-test.js');

describe('Test', function() {
  var tree;

  describe('Passing', function() {
    beforeEach(function() {
      tree = sd.shallowRender(<Test test={passTest} />);
    });

    it('should display the test title', function() {
      expect(tree.textIn('.test-title')).to.contain(passTest.title);
    });

    it('should display the pass state', function() {
      expect(tree.textIn('.test-state')).to.be.equal(passTest.state);
    });

    it('should render the Details component', function() {
      expect(tree.findNode('Details')).to.not.be.false;
    });

    it('should pass the passDetails to the Details component', function() {
      expect(tree.findNode('Details').props.details.paths.baseline).to.be.equal(
        passTest.result.baseline);
    });

    it('should not have initially the toggle class', function() {
      expect(tree.findNode('.test').props.className).to.not.
        contain(Test.DETAILS_TOGGLE_CLASS);
    });

    it('should have attached on the title the displayDetails cb', function() {
      var title, instance;

      title = tree.findNode('.test-title');
      instance = tree.getMountedInstance();

      expect(title.props.onClick).to.be.deep.equal(instance.onDetailsDisplay);
    });
  });

  describe('Failing', function() {
    beforeEach(function() {
      tree = sd.shallowRender(<Test test={failTest} />);
    });

    it('should display the fail state', function() {
      expect(tree.textIn('.test-state')).to.be.equal(failTest.state);
    });

    it('should pass the diff path', function() {
      expect(tree.findNode('Details').props.details.paths.diff).to.equal(
        failTest.result.diff);
    });

    it('should pass the new screenshot path', function() {
      expect(tree.findNode('Details').props.details.paths.screenshot).to.equal(
        failTest.result.screenshot);
    });
  });

  /**
   * Here should have been one more test, which will have tested if the
   * Test.DETAILS_TOGGLE_CLASS is really set on test title click, but
   * TestUtils.Simulate.click needs a real DOM and we are using the
   * Shallow Renderer, which is not so advanced to shallow rendering on a new
   * re-render, i.e on a setState(...) call, we will wait...
   */
});
