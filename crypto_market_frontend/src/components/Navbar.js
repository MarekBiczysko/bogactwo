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
import {connect} from "react-redux";

class NavBar extends React.Component {
  state = {isOpen: false};

  toggle = () => this.setState({isOpen: !this.state.isOpen});

  render() {
    const {authed, username} = this.props;

    return (

      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          CryptoMarketCharts
        </NavbarBrand>
        <NavbarToggler
          onClick={this.toggle}
        />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {
              !authed &&
              <UncontrolledDropdown nav inNavbar className="mr-5 my-1">
                <DropdownToggle>
                  Create Account
                </DropdownToggle>
                <DropdownMenu right className="ml-5 px-1">
                  <AuthForm action={'Register'}/>
                </DropdownMenu>
              </UncontrolledDropdown>
            }
            <NavItem>
              {
                authed
                  ? <LogoutForm username={username} />
                  : <AuthForm action={'Login'} />
              }
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

    );
  }
}

const mapStateToProps = state => ({
  authed: state.authenticated || false,
  username: state.username,
});

export default connect(mapStateToProps)(NavBar);
