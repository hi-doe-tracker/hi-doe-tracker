import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import ViewBill from '../pages/ViewBill';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import ViewBills from '../pages/ViewBills';
import SearchBarButton from '../components/SearchBarButton';
import SendHearingNotice from '../pages/SendHearingNotice';
import Profile from '../pages/Profile';
import SubmitTestimony from '../pages/SubmitTestimony';
// import Landing from '../pages/Landing';
import { viewBill } from '../../test-utilities/viewbilltestdata';
import MiniCalendar from '../components/MiniCalendar';
import AssignBill from '../pages/AssignBill';
import AdminManagement from '../pages/AdminManagement';
import ViewHearings from '../pages/ViewHearings';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */

const App = () => {
  const [style, setStyle] = useState({ opacity: '1' });
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        {currentUser ? <SearchBarButton setStyle={setStyle} /> : ''}
        <div style={style}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/calendar" element={<ProtectedRoute><MiniCalendar /></ProtectedRoute>} />
            <Route exact path="/bills" element={<ProtectedRoute><ViewBills /></ProtectedRoute>} />
            <Route exact path="/send" element={<ProtectedRoute><SendHearingNotice /></ProtectedRoute>} />
            <Route exact path="/view-hearings" element={<ProtectedRoute><ViewHearings /></ProtectedRoute>} />
            <Route
              exact
              path="/viewbill"
              element={(<ProtectedRoute><ViewBill viewBill={viewBill} /></ProtectedRoute>)}
            />
            <Route
              exact
              path="/submit"
              element={
                (
                  <ProtectedRoute>
                    <SubmitTestimony />
                  </ProtectedRoute>
                )
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignOut />} />
            <Route
              path="/home"
              element={
                (
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                )
              }
            />
            <Route
              path="/admin"
              element={
                (
                  <AdminProtectedRoute>
                    <AdminManagement />
                  </AdminProtectedRoute>
                )
              }
            />
            <Route
              path="/admin/assignbills"
              element={
                (
                  <AdminProtectedRoute>
                    <AssignBill />
                  </AdminProtectedRoute>
                )
              }
            />
            <Route path="/notauthorized" element={<NotAuthorized />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('AdminProtectedRoute', isLogged, isAdmin);
  return isLogged && isAdmin ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Home />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  children: <Home />,
};

export default App;
