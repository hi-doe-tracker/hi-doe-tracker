import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, Bell, Person, Alarm, FileText } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Notifications } from '../../api/notification/NotificationCollection';

// The NavBar appears at the top of every page. Rendered by the App Layout component.
const NavBar = () => {
  const [position, setPosition] = useState('');
  const allowedPosition = ['Admin', 'Writer'];
  const { currentUser, notifications, ready } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const subscription2 = Notifications.subscribeNotification();
    const rdy = subscription.ready() && subscription2.ready();
    const currUser = Meteor.user() ? Meteor.user().username : '';
    // const userProfile = UserProfiles.findByEmail(currUser);
    let allNotifications = [];
    // Waits for user profile to load.
    if (subscription.ready() && currUser !== '') {
      if (currUser !== 'admin@foo.com') {
        const userProfile = UserProfiles.findByEmail(currUser);
        // Gets all notifications that are for all or for the user's position.
        allNotifications = Notifications.find({ $or: [{ recipient: 'All' }, { recipient: userProfile.position }, { recipient: `${userProfile.position} - ${userProfile.assignedOffice}` }, { recipient: currUser }] }).fetch();
      } else {
        allNotifications = Notifications.find({ recipient: 'All' }).fetch();
      }
    }
    return {
      currentUser: currUser,
      notifications: allNotifications,
      ready: rdy,
    };
  });

  useEffect(() => {
    if (currentUser !== '' && currentUser !== undefined) {
      if (ready) {
        const email = currentUser;
        const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
        console.log(email);
        if (!isAdmin) {
          const pos = UserProfiles.findByEmail(email).position;
          // console.log(pos)
          setPosition(pos);
        } else {
          setPosition('Admin');
        }
      }
    }
  });
  const menuStyle = { marginBottom: '10px' };
  const menuStyle1 = { marginLeft: '20px' };
  const menuStyle2 = { marginRight: '10px', marginLeft: '10px' };
  const iconStyle = { marginRight: '5px', fontSize: '1.2em' };
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
              <NavDropdown id={COMPONENT_IDS.NAVBAR_TESTIMONY_DROPDOWN} title="Testimony" key="testimony-dropdown" style={menuStyle2}>
                {/* <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SUBMIT_TESTIMONY_PAGE} as={NavLink} to="/submit" key="submit">Submit Testimony</NavDropdown.Item>
                 */}
                { allowedPosition.includes(position) ? <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SUBMIT_TESTIMONY_PAGE} as={NavLink} to="/submit" key="submit">Submit Testimony</NavDropdown.Item> : ''}
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LIST_TESTIMONY_PAGE} as={NavLink} to="/listtestimony" key="list-testimony">List Testimony</NavDropdown.Item>
              </NavDropdown>,
              <NavDropdown id={COMPONENT_IDS.NAVBAR_HEARING_DROPDOWN} title="Hearings" key="hearing-dropdown" style={menuStyle2}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_HEARING_DROPDOWN_VIEW} key="view-hearings" as={NavLink} to="view-hearings">View Hearings</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_HEARING_DROPDOWN_SEND} key="send-hearings" as={NavLink} to="send">Send Hearing Notice</NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
            {/* Admin only navbar options */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? ([
              <NavDropdown id={COMPONENT_IDS.NAVBAR_ADMIN_DROPDOWN} style={menuStyle2} title="Admin" key="admin-dropdown">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_ADMIN_CREATE} key="admin-create" as={NavLink} to="/admin/createaccount">Create Account</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_ADMIN_ASSIGN} key="admin-assign-bills" as={NavLink} to="/admin/assignbills/all">Assign a Bill</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_ADMIN_MANAGE} key="admin-manage-accounts" as={NavLink} to="/admin/manageaccounts">Manage Accounts</NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
            <Nav.Link id={COMPONENT_IDS.NAVBAR_CALENDAR_PAGE} as={NavLink} to="/calendar">Calendar</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.USER]) ? (
              [
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} key="adminuser-dropdown" title={<Bell size="20" />}>
                  {notifications.map((notification) => (
                    <NavDropdown.Item key={notification._id} as={NavLink} to={notification.link}>
                      {notification.messageType === 'Bill Assignment' || notification.messageType === 'Testimony Creation' ? <FileText /> : <Alarm />}
                      &nbsp; {notification.message}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>,
              ]
            ) : ''}
            {/* Non-user only navbar options */}
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} key="nonuser-dropdown" title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} key="user-dropdown" title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_PROFILE} as={NavLink} to="/profile">
                  <Person style={iconStyle} />
                  Profile
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
