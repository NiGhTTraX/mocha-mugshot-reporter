import React from 'react';
import Test from './test.jsx';

class Suite extends React.Component {
  render() {
    const suite = this.props.suite,
          suiteStyle = {
            marginLeft: Suite.MARGIN_LEFT * (suite.indent - 1)
          },
          titleStyle = {
            fontSize: Suite.FONT_SIZE / suite.indent + '%'
          };
    let tests = [];

    if (this.props.filter === 'all') {
      tests = suite.tests;
    } else {
      if (this.props.filter === 'passes') {
        tests = suite.passes;
      } else {
        if (this.props.filter === 'failures') {
          tests = suite.failures;
        }
      }
    }

    return <div className="suite" style={suiteStyle}>
      <h2 className="suite-title" style={titleStyle}>{suite.title}</h2>
      {tests.map(function(test, index) {
        return <Test test={test} key={index} />;
      })}
    </div>;
  }
}

Suite.displayName = 'Suite';
Suite.MARGIN_LEFT = 20;
Suite.FONT_SIZE = 100;

export default Suite;
