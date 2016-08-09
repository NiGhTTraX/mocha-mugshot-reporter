import React from 'react';
import Suite from './suite.jsx';

class Results extends React.Component {
  render() {
    const filter = this.props.filter;
    let suites = this.props.suites.slice(1).map(function(suite, index) {
      return <Suite suite={suite} filter={filter} key={index} />;
    });

    return <section className="results container">
      {suites}
    </section>;
  }
}

Results.displayName = 'Results';

export default Results;
