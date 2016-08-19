import React from 'react';
import classNames from 'classnames';
import Details from './details.jsx';
import {Component} from 'react-component-tree';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {toggled: false};

    this.onDetailsDisplay = this.onDetailsDisplay.bind(this);
  }

  get children() {
    return {
      details: (details) => {
        return {
          component: Details,
          details: details
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
          details = {
            paths: test.result,
            error: test.error
          };

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
      {this.loadChild('details', details)}
    </div>;
  }

  onDetailsDisplay() {
    this.setState({toggled: !this.state.toggled});
  }
}

Test.displayName = 'Test';

export default Test;
