var sd = require('skin-deep'),
    expect = require('chai').expect,
    Results = require('../../../ui/components/results.jsx'),
    fixture = require('../../fixtures/components/data.js');

describe('Results', function() {
  var tree;

  beforeEach(function() {
    tree = sd.shallowRender(<Results suites={fixture} />);
  });

  it('should not render the root suite', function() {
    var suitesArray = tree.findNode('.results').props.children;

    expect(suitesArray).to.have.length(fixture.length - 1);
  });

  it('should render the suites array', function() {
    var suitesArray = tree.findNode('.results').props.children;

    suitesArray.forEach(function(suiteComp, index) {
      expect(suiteComp.props.suite).to.be.equal(fixture[index + 1]);
    });
  });
});
