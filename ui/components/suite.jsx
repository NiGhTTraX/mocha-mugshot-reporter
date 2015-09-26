var React = require('react'),
    Test = require('./test.jsx');

var Suite = React.createClass({
  render: function() {
    var suite = this.props.suite,
        suiteStyle = {
          marginLeft: 20 * (suite.indent - 1) + 'px'
        },
        titleStyle = {
          fontSize: 100 / suite.indent + '%'
        },
        tests;

    tests = suite.tests.map(function(test, index) {
      return <Test test={test} key={index}/>
    });

    return <div className="suite" style={suiteStyle}>
      <h2 className="suite-title" style={titleStyle}>{suite.title}</h2>
      {tests}
    </div>;
  }
});

module.exports = Suite;
