var React = require('react'),
    Header = require('./header.jsx');

var Report = React.createClass({
  render: function() {
    var data = this.props.data,
        passes = 0,
        failures = 0,
        duration = 0;

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].tests.length; j++) {
        if (data[i].tests[j].state === 'passed') {
          passes++;
        } else {
          failures++;
        }

        duration += data[i].tests[j].duration;
      }
    }

    return <div className="report">
      <Header passes={passes} failures={failures} duration={duration}/>
    </div>;
  }
});

module.exports = Report;
