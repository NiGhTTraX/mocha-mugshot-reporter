import '../styles/components/header.less';
import React from 'react';
import classNames from 'classnames';
import {Badge, Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  render() {
    const {passes, failures} = this.props,
          filters = [{
            name: 'All',
            count: passes + failures,
            badgeClass: 'blue-bg'
          }, {
            name: 'Passes',
            count: passes,
            badgeClass: 'green-bg'
          }, {
            name: 'Failures',
            count: failures,
            badgeClass: 'red-bg'
          }, {
            name: 'Duration',
            count: this.props.duration,
            badgeClass: 'orange-bg',
            disabled: true,
            textAfter: ' ms'
          }];

    return <Navbar inverse>
      {this._renderHeader()}
      {this._renderNavItems(filters)}
    </Navbar>;
  }

  onFilterChange(newFilter) {
    this.props.updateFilter(newFilter);
  }

  _renderHeader() {
    return <Navbar.Header>
      <Navbar.Brand>
        <a href="https://github.com/uberVU/mocha-mugshot-reporter">
          Mocha-Mugshot-Reporter
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>;
  }

  _renderNavItems(filters) {

    let items = filters.map(function(item, index) {
      const filter = item.name.toLowerCase();

      return <NavItem eventKey={index}
                 key={index}
                 className={classNames({active: this.props.filter === filter})}
                 disabled={item.disabled}
                 ref={filter}
                 onClick={this.onFilterChange.bind(this, filter)}>
        {item.name}
        <Badge className={classNames(filter, item.badgeClass)}
               ref={`${filter}Badge`}>
          {item.count + (item.textAfter || '')}
        </Badge>
      </NavItem>;
    }.bind(this));

    return <Navbar.Collapse>
      <Nav pullRight>
        {items}
      </Nav>
    </Navbar.Collapse>;
  }
}

Header.displayName = 'Header';

export default Header;
