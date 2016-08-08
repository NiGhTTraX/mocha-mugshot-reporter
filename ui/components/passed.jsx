import React from 'react';

module.exports = React.createClass({
  displayName: 'PassedTest',
  render: function() {
    var imgs = this.props.paths;
    return <div className="diffs">
      <img className="baseline"
           src={imgs.baseline}
           key={imgs.baseline}
      />
    </div>;
  }
});
