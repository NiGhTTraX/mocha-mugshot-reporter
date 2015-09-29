var React = require('react/addons'),
    Details = require('./details.jsx');

var Test = React.createClass({
  getInitialState: function() {
    return {toggle: false};
  },
  displayDetails: function() {
    this.setState({toggle: !this.state.toggle});
  },
  render: function() {
    var test = this.props.test,
        cx = React.addons.classSet,
        classes = cx({
          test: true,
          toogle: this.state.toggle
        });

    return <div className={classes}>
      <p onClick={this.displayDetails}>{test.title}
        <span>{test.state}</span>
      </p>
      <Details/>
    </div>;
  }
});

module.exports = Test;
