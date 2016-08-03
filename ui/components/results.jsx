import React from 'react';
import Suite from './suite.jsx';

var Results = React.createClass({
  render: function() {
    var suites,
        filter = this.props.filter;
    suites = this.props.suites.slice(1).map(function(suite, index) {
      return <Suite suite={suite} filter={filter} key={index}/>;
    });

    return <section className="container">
      {suites}
    </section>
  }
});

module.exports = Results;
