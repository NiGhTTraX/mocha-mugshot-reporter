import React from 'react';

class PassedTest extends React.Component {
  render() {
    const baseline = this.props.paths.baseline;

    return <div className="diffs">
      <img className="baseline"
           src={baseline} />
    </div>;
  }
}

PassedTest.displayName = 'PassedTest';

export default PassedTest;
