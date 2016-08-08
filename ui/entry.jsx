/* globals window, document */
/* eslint no-unused-vars: [2, {"varsIgnorePattern": "React"}] */

var React = require('react'),
    ReactDOM = require('react-dom'),
    Report = require('./components/report.jsx'),
    mochaTestDataVarName = require('../lib/mocha-test-data-var-name.js');

require('./styles/base.less');

var data = window[mochaTestDataVarName];

ReactDOM.render(<Report data={data} />, document.getElementById('content'));
