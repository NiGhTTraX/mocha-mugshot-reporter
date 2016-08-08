import React from 'react';
import Header from './header.jsx';
import Results from './results.jsx';

function _hasPassed(test) {
  return test.state === 'passed';
}

var Report = React.createClass({
  getInitialState: function() {
    return {
      filter: 'all'
    };
  },
  render: function() {
    var suites = this.props.data,
        numberOfPasses = 0,
        numberOfFailures = 0,
        duration = 0;

    suites.forEach(function(suite) {
      suite.passes = suite.tests.filter(function(test) {
        return _hasPassed(test);
      });
      numberOfPasses += suite.passes.length;

      suite.failures = suite.tests.filter(function(test) {
        return !_hasPassed(test);
      });
      numberOfFailures += suite.failures.length;

      suite.tests.forEach(function(test) {
        duration += test.duration;
      });
    });

    return <div className="report">
      <Header
        passes={numberOfPasses}
        failures={numberOfFailures}
        duration={duration}
        filter={this.state.filter}
        updateFilter={this.updateFilter} />

      <Results suites={suites} filter={this.state.filter} />
    </div>;
  },
  updateFilter: function(newFilter) {
    this.setState({
      filter: newFilter
    });
  }
});

module.exports = Report;
