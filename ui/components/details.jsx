import React from 'react';

class Details extends React.Component {
  render() {
    const baseline = this.props.paths.baseline;

    return <div className="diffs">
      <img className="baseline"
           src={baseline}
           ref="baseline" />
    </div>;
  }
}

Details.displayName = 'Details';

export default Details;
