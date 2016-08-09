/* globals window, document */
/* eslint no-unused-vars: [2, {"varsIgnorePattern": "React"}] */

import React from 'react';
import ReactDOM from 'react-dom';
import Report from './components/report.jsx';
import mochaTestDataVarName from '../lib/mocha-test-data-var-name.js';

require('./styles/base.css');

const data = window[mochaTestDataVarName];

ReactDOM.render(<Report data={data} />, document.getElementById('content'));
