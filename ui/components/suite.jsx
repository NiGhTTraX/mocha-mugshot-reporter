import React from 'react';
import Test from './test.jsx';

var Suite = React.createClass({
  statics: {
    MARGIN_LEFT: 20,
    FONT_SIZE: 100
  },
  render: function() {
    var suite = this.props.suite,
        suiteStyle = {
          marginLeft: this.constructor.MARGIN_LEFT * (suite.indent - 1)
        },
        titleStyle = {
          fontSize: this.constructor.FONT_SIZE / suite.indent + '%'
        },
        tests = [];

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
          return <Test test={test} key={index}/>
        })}
    </div>;
  }
});

module.exports = Suite;
