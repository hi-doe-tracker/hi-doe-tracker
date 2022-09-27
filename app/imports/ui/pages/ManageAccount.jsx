import React from 'react'
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Button, Table } from 'react-bootstrap'
import { useTracker } from 'meteor/react-meteor-data';
import { removeItMethod } from '../../api/base/BaseCollection.methods';

//React component to edit and delete users
const ManageAccount = () => {
  const { ready, userProfiles } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const rdy = subscription.ready();
    const users = UserProfiles.find({}).fetch();
    return {
      ready: rdy,
      userProfiles: users,
    };
  }, [track]);

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  function handleDelete(profileID){
    const collectionName = UserProfiles.getCollectionName();
    removeItMethod.callPromise({ collectionName, profileID })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => { 
        return swal('Success', 'User Removed Successfully', 'success')
      });
  }

  /**
   * Edits this profile, given its profile ID.
   * Also edits this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  function handleEdit(profileID){
    window.alert("You clicked edit")
  }
  
  //  ready ? console.log(userProfiles) : console.log('not ready')
  return (
    <Table responsive>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    {ready ? 
    <tbody>
     { userProfiles.map(user =>
     <tr key={user._id}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        {/* {console.log(user._id)} */}
        <td><Button variant="primary" onClick ={() => handleEdit(user._id)}>Edit</Button></td>
        <td><Button variant="danger" onClick = {() => handleDelete(user._id)}>Delete</Button></td>
      </tr> 
      )}
    </tbody> : <tbody></tbody> }
  </Table>
);
}

export default ManageAccount;