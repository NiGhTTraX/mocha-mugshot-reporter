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
    const filter = this.props.filter,
          _this = this;
    let suites = this.props.suites.slice(1).map(function(suite, index) {
      return _this.loadChild('suite', suite, filter, index);
    });

    return <section className="results container">
      {suites}
    </section>;
  }
}

Results.displayName = 'Results';

export default Results;
