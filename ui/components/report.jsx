var React = require('react'),
    Header = require('./header.jsx');

var Report = React.createClass({
  render: function() {
    var suites = this.props.data,
        passes = [],
        failures = [],
        duration = 0;

    suites.forEach(function(suite) {
      passes = passes.concat(suite.tests.filter(function(test) {
        return test.state === 'passed';
      }));

      failures = failures.concat(suite.tests.filter(function(test) {
        return test.state !== 'passed';
      }));

      suite.tests.forEach(function(test) {
        duration += test.duration;
      });
    });

    return <div className="report">
      <Header passes={passes.length} failures={failures.length}
        duration={duration}/>
    </div>;
  }
});

module.exports = Report;
