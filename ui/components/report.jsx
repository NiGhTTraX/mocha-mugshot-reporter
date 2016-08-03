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
  updateFilter: function(newFilter) {
    this.setState({
      filter: newFilter
    });
  },
  render: function() {
    var suites = this.props.data,
        passes = [],
        failures = [],
        nrOfPasses = 0,
        nrOfFailures = 0,
        duration = 0;

    suites.forEach(function(suite) {
      passes = [];
      failures = [];

      suite.passes = passes.concat(suite.tests.filter(function(test) {
        return _hasPassed(test);
      }));
      nrOfPasses += suite.passes.length;

      suite.failures = failures.concat(suite.tests.filter(function(test) {
        return !_hasPassed(test);
      }));
      nrOfFailures += suite.failures.length;

      suite.tests.forEach(function(test) {
        duration += test.duration;
      });
    });

    return <div className="report">
      <Header
        passes={nrOfPasses}
        failures={nrOfFailures}
        duration={duration}
        filter={this.state.filter}
        updateFilter={this.updateFilter}/>
      <Results suites={suites} filter={this.state.filter}/>
    </div>;
  }
});

module.exports = Report;
