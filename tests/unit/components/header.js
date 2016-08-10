var sd = require('skin-deep'),
    expect = require('chai').expect,
    Header = require('../../../ui/components/header.jsx'),
    fixture = require('../../fixtures/components/header.js');

describe('Header', function() {
  var tree;

  beforeEach(function() {
    tree = sd.shallowRender(<Header passes={fixture.passes}
      failures={fixture.failures} duration={fixture.duration} />);
  });

  it('should contain all tests number from props', function() {
    expect(tree.findNode('.all').props.children)
        .to.include(fixture.passes + fixture.failures);
  });

  it('should contain the passed tests number from props', function() {
    expect(tree.findNode('.passes').props.children)
        .to.include(fixture.passes);
  });

  it('should contain the failed tests number from props', function() {
    expect(tree.findNode('.failures').props.children)
        .to.include(fixture.failures);
  });

  it('should contain the tests duration from props', function() {
    expect(tree.findNode('.duration').props.children)
        .to.include(fixture.duration);
  });
});
