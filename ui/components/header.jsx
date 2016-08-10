import React from 'react';
import {Badge, Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  render() {
    const {passes, failures} = this.props,
          onFilterChange = this.onFilterChange;

    return <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="https://github.com/uberVU/mocha-mugshot-reporter">
            Mocha-Mugshot-Reporter
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={0} onClick={onFilterChange.bind(this, 'all')}
            className={this.props.filter === 'all' ? 'active' : null}>
            All
            <Badge className="all blue-bg"> {passes + failures} </Badge>
          </NavItem>
          <NavItem eventKey={1} onClick={onFilterChange.bind(this, 'passes')}
            className={this.props.filter === 'passes' ? 'active' : null}>
            Passes
            <Badge className="passes green-bg"> {passes} </Badge>
          </NavItem>
          <NavItem eventKey={2} onClick={onFilterChange.bind(this, 'failures')}
            className={this.props.filter === 'failures' ? 'active' : null}>
            Failures
            <Badge className="failures red-bg"> {failures} </Badge>
          </NavItem>
          <NavItem eventKey={3} disabled>
            Duration
            <Badge className="duration orange-bg">
              {this.props.duration} ms
            </Badge>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>;
  }

  onFilterChange(newFilter) {
    this.props.updateFilter(newFilter);
  }
}

Header.displayName = 'Header';

export default Header;
