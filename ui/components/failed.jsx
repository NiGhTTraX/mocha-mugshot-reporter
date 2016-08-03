import React from 'react';
import ImageDiff from 'react-image-diff';
import {Clearfix, ButtonGroup, Button, Jumbotron, Grid, Row, Col}
  from 'react-bootstrap';

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
        view = this.state.view,
        buttons = [];

    ['default', '2-up', 'swipe', 'fade'].forEach(function(item) {
      buttons.push(
        <Button
          name={item}
          key={item}
          onClick={changeView}
          className={item === view ? 'active' : null}>
            {item}
        </Button>
      );
    });

    return <div className='diffs'>
      <Jumbotron>
        <div className='simple'>

          {this.state.isDefault ?
              <img
                className='diff'
                src={images.diff}
                key={images.diff}
              /> : null }

          {this.state.is2Up ?
            <Grid>
                <Row className="show-grid">
                  <Col xs={12} md={6}>
                    <img
                      className='baseline'
                      src={images.baseline}
                      key={images.baseline}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <img
                      className='screenshot'
                      src={images.screenshot}
                      key={images.screenshot}
                    />
                  </Col>
                </Row>
            </Grid> : null }

        </div>

        {(!this.state.isDefault && !this.state.is2Up) ?
            <div className='special'>
              <ImageDiff
                before={images.screenshot}
                after={images.baseline}
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
      </Jumbotron>
      <ButtonGroup className='view-selector'>
        {buttons}
      </ButtonGroup>
    </div>;
  }
});

module.exports = Failed;
