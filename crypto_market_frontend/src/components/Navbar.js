import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import LogoutForm from './LogoutForm'
import AuthForm from "./AuthForm";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {username, handleAuth, handleLogout} = this.props;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">CryptoMarketCharts</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar className="mr-5">
                <DropdownToggle >
                  Create Account
                </DropdownToggle>
                <DropdownMenu right className="ml-5">
                    <AuthForm handleAuth={handleAuth} action={'Register'} />
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                {
                  username ?
                    <LogoutForm handleLogout={handleLogout} username={username}/> :
                    <AuthForm handleAuth={handleAuth} action={'Login'} />
                }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}