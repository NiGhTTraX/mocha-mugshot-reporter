import React from 'react';
import ImageDiff from 'react-image-diff';
import {Clearfix, ButtonGroup, Button,
  Jumbotron, Grid, Row, Col, Panel}
  from 'react-bootstrap';

var Failed = React.createClass({
  getInitialState: function() {
    return {
      view: 'default',
      isDefault: true,
      is2Up: false,
      value: 0.5,
      openError: false
    };
  },
  /* handler for swipe and fade value*/
  changeValue: function(element) {
    this.setState({
      value: Number(element.target.value)
    });
  },
  /* handler for switching between views */
  changeView: function(element) {
    var selectedView = element.target.name;
    this.setState({
      view: selectedView,
      isDefault: selectedView === 'default' ? true : false,
      is2Up: selectedView === '2-up' ? true : false
    });
  },
  /* handler for the error text box */
  openErrorMessage: function() {
    this.setState({
      openError: !this.state.openError
    });
  },
  render: function() {
    var _this = this,
        baseline = this.props.paths.baseline,
        screenshot = this.props.paths.screenshot,
        diff = this.props.paths.diff,
        error = this.props.error,
        buttons = [],
        report;

    /* buttons to select the report type */
    ['default', '2-up', 'swipe', 'fade'].forEach(function(item) {
      buttons.push(
        <Button
          name={item}
          key={item}
          onClick={_this.changeView}
          className={item === _this.state.view ? 'active' : null}>
            {item}
        </Button>
      );
    });

    /* switch betwen report types */
    if (this.state.isDefault) {
      report = <div className='simple'>
          <img
            className='diff'
            src={diff}
            key={diff}
          />
        </div>
    } else {
      if (this.state.is2Up) {
        report = <div className='simple'>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} md={6}>
                  <img
                    className='baseline'
                    src={baseline}
                    key={baseline}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <img
                    className='screenshot'
                    src={screenshot}
                    key={screenshot}
                  />
                </Col>
              </Row>
          </Grid>
        </div>
      } else {
        if (!this.state.isDefault && !this.state.is2Up) {
          report = <div className='special'>
              <ImageDiff
                before={screenshot}
                after={baseline}
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
            </div>;
        }
      }
    }

    return <div className='diffs'>

      <Button bsStyle='danger' bsSize="xsmall" onClick={this.openErrorMessage}>
        Show Error
      </Button>

      <Panel collapsible expanded={this.state.openError} bsStyle="danger">
        {error.message === undefined ?
          <p>This test did not fail because Mugshot found differences :( </p> :
          <p> {error.name} : {error.message} </p>
        }
      </Panel>

      {error.message !== undefined ?
        <div>
          <Jumbotron> {report} </Jumbotron>
          <ButtonGroup className='view-selector'>
            {buttons}
          </ButtonGroup>
        </div> : null }
    </div>;
  }
});

module.exports = Failed;
