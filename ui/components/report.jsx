import React from 'react';
import Header from './header.jsx';
import Results from './results.jsx';
import {Component} from 'react-component-tree';

function _hasPassed(test) {
  return test.state === 'passed';
}

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all'
    };

    this.onFilterUpdate = this.onFilterUpdate.bind(this);
  }

  get children() {
    return {
      header: (numberOfPasses, numberOfFailures, duration) => {
        return {
          component: Header,
          passes: numberOfPasses,
          failures: numberOfFailures,
          duration: duration,
          filter: this.state.filter,
          updateFilter: this.onFilterUpdate
        };
      },
      results: (suites) => {
        return {
          component: Results,
          suites: suites,
          filter: this.state.filter
        };
      }
    };
  }

  render() {
    const suites = this.props.data;
    let numberOfPasses = 0,
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
      {this.loadChild('header', numberOfPasses, numberOfFailures, duration)}
      {this.loadChild('results', suites)}
    </div>;
  }

  onFilterUpdate(newFilter) {
    this.setState({
      filter: newFilter
    });
  }
}

Report.displayName = 'Report';

export default Report;
