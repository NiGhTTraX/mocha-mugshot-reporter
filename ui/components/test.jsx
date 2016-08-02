var React = require('react'),
    addons = require('react-addons'),
    Details = require('./details.jsx');

var Test = React.createClass({
  statics: {
    DETAILS_TOGGLE_CLASS: 'toggled'
  },
  getInitialState: function() {
    return {toggled: false};
  },
  displayDetails: function() {
    this.setState({toggled: !this.state.toggled});
  },
  render: function() {
    var test = this.props.test,
        cx = addons.classSet,
        classes = cx({
          test: true,
          toggled: this.state.toggled
        }),
        paths = {
          baseline: test.result.baseline
        };

    if (test.result.screenshot && test.result.diff) {
      paths.diff = test.result.diff;
      paths.screenshot = test.result.screenshot;
    }

    return <div className={classes}>
      <p className='test-title' onClick={this.displayDetails}>{test.title}
        <span className='test-state'>{test.state}</span>
      </p>
      <Details paths={paths}/>
    </div>;
  }
});

module.exports = Test;
