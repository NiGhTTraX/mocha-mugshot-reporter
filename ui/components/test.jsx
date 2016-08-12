import React from 'react';
import classNames from 'classnames';
import Details from './details.jsx';

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {toggled: false};

    this.onDetailsDisplay = this.onDetailsDisplay.bind(this);
  }

  render() {
    const test = this.props.test,
          cx = classNames,
          classes = cx({
            test: true,
            toggled: this.state.toggled
          });
    let paths,
        details = {};

    if (test.result) {
      paths = {
        baseline: test.result.baseline
      };

      if (test.result.screenshot && test.result.diff) {
        paths.diff = test.result.diff;
        paths.screenshot = test.result.screenshot;
      }

      details = {
        paths: paths
      };
    }

    details.error = this.props.test.error;

    return <div className={classes}>
      <p className="test-title" onClick={this.onDetailsDisplay}>
        {test.state === 'passed'
            ? <span className="glyphicon glyphicon-ok green">
            </span>
            : <span className="glyphicon glyphicon-remove red">
            </span> }
        {' ' + test.title} : <span className="test-state">{test.state}</span> in
        <span className="orange"> {test.duration} </span> ms
      </p>
      <Details details={details} />
    </div>;
  }

  onDetailsDisplay() {
    this.setState({toggled: !this.state.toggled});
  }
}

Test.displayName = 'Test';

export default Test;
