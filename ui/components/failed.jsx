import React from 'react';
import ImageDiff from 'react-image-diff';
import {Clearfix, ButtonGroup, Button,
  Jumbotron, Grid, Row, Col, Panel}
  from 'react-bootstrap';

function _renderDefaultView(paths) {
  return <div className="simple">
    <img className="diff"
         src={paths.diff}
         key={paths.diff} />
  </div>;
}

function _render2UpView(paths) {
  return <div className="simple">
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={6}>
          <img className="baseline"
               src={paths.baseline}
               key={paths.baseline} />
        </Col>
        <Col xs={12} md={6}>
          <img className="screenshot"
               src={paths.screenshot}
               key={paths.screenshot} />
        </Col>
      </Row>
    </Grid>
  </div>;
}

function _renderSwipeView(paths, value, onChangeValue) {
  return <div className="special">
    <ImageDiff before={paths.screenshot}
               after={paths.baseline}
               type="swipe"
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

function _renderFadeView(paths, value, onChangeValue) {
  return <div className="special">
    <ImageDiff before={paths.screenshot}
               after={paths.baseline}
               type="fade"
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

function _getSelectViewButtons(viewOptions, currentView, onChangeView) {
  var buttons = [];

  viewOptions.forEach(function(item) {
    buttons.push(
      <Button name={item}
              key={item}
              onClick={onChangeView}
              className={item === currentView ? 'active' : null}>
        {item}
      </Button>
    );
  });

  return buttons;
}

module.exports = React.createClass({
  displayName: 'FailedTest',

  statics: {
    viewOptions: ['default', '2-up', 'swipe', 'fade'],
    viewHandlers: {
      'default': _renderDefaultView,
      '2-up': _render2UpView,
      'swipe': _renderSwipeView,
      'fade': _renderFadeView
    }
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

      /* buttons to select the report type */
      buttons = _getSelectViewButtons(this.constructor.viewOptions,
          view, this.onChangeView);

      /* switch betwen report types */
      report = this.constructor.viewHandlers[view](paths,
          this.state.value, this.onChangeValue);
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
