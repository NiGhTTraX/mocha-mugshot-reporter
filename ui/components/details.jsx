import React from 'react';
import FailedTest from './failed.jsx';
import PassedTest from './passed.jsx';

var Details = React.createClass({
  render: function() {
    var paths = this.props.details.paths,
        error = this.props.details.error;

    return <div className='details'>
      {Object.keys(paths).length === 1 ?
        <PassedTest paths={paths}/> : <FailedTest paths={paths} error={error}/>}
    </div>;
  }
});

module.exports = Details;
