/* globals window, document */

var React = require('react'),
    ReactDOM = require('react-dom'),
    Report = require('./components/report.jsx'),
    mochaTestDataVarName = require('../lib/mocha-test-data-var-name.js');

require('./styles/base.css');

var data = window[mochaTestDataVarName];

ReactDOM.render(<Report data={data} />, document.getElementById('content'));
