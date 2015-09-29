var React = require('react'),
    Header = require('./header.jsx'),
    Results = require('./results.jsx');

function _hasPassed(test) {
  return test.state === 'passed';
}

var Report = React.createClass({
  render: function() {
    var suites = this.props.data,
        passes = [],
        failures = [],
        duration = 0;

    suites.forEach(function(suite) {
      passes = passes.concat(suite.tests.filter(function(test) {
        return _hasPassed(test);
      }));

      failures = failures.concat(suite.tests.filter(function(test) {
        return !_hasPassed(test);
      }));

      suite.tests.forEach(function(test) {
        duration += test.duration;
      });
    });

    return <div className="report">
      <Header passes={passes.length} failures={failures.length}
        duration={duration}/>
      <Results suites={suites}/>
    </div>;
  }
});

module.exports = Report;
