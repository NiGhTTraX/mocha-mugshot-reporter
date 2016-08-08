import React from 'react';
import ImageDiff from 'react-image-diff';
import {Clearfix, ButtonGroup, Button,
  Jumbotron, Grid, Row, Col, Panel}
  from 'react-bootstrap';

function _renderDefaultView(diff) {
  return <div className="simple">
      <img className="diff"
           src={diff}
           key={diff}
      />
    </div>;
}

function _render2UpView(baseline, screenshot) {
  return <div className="simple">
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <img className="baseline"
                 src={baseline}
                 key={baseline}
            />
          </Col>
          <Col xs={12} md={6}>
            <img className="screenshot"
                 src={screenshot}
                 key={screenshot}
            />
          </Col>
        </Row>
    </Grid>
  </div>;
}

function _renderSpecialView(baseline, screenshot, view, value, changeValue) {
  return <div className="special">
      <ImageDiff before={screenshot}
                 after={baseline}
                 type={view}
                 value={value}
      />
      <Clearfix/>
      <input type="range"
             min={0}
             max={1}
             step={.01}
             defaultValue={value}
             onChange={changeValue}
      />
    </div>;
}

module.exports = React.createClass({
  displayName: 'FailedTest',
  statics: {
    viewOptions: ['default', '2-up', 'swipe', 'fade']
  },
  getInitialState: function() {
    return {
      view: 'default',
      value: 0.5,
      openError: false
    };
  },
  /* handler for swipe and fade value*/
  changeValue: function(element) {
    this.setState({
      value: parseFloat(element.target.value)
    });
  },
  /* handler for switching between views */
  changeView: function(element) {
    var selectedView = element.target.name;
    this.setState({
      view: selectedView
    });
  },
  /* handler for the error text box */
  openErrorMessage: function() {
    this.setState({
      openError: !this.state.openError
    });
  },
  render: function() {
    var baseline = this.props.paths.baseline,
        screenshot = this.props.paths.screenshot,
        diff = this.props.paths.diff,
        error = this.props.error,
        view = this.state.view,
        buttons = [],
        report;

    /* buttons to select the report type */
    this.constructor.viewOptions.forEach(function(item) {
      buttons.push(
        <Button name={item}
                key={item}
                onClick={this.changeView}
                className={item === this.state.view ? 'active' : null}>
          {item}
        </Button>
      );
    }.bind(this));

    /* switch betwen report types */
    if (view === 'default') {
      report = _renderDefaultView(diff);
    } else {
      if (view === '2-up') {
        report = _render2UpView(baseline, screenshot);
      } else {
        if (view === 'swipe' || view === 'fade') {
          report = _renderSpecialView(baseline,
              screenshot, view, this.state.value, this.changeValue);
        }
      }
    }

    return <div className="diffs">
      <Button bsStyle="danger" bsSize="xsmall" onClick={this.openErrorMessage}>
        Show Error
      </Button>

      <Panel collapsible expanded={this.state.openError} bsStyle="danger">
        {error.message === undefined ?
          <p> This test did not fail because Mugshot found differences :( </p> :
          <p> {error.name} : {error.message} </p>
        }
      </Panel>

      {error.message !== undefined ?
        <div>
          <Jumbotron> {report} </Jumbotron>
          <ButtonGroup className="view-selector">
            {buttons}
          </ButtonGroup>
        </div> : null }
    </div>;
  }
});
