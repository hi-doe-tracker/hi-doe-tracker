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
import ListTestimony from '../pages/ListTestimony';
import EditTestimony from '../pages/EditTestimony';
import Landing from '../pages/Landing';
import Calendar from '../pages/Calendar';
import AssignBill from '../pages/AssignBill';
import ManageAccounts from '../pages/ManageAccounts';
import ViewHearings from '../pages/ViewHearings';
import AdminCreate from '../pages/AdminCreate';
import EditAccount from '../pages/EditAccount';
import ViewTestimony from '../pages/ViewTestimony';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { Testimonies } from '../../api/testimony/TestimonyCollection';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */

const App = () => {
  const [style, setStyle] = useState({ opacity: '1' });
  const { currentUser } = useTracker(
    () => ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
    }),
    [],
  );
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        {currentUser ? <SearchBarButton setStyle={setStyle} /> : ''}
        <div style={style}>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route
              exact
              path="/calendar"
              element={(
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              )}
            />
            <Route
              exact
              path="/bills"
              element={(
                <ProtectedRoute>
                  <ViewBills />
                </ProtectedRoute>
              )}
            />
            <Route
              exact
              path="/send"
              element={(
                <ProtectedRoute>
                  <SendHearingNotice />
                </ProtectedRoute>
              )}
            />
            <Route
              exact
              path="/view-hearings/:noticeParam"
              element={(
                <ProtectedRoute>
                  <ViewHearings />
                </ProtectedRoute>
              )}
            />
            <Route
              exact
              path="/view-hearings"
              element={(
                <ProtectedRoute>
                  <ViewHearings />
                </ProtectedRoute>
              )}
            />
            <Route
              exact
              path="/edit-account"
              element={(
                <ProtectedRoute>
                  <EditAccount />
                </ProtectedRoute>
              )}
            />
            <Route
              exact
              path="/viewbill/:_id"
              element={(
                <ProtectedRoute>
                  <ViewBill />
                </ProtectedRoute>
              )}
            />
            <Route
              exact
              path="/listtestimony"
              element={(
                <ProtectedRoute>
                  <ListTestimony />
                </ProtectedRoute>
              )}
            />
            <Route
              exact
              path="/edittestimony/:_id"
              element={(
                <ProtectedRouteEditTestimony>
                  <EditTestimony />
                </ProtectedRouteEditTestimony>
              )}
            />
            <Route
              exact
              path="/submit"
              element={(
                <ProtectedRouteWriter>
                  <SubmitTestimony />
                </ProtectedRouteWriter>
              )}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signout" element={<SignOut />} />
            <Route
              path="/home"
              element={(
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/assignbills/:_id"
              element={(
                <AdminProtectedRoute>
                  <AssignBill />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="/admin/manageaccounts"
              element={(
                <AdminProtectedRoute>
                  <ManageAccounts />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="/admin/createaccount"
              element={(
                <AdminProtectedRoute>
                  <AdminCreate />
                </AdminProtectedRoute>
              )}
            />
            <Route path="/notauthorized" element={<NotAuthorized />} />
            <Route
              path="/profile"
              element={(
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/viewtestimony"
              element={(
                <ProtectedRoute>
                  <ViewTestimony />
                </ProtectedRoute>
              )}
            />
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

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRouteWriter = ({ children }) => {
  // const [position, setPosition] = useState('');
  const allowedPosition = ['Admin', 'Writer'];
  const { currentUser, ready } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const rdy = subscription.ready();
    const currUser = Meteor.user() ? Meteor.user().username : '';
    return {
      currentUser: currUser,
      ready: rdy,
    };
  }, []);

  const isLogged = Meteor.userId() !== null;
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('ProtectedRoute', isLogged);
  if (!isLogged) {
    return <Navigate to="/notauthorized" />;
  }
  if (ready) {
    let allowed = false;
    if (!isAdmin) {
      const position = UserProfiles.findByEmail(currentUser).position;
      allowed = allowedPosition.includes(position);
    } else {
      allowed = true;
    }
    return allowed ? children : <Navigate to="/notauthorized" />;
  }
  return <LoadingSpinner />;

  // return ready && allowedPosition.includes(position) ? children : console.log(`${allowedPosition.includes(position)}, ${ready}}`) ;
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRouteEditTestimony = ({ children }) => {
  // const [position, setPosition] = useState('');
  const allowedPosition = [
    'Admin',
    'Writer',
    'PIPE Approver',
    'Final Approver',
  ];
  const { currentUser, ready, readyTestimony } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const testimonySubscription = Testimonies.subscribeTestimony();
    const rdy1 = testimonySubscription.ready();
    const rdy = subscription.ready();
    const currUser = Meteor.user() ? Meteor.user().username : '';
    return {
      currentUser: currUser,
      ready: rdy,
      readyTestimony: rdy1,
    };
  }, []);

  const isLogged = Meteor.userId() !== null;
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('ProtectedRoute EditTestmony', isLogged);
  if (!isLogged) {
    return <Navigate to="/notauthorized" />;
  }
  if (ready && readyTestimony) {
    let allowed = false;
    if (!isAdmin) {
      const position = UserProfiles.findByEmail(currentUser).position;
      allowed = allowedPosition.includes(position);
    } else {
      allowed = true;
    }
    return allowed ? children : <Navigate to="/notauthorized" />;
  }
  return <LoadingSpinner />;

  // return ready && allowedPosition.includes(position) ? children : console.log(`${allowedPosition.includes(position)}, ${ready}}`) ;
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

ProtectedRouteWriter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRouteEditTestimony.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRouteEditTestimony.defaultProps = {
  children: <Home />,
};

ProtectedRouteWriter.defaultProps = {
  children: <Home />,
};

export default App;
