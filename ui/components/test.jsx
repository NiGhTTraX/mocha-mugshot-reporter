import '../styles/components/test.less';
import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import {Component} from 'react-component-tree';
import {Panel} from 'react-bootstrap';
import Details from './details.jsx';
import DetailsWithDiff from './details-diff.jsx';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {toggled: false};
    this.onDetailsDisplay = this.onDetailsDisplay.bind(this);
  }

  get children() {
    return {
      details: (paths) => {
        return {
          component: Details,
          paths: paths
        };
      },
      detailsWithDiff: (paths, error) => {
        return {
          component: DetailsWithDiff,
          paths: paths,
          error: error
        };
      }
    };
  }

  render() {
    const test = this.props.test,
          cx = classNames,
          classes = cx({
            test: true,
            toggled: this.state.toggled
          }),
          paths = test.result;

    return <div className={classes}>
      <p className="test-title" ref="testTitle" onClick={this.onDetailsDisplay}>
        {test.state === 'passed'
            ? <span className="glyphicon glyphicon-ok green">
            </span>
            : <span className="glyphicon glyphicon-remove red">
            </span> }
        {' ' + test.title + ' : '}
        <span className="test-state" ref="testState">{test.state}</span> in
        <span className="orange" ref="testDuration"> {test.duration} </span> ms
      </p>

      <Panel collapsible expanded={this.state.toggled}>
        <div className="details">
          {_.isUndefined(paths) || !paths.isEqual
              ? this.loadChild('detailsWithDiff', paths, test.error)
              : this.loadChild('details', paths)}
        </div>
      </Panel>
    </div>;
  }

  onDetailsDisplay() {
    this.setState({toggled: !this.state.toggled});
  }
}

Test.displayName = 'Test';

export default Test;
