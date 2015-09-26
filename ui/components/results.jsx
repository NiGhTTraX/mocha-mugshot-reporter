var React = require('react'),
    Suite = require('./suite.jsx');

var Results = React.createClass({
  render: function() {
    var suites = this.props.data.map(function(suite, index) {
      if (index === 0) {
        return null;
      }
      return <Suite suite={suite} key={index}/>;
    });

    return <section className="results">
      {suites}
    </section>
  }
});

module.exports = Results;


