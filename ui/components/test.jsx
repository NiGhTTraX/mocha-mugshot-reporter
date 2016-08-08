import React from 'react';
import classNames from 'classnames';
import Details from './details.jsx';

var Test = React.createClass({
  statics: {
    DETAILS_TOGGLE_CLASS: 'toggled'
  },
  getInitialState: function() {
    return {toggled: false};
  },
  render: function() {
    var test = this.props.test,
        cx = classNames,
        classes = cx({
          test: true,
          toggled: this.state.toggled
        }),
        paths,
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
        paths: paths,
        error: this.props.test.error
      };
    }

    return <div className={classes}>
      <p className="test-title" onClick={this.displayDetails}>
        {test.state === 'passed'
            ? <span className="glyphicon glyphicon-ok green"
                    aria-hidden="true">
            </span>
            : <span className="glyphicon glyphicon-remove red"
                    aria-hidden="true">
            </span> }
        {' ' + test.title} : <span className="test-state">{test.state}</span> in
        <span className="orange"> {test.duration} </span> ms
      </p>
      <Details details={details} />
    </div>;
  },
  displayDetails: function() {
    this.setState({toggled: !this.state.toggled});
  }
});

module.exports = Test;
