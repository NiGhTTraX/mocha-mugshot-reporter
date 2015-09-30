var React = require('react/addons'),
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
        cx = React.addons.classSet,
        classes = cx({
          test: true,
          toggled: this.state.toggled
        });

    return <div className={classes}>
      <p className='test-title' onClick={this.displayDetails}>{test.title}
        <span className='test-state'>{test.state}</span>
      </p>
      <Details/>
    </div>;
  }
});

module.exports = Test;
