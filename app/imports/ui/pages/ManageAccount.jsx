import React from 'react'
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Button, Table } from 'react-bootstrap'
import { useTracker } from 'meteor/react-meteor-data';


const ManageAccount = () => {
  const { ready, userProfiles } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const rdy = subscription.ready();
    const users = UserProfiles.find({}).fetch();
    return {
      ready: rdy,
      userProfiles: users,
    };
  }, []);

  
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
     <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td><Button variant="primary">Edit</Button></td>
        <td><Button variant="danger" onClick = {() => handleDelete(user.userID)}>Delete</Button></td>
      </tr> 
      )}
    </tbody> : <tbody></tbody> }
  </Table>
);
}

export default ManageAccount;