import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill, Bell, Person, Alarm, FileText } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { marginBottom: '10px' };
  const menuStyle1 = { marginLeft: '20px' };
  const menuStyle2 = { marginRight: '10px', marginLeft: '10px' };
  return (
    <Navbar bg="light" expand="lg" style={menuStyle}>
      <Container>
        <Image roundedCircle src="/images/logo.png" width="75px" />
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/" style={menuStyle1}><h2>HI DOE Tracker</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_HOME_PAGE} as={NavLink} to="/home" key="home" style={menuStyle2}>Home</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_VIEW_BILLS_PAGE} as={NavLink} to="/bills" key="bills" style={menuStyle2}>View Bills</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_SUBMIT_TESTIMONY_PAGE} as={NavLink} to="/submit" key="submit" style={menuStyle2}>Submit Testimony</Nav.Link>,
              <NavDropdown id={COMPONENT_IDS.NAVBAR_HEARING_DROPDOWN} title="Hearings" key="hearing-dropdown" style={menuStyle2}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_HEARING_DROPDOWN_VIEW} key="view-hearings" as={NavLink} to="view-hearings">View Hearings</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_HEARING_DROPDOWN_SEND} key="send-hearings" as={NavLink} to="send">Send Hearing Notice</NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? ([
              <NavDropdown id={COMPONENT_IDS.NAVBAR_ADMIN_DROPDOWN} style={menuStyle2} title="Admin" key="admin-dropdown">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_ADMIN_CREATE} key="admin-create" as={NavLink} to="/admin/createaccount">Create Account</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_ADMIN_ASSIGN} key="admin-assign-bills" as={NavLink} to="/admin/assignbills">Assign a Bill</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_ADMIN_MANAGE} key="admin-manage-accounts" as={NavLink} to="/admin/manageaccounts">Manage Accounts</NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.USER]) ? (
              [
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title={<Bell size="20" />}>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_NOTIFICATION_BELL} as={NavLink} to="/viewbill"><FileText /> Bill 1</NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_NOTIFICATION_BELL}> <Alarm /> Hearing @ 10 AM, 9/19 </NavDropdown.Item>
                </NavDropdown>,
              ]
            ) : ''}
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"><PersonPlusFill />Sign up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_PROFILE} as={NavLink} to="/profile">
                  Profile
                  <Person />
                </NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
