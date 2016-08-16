import _ from 'lodash';
import React from 'react';
import FailedTest from './failed.jsx';
import PassedTest from './passed.jsx';
import {Component} from 'react-component-tree';

class Details extends Component {
  get children() {
    return {
      passedTest: (paths) => {
        return {
          component: PassedTest,
          paths: paths
        };
      },
      failedTest: (paths, error) => {
        return {
          component: FailedTest,
          paths: paths,
          error: error
        };
      }
    };
  }

  render() {
    const {paths, error} = this.props.details;

    return <div className="details">
      {_.isUndefined(paths) || Object.keys(paths).length !== 1
          ? this.loadChild('failedTest', paths, error)
          : this.loadChild('passedTest', paths)}
    </div>;
  }
}

Details.displayName = 'Details';

export default Details;
