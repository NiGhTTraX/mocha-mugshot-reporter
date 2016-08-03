var React = require('react');

import {Badge, Navbar, Nav, NavItem} from 'react-bootstrap';


var Header = React.createClass({
  render: function() {
    var passes = this.props.passes,
        failures = this.props.failures;
    return <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Mocha-Mugshot-Reporter</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={0} href="#">
            All
            <Badge className='blue-bg'> {passes + failures} </Badge>
          </NavItem>
          <NavItem eventKey={1} href="#">
            Passes
            <Badge className='green-bg'> {passes} </Badge>
          </NavItem>
          <NavItem eventKey={2} href="#">
            Failures
            <Badge className='red-bg'> {failures} </Badge>
          </NavItem>
          <NavItem eventKey={3}>
            Duration
            <Badge className='orange-bg'> {this.props.duration} ms</Badge>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>;
  }
});

module.exports = Header;
