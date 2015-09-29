var React = require('react'),
    Suite = require('./suite.jsx');

var Results = React.createClass({
  render: function() {
    var suites;

    suites = this.props.data.slice(1).map(function(suite, index) {
      return <Suite suite={suite} key={index}/>;
    });

    return <section className="results">
      {suites}
    </section>
  }
});

module.exports = Results;


