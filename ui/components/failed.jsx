import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import {ButtonGroup, Button, Jumbotron, Panel} from 'react-bootstrap';

import DefaultView from './views/defaultView.jsx';
import TwoUpView from './views/twoUpView.jsx';
import SwipeView from './views/swipeView.jsx';
import FadeView from './views/fadeView.jsx';

class FailedTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'default',
      openError: false
    };

    this.onViewChange = this.onViewChange.bind(this);
    this.onErrorMessageOpen = this.onErrorMessageOpen.bind(this);
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
    const Component =
      _.find(FailedTest.VIEW_COMPONENTS, {name: this.state.view}).component;

    return <div>
      <Jumbotron> <Component paths={paths} /> </Jumbotron>
      <ButtonGroup className="view-selector">
        {this._getSelectViewButtons()}
      </ButtonGroup>
    </div>;
  }

  _getSelectViewButtons() {
    const onViewChange = this.onViewChange,
          currentView = this.state.view;
    let buttons = [];

    FailedTest.VIEW_COMPONENTS.forEach(function(item) {
      const name = item.name;
      buttons.push(
        <Button name={name}
                key={name}
                onClick={onViewChange}
                className={classNames({active: name === currentView})}>
          {name}
        </Button>
      );
    });

    return buttons;
  }
}

FailedTest.displayName = 'FailedTest';

FailedTest.VIEW_COMPONENTS = [
  {name: 'default', component: DefaultView},
  {name: '2-up', component: TwoUpView},
  {name: 'swipe', component: SwipeView},
  {name: 'fade', component: FadeView}
];

export default FailedTest;
