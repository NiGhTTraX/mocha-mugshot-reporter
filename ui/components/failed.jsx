import React from 'react';
import ImageDiff from 'react-image-diff';
import {Clearfix, ButtonGroup, Button,
  Jumbotron, Grid, Row, Col, Panel}
  from 'react-bootstrap';

function _renderDefaultView(diff) {
  return <div className="simple">
    <img className="diff"
         src={diff}
         key={diff} />
  </div>;
}

function _render2UpView(baseline, screenshot) {
  return <div className="simple">
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={6}>
          <img className="baseline"
               src={baseline}
               key={baseline} />
        </Col>
        <Col xs={12} md={6}>
          <img className="screenshot"
               src={screenshot}
               key={screenshot} />
        </Col>
      </Row>
    </Grid>
  </div>;
}

function _renderSpecialView(baseline, screenshot, view, value, onChangeValue) {
  return <div className="special">
    <ImageDiff before={screenshot}
               after={baseline}
               type={view}
               value={value} />
    <Clearfix />
    <input type="range"
           min={0}
           max={1}
           step={.01}
           defaultValue={value}
           onChange={onChangeValue} />
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

  render: function() {
    var {paths, error} = this.props,
        view = this.state.view,
        buttons = [],
        report;

    if (paths !== undefined) {
      var baseline = paths.baseline,
          screenshot = paths.screenshot,
          diff = paths.diff;
    }

    /* buttons to select the report type */
    this.constructor.viewOptions.forEach(function(item) {
      buttons.push(
        <Button name={item}
                key={item}
                onClick={this.onChangeView}
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
              screenshot, view, this.state.value, this.onChangeValue);
        }
      }
    }

    return <div className="diffs">
      <Button bsStyle="danger"
              bsSize="xsmall"
              onClick={this.onOpenErrorMessage}>
        Show Error
      </Button>

      <Panel collapsible expanded={this.state.openError} bsStyle="danger">
        {paths === undefined ?
          <p> This test did not fail because Mugshot found differences :( </p> :
          <p> {error.name} : {error.message} </p>
        }
      </Panel>

      {paths !== undefined ?
        <div>
          <Jumbotron> {report} </Jumbotron>
          <ButtonGroup className="view-selector">
            {buttons}
          </ButtonGroup>
        </div> : null }
    </div>;
  },

  /* handler for swipe and fade value*/
  onChangeValue: function(element) {
    this.setState({
      value: parseFloat(element.target.value)
    });
  },

  /* handler for switching between views */
  onChangeView: function(element) {
    var selectedView = element.target.name;
    this.setState({
      view: selectedView
    });
  },

  /* handler for the error text box */
  onOpenErrorMessage: function() {
    this.setState({
      openError: !this.state.openError
    });
  }
});
