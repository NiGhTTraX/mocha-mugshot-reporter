var React = require('react');

var Details = React.createClass({
  render: function() {
    var paths = this.props.paths,
        imgs = [<img className='baseline' src={paths.baseline}
            key={paths.baseline}/>];

    if (Object.keys(paths).length > 1) {
      imgs.push(<img className='diff' src={paths.diff} key={paths.diff}/>);
      imgs.push(<img className='screenshot' src={paths.screenshot}
        key={paths.screenshot}/>);
    }

    return <div className='details'>
      {imgs}
    </div>;
  }
});

module.exports = Details;
