var sd = require('skin-deep'),
    expect = require('chai').expect,
    Results = require('../../../ui/components/results.jsx'),
    fixture = require('../../fixtures/components/results.js');

describe('Results', function() {
  var tree;

  beforeEach(function() {
    tree = sd.shallowRender(<Results data={fixture}/>);
  });

  it('should not render the root suite', function() {
    var suitesArray = tree.findNode('.results').props.children;

    expect(suitesArray[0]).to.be.equal.null;
  });

  it('should render the suites array', function() {
    var suitesArray = tree.findNode('.results').props.children;

    // Removes the root suite.
    suitesArray.shift();

    suitesArray.forEach(function(suitesComp, index) {
      expect(suitesComp.props.suite).to.be.equal(fixture[index + 1]);
    });
  });
});
