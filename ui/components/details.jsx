import _ from 'lodash';
import React from 'react';
import FailedTest from './failed.jsx';
import PassedTest from './passed.jsx';

class Details extends React.Component {
  render() {
    const paths = this.props.details.paths,
          error = this.props.details.error;

    return <div className="details">
      {_.isUndefined(paths) || Object.keys(paths).length !== 1
          ? <FailedTest paths={paths} error={error} />
          : <PassedTest paths={paths} />}
    </div>;
  }
}

Details.displayName = 'Details';

export default Details;
