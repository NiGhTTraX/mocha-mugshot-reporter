var React = require('react'),
    Test = require('./test.jsx');

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
        };

    return <div className="suite" style={suiteStyle}>
      <h2 className="suite-title" style={titleStyle}>{suite.title}</h2>
      {suite.tests.map(function(test, index) {
          return <Test test={test} key={index}/>
        })}
    </div>;
  }
});

module.exports = Suite;
