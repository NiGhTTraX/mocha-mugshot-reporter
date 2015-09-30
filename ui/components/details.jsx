var React = require('react');

var Details = React.createClass({
  render: function() {
    var imgs = [];

    for (var image in this.props.paths) {
      imgs.push(<img className={image} src={this.props.paths[image]}
        key={this.props.paths[image]}/>);
    }

    return <div className='details'>
      {imgs}
    </div>;
  }
});

module.exports = Details;
