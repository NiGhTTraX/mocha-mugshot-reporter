var sd = require('skin-deep'),
    expect = require('chai').expect,
    React = require('react'),
    Report = require('../../ui/components/report.jsx'),
    fixture = require('../fixtures/report.js');

describe('Report', function() {
  var passes = 0,
      failures = 0,
      duration = 0,
      tree;

  before(function() {
    for (var i = 0; i < fixture.length; i++) {
      for (var j = 0; j < fixture[i].tests.length; j++) {
        if (fixture[i].tests[j].state === 'passed') {
          passes++;
        } else {
          failures++;
        }

        duration += fixture[i].tests[j].duration;
      }
    }
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
