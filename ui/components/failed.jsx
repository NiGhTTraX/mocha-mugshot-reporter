import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import {ButtonGroup, Button, Jumbotron, Panel} from 'react-bootstrap';
import {Component} from 'react-component-tree';

import DefaultView from './views/defaultView.jsx';
import TwoUpView from './views/twoUpView.jsx';
import SwipeView from './views/swipeView.jsx';
import FadeView from './views/fadeView.jsx';

class FailedTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'default',
      openError: false
    };

    this.onViewChange = this.onViewChange.bind(this);
    this.onErrorMessageOpen = this.onErrorMessageOpen.bind(this);
  }

  get children() {
    return {
      default: (paths) => {
        return {
          component: DefaultView,
          paths: paths
        };
      },
      twoUp: (paths) => {
        return {
          component: TwoUpView,
          paths: paths
        };
      },
      swipe: (paths) => {
        return {
          component: SwipeView,
          paths: paths
        };
      },
      fade: (paths) => {
        return {
          component: FadeView,
          paths: paths
        };
      }
    };
  }

  render() {
    const {paths, error} = this.props;

    return <div className="diffs">
      <Button bsStyle="danger"
              bsSize="xsmall"
              onClick={this.onErrorMessageOpen}>
        Show Error
      </Button>

      <Panel collapsible expanded={this.state.openError} bsStyle="danger">
        {error.name} : {error.message}
      </Panel>

      {!_.isUndefined(paths) ? this._renderSelectedView(paths) : null }
    </div>;
  }

  onViewChange(element) {
    var selectedView = element.target.name;

    this.setState({
      view: selectedView
    });
  }

  onErrorMessageOpen() {
    this.setState({
      openError: !this.state.openError
    });
  }

  _renderSelectedView(paths) {

    return <div>
      <Jumbotron> {this.loadChild(this.state.view, paths)} </Jumbotron>
      <ButtonGroup className="view-selector">
        {this._getSelectViewButtons()}
      </ButtonGroup>
    </div>;
  }

  _getSelectViewButtons() {
    const onViewChange = this.onViewChange,
          currentView = this.state.view;
    let buttons = [];

    FailedTest.VIEWS.forEach(function(item) {
      buttons.push(
        <Button name={item}
                key={item}
                onClick={onViewChange}
                className={classNames({active: item === currentView})}>
          {item}
        </Button>
      );
    });

    return buttons;
  }
}

FailedTest.displayName = 'FailedTest';

FailedTest.VIEWS = ['default', 'twoUp', 'swipe', 'fade'];

export default FailedTest;
