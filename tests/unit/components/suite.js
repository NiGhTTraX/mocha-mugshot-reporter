var sd = require('skin-deep'),
    expect = require('chai').expect,
    React = require('react'),
    Suite = require('../../../ui/components/suite.jsx'),
    fixture = require('../../fixtures/components/suite.js');

describe('Suite', function() {
  var tree;

  beforeEach(function() {
    tree = sd.shallowRender(<Suite suite={fixture}/>);
  });

  it('should indent the suite properly', function() {
    var expected = {
      marginLeft: 20 * (fixture.indent - 1) + 'px'
    };

    expect(tree.findNode('.suite').props.style).to.be.deep.equal(expected);
  });

  it('should render the suite title', function() {
    expect(tree.textIn('.suite-title')).to.be.equal(fixture.title);
  });

  it('should set the suite title fontSize correctly', function() {
    var expected = {
      fontSize: 100 / fixture.indent + '%'
    };

    expect(tree.findNode('.suite-title').props.style).to.deep.equal(expected);
  });

  it('should render the tests array', function() {
    var tests = tree.findNode('.suite').props.children[1];

    for (var i = 0; i < tests.length; i++) {
      expect(tests[i].props.test).to.be.equal(fixture.tests[i]);
    }
  });
});
