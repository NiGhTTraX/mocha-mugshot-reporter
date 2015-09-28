var sd = require('skin-deep'),
    expect = require('chai').expect,
    Report = require('../../../ui/components/report.jsx'),
    fixture = require('../../fixtures/components/report.js');

describe('Report', function() {
  var passes = 0,
      failures = 0,
      duration = 0,
      tree;

  before(function() {
    fixture.forEach(function(suite) {
      suite.tests.forEach(function(test) {
        if (test.state === 'passed') {
          passes++;
        } else {
          failures++;
        }

        duration += test.duration;
      });
    });
  });

  beforeEach(function() {
    tree = sd.shallowRender(<Report data={fixture}/>);
  });

  it('should render the Header component', function() {
    expect(tree.findNode('Header')).to.not.be.false;
  });

  it('should calculate the number of passed tests', function() {
    expect(tree.findNode('Header').props.passes).to.be.equal(passes);
  });

  it('should calculate the number of failed tests', function() {
    expect(tree.findNode('Header').props.failures).to.be.equal(failures);
  });

  it('should calculate the total duration of the tests', function() {
    expect(tree.findNode('Header').props.duration).to.be.equal(duration);
  });
});
