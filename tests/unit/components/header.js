var sd = require('skin-deep'),
    expect = require('chai').expect,
    React = require('react'),
    Header = require('../../../ui/components/header.jsx'),
    fixture = require('../../fixtures/components/header.js');

describe('Header', function() {
  var tree;

  beforeEach(function() {
    tree = sd.shallowRender(<Header passes={fixture.passes}
      failures={fixture.failures} duration={fixture.duration}/>);
  });

  it('should contain the passed tests from props', function() {
    expect(tree.textIn('.passes')).to.contain(fixture.passes);
  });

  it('should contain the failed tests from props', function() {
    expect(tree.textIn('.failures')).to.contain(fixture.failures);
  });

  it('should contain the tests duration from props', function() {
    expect(tree.textIn('.duration')).to.contain(fixture.duration);
  });
});
