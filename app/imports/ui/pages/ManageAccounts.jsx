import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Button, Table, Spinner, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

// React component to edit and delete users
const ManageAccounts = () => {
  const { ready, userProfiles } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const rdy = subscription.ready();
    const users = UserProfiles.find({}).fetch();
    return {
      ready: rdy,
      userProfiles: users,
    };
  }, []);

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  function handleDelete(instance) {
    const collectionName = UserProfiles.getCollectionName();
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          removeItMethod.callPromise({ collectionName, instance })
            .catch(error => swal('Error', error.message, 'error'))
            .then(() => swal('Success', 'User Removed Successfully', 'success'));
        } else {
          swal('The user is safe!');
        }
      });
  }

  /**
   * Edits this profile, given its profile ID.
   * Also edits this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  /* function handleEdit(profileID) {
    window.alert(`You clicked edit on ${profileID}`);
  } */

  return (
    <Container>
      <Table responsive id={PAGE_IDS.MANAGE_ACCOUNTS}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Position</th>
            <th>Assigned Position</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {ready ?
          (
            <tbody>
              { userProfiles.map(user => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.position}</td>
                  <td>{user.assignedOffice}</td>
                  <td><Button variant="primary" as={NavLink} to="/admin/editaccount">Edit</Button></td>
                  <td><Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button></td>
                </tr>
              ))}
            </tbody>
          ) :
          (
            <tbody>
              <tr>
                <td>
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </Button>
                </td>
                <td>
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                </td>
              </tr>
            </tbody>
          )}
      </Table>
    </Container>
  );
};

export default ManageAccounts;
