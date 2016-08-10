var sd = require('skin-deep'),
    expect = require('chai').expect,
    Suite = require('../../../ui/components/suite.jsx'),
    fixture = require('../../fixtures/components/suite.js');

describe('Suite', function() {
  var tree;

  beforeEach(function() {
    tree = sd.shallowRender(<Suite suite={fixture} filter="all" />);
  });

  it('should indent the suite properly', function() {
    var expected = Suite.MARGIN_LEFT * (fixture.indent - 1);
    expect(tree.findNode('.suite').props.style.marginLeft).to.be.
      equal(expected);
  });

  it('should render the suite title', function() {
    expect(tree.textIn('.suite-title')).to.be.equal(fixture.title);
  });

  it('should set the suite title fontSize correctly', function() {
    var expected = Suite.FONT_SIZE / fixture.indent + '%';

    expect(tree.findNode('.suite-title').props.style.fontSize).to.be.
      equal(expected);
  });

  it('should render the tests array', function() {
    var testsArray = tree.findNode('.suite').props.children[1];

    testsArray.forEach(function(testComp, index) {
      expect(testComp.props.test).to.be.equal(fixture.tests[index]);
    });
  });
});
