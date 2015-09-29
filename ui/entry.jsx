/* globals window, document */

var React = require('react'),
    Report = require('./components/report.jsx'),
    mochaTestDataVarName = require('../lib/mocha-test-data-var-name.js');

require('./styles/base.css');

var data = window[mochaTestDataVarName];

React.render(<Report data={data}/>,
  document.getElementsByClassName('container'));
