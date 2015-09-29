var sd = require('skin-deep'),
    expect = require('chai').expect,
    Results = require('../../../ui/components/results.jsx'),
    fixture = require('../../fixtures/components/results.js');

describe('Results', function() {
  var tree;

  beforeEach(function() {
    tree = sd.shallowRender(<Results data={fixture}/>);
  });

  it('should render the component with class "results"', function() {
    expect(tree.findNode('.results')).to.not.be.false;
  });

  it('should not render the root suite', function() {
    var suites = tree.findNode('.results').props.children;

    expect(suites[0]).to.be.equal.null;
  });

  it('should render the suites array', function() {
    var suites = tree.findNode('.results').props.children;

    for (var i = 1; i < suites.length; i++) {
      expect(suites[i].props.suite).to.be.equal(fixture[i]);
    }
  });
});
