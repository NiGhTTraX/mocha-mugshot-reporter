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
          },
          tests = {
            all: suite.tests,
            passes: suite.passes,
            failures: suite.failures
          };

    return <div className="suite" style={suiteStyle}>
      <h2 className="suite-title" style={titleStyle}>{suite.title}</h2>
      {tests[this.props.filter].map(function(test, index) {
        return <Test test={test} key={index} />;
      })}
    </div>;
  }
}

Suite.displayName = 'Suite';
Suite.MARGIN_LEFT = 20;
Suite.FONT_SIZE = 100;

export default Suite;
