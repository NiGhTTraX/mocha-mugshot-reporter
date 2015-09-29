var sd = require('skin-deep'),
    expect = require('chai').expect,
    Suite = require('../../../ui/components/suite.jsx'),
    fixture = require('../../fixtures/components/suite.js');

describe('Suite', function() {
  var tree;

  beforeEach(function() {
    tree = sd.shallowRender(<Suite suite={fixture}/>);
  });

  it('should indent the suite properly', function() {
    var expected = {
      marginLeft: Suite.MARGIN_LEFT * (fixture.indent - 1) + 'px'
    };

    expect(tree.findNode('.suite').props.style).to.be.deep.equal(expected);
  });

  it('should render the suite title', function() {
    expect(tree.textIn('.suite-title')).to.be.equal(fixture.title);
  });

  it('should set the suite title fontSize correctly', function() {
    var expected = {
      fontSize: Suite.FONT_SIZE / fixture.indent + '%'
    };

    expect(tree.findNode('.suite-title').props.style).to.deep.equal(expected);
  });

  it('should render the tests array', function() {
    var testsArray = tree.findNode('.suite').props.children[1];

    testsArray.forEach(function(testComp, index) {
      expect(testComp.props.test).to.be.equal(fixture.tests[index]);
    });
  });
});
