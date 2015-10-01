var React = require('react');

var Header = React.createClass({
  render: function() {
    return <header className='header'>
      <ul className='list-inline pull-right'>
        <li className='passes'>passes: {this.props.passes}</li>
        <li className='failures'>failures: {this.props.failures}</li>
        <li className='duration'>duration: {this.props.duration}</li>
      </ul>
    </header>;
  }
});

module.exports = Header;
