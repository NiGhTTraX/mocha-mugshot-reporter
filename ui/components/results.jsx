import React from 'react';
import Suite from './suite.jsx';
import {Component} from 'react-component-tree';

class Results extends Component {

  get children() {
    return {
      suite: (suite, filter, key) => {
        return {
          component: Suite,
          suite: suite,
          filter: filter,
          key: key
        };
      }
    };
  }

  render() {
    const filter = this.props.filter;

    let suites = this.props.suites.slice(1).map((suite, index) =>
        this.loadChild('suite', suite, filter, index));

    return <section className="results container">
      {suites}
    </section>;
  }
}

Results.displayName = 'Results';

export default Results;
