var React = require('react'),
    Report = require('./components/report.jsx');

require('./styles/base.css');

React.render(<Report data={data}/>, document.getElementById('report'));
