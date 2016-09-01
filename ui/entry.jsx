/* globals window, document */

import './styles/base.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Report from './components/report.jsx';
import mochaTestDataVarName from '../lib/mocha-test-data-var-name.js';

const data = window[mochaTestDataVarName];

ReactDOM.render(<Report data={data} />, document.getElementById('content'));
