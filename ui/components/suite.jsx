import React from 'react';
import Test from './test.jsx';
import {Component} from 'react-component-tree';

class Suite extends Component {

  get children() {
    return {
      test: (test, key) => {
        return {
          component: Test,
          test: test,
          key: key
        };
      }
    };
  }

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
          },
          _this = this;

    return <div className="suite" ref="suite" style={suiteStyle}>
      <h2 className="suite-title"
          ref="suiteTitle"
          style={titleStyle}>
            {suite.title}
      </h2>
      {tests[this.props.filter].map(function(test, index) {
        return _this.loadChild('test', test, index);
      })}
    </div>;
  }
}

Suite.displayName = 'Suite';
Suite.MARGIN_LEFT = 20;
Suite.FONT_SIZE = 100;

export default Suite;
