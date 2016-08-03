import {Clearfix, ButtonGroup, Button} from 'react-bootstrap';
var React = require('react'),
    ImageDiff = require('react-image-diff');

var Failed = React.createClass({
  getInitialState: function() {
    return {
      view: 'default',
      isDefault: true,
      is2Up: false,
      value: 0.5
    };
  },
  changeValue: function(element) {
    this.setState({
      value: element.target.value
    });
  },
  changeView: function(element) {
    var selectedView = element.target.name;
    this.setState({
      view: selectedView,
      isDefault: selectedView === 'default' ? true : false,
      is2Up: selectedView === '2-up' ? true : false
    });
  },
  render: function() {
    var images = this.props.paths,
        changeView = this.changeView,
        buttons = [];

    ['default', '2-up', 'swipe', 'fade'].forEach(function(item) {
      buttons.push(
        <Button
          name={item}
          key={item}
          onClick={changeView}>
            {item}
        </Button>
      );
    });

    return <div className='diffs'>
      {this.state.isDefault ?
          <img
            className='diff'
            src={images.diff}
            key={images.diff}
          /> : null }

      {this.state.is2Up ?
          <div>
            <img
              className='baseline'
              src={images.baseline}
              key={images.baseline}
            />
            <img
              className='screenshot'
              src={images.screenshot}
              key={images.screenshot}
            />
          </div> : null }

      {(!this.state.isDefault && !this.state.is2Up) ?
          <div className='special'>
            <ImageDiff
              before={images.baseline}
              after={images.screenshot}
              type={this.state.view}
              value={this.state.value}
            />
            <Clearfix/>
            <input
              type='range'
              min={0}
              max={1}
              step={.01}
              defaultValue={this.state.value}
              onChange={this.changeValue}
            />
          </div> : null }
      <Clearfix/>
      <ButtonGroup>
        {buttons}
      </ButtonGroup>
    </div>;
  }
});

module.exports = Failed;
