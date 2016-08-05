import React from 'react';

var PassedTest = React.createClass({
  render: function() {
    var imgs = this.props.paths;
    return <div className='diffs'>
      <img
        className='baseline'
        src={imgs.baseline}
        key={imgs.baseline}
      />
    </div>;
  }
});

module.exports = PassedTest;
