import React from 'react';
import '/client/style.css';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Container, Form, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { updatePasswordMethod } from '../../api/base/BaseCollection.methods';

const Profile = () => {
  const user = {
    name: 'Jane Doe',
    title: 'Administrative associate',
    email: 'Jane.doe@hidoe.com',
    image: '/images/profile-image.png',
  };

  const [info] = React.useState({
    username: 'Jane Doe',
    useremail: 'Jane.doe@hidoe.com',
  });

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowPassword, setModalShowPassword] = React.useState(false);
  const toggleShow = () => setModalShow(!modalShow);
  const toggleShowPassword = () => setModalShowPassword(!modalShowPassword);

  const handleClose = () => {
    setModalShow(false);
  };

  const handleClosePassword = () => {
    setModalShowPassword(false);
  };

  // TODO: fix non updating values
  const handleSubmit = () => {
    handleClose();
  };
    // TODO: fix non updating values
  const handleSubmitPassword = (evt) => {
    evt.preventDefault();
    const userID = Meteor.userId();
    const newPassword = evt.target[0].value;
    const confirmPassword = evt.target[1].value;

    if (userID) {
      // const isAdmin = verifyRole(userID);
      if (newPassword === confirmPassword) {
        updatePasswordMethod.callPromise({ userID, newPassword })
          .then(() => {
            swal('Success', 'Password successfully changed', 'success');
          });
      } else {
        swal('Invalid Password', 'Password Do Not Match!!', 'error');
      }
    } else {
      swal('Invalid User', 'User does not exist!!', 'error');
    }
    handleClosePassword();
    // return shouldRedirect ? <Navigate to="/signin" /> : "";
  };

  // function verifyRole(id){
  //   return Roles.userIsInRole(id, [ROLE.ADMIN])

  // }
  return (
    <Container id={PAGE_IDS.PROFILE} className="py-3">
      <div className="card-body text-center">
        <div className="card-body text-center">
          <Card.Img
            src={user.image}
            className="rounded-circle img-thumbnail "
            style={{ width: '20rem' }}
          />
          <br />
          <button type="button" className="btn btn-light mt-2">Change profile photo</button>
          <h4 className="mt-4">{info.username}</h4>
          <p className="card-text">{user.title}</p>
          <p className="card-text">{info.useremail}</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <button type="button" onClick={toggleShow} className="btn btn-light mt-2">Change profile</button>
        <Modal show={modalShow} setShow={setModalShow} centered>
          <ModalDialog>
            <ModalHeader>
              <ModalTitle> Change profile </ModalTitle>
              <Button className="btn-close" color="none" onClick={toggleShow}> </Button>
            </ModalHeader>
            <ModalBody>
              <Form.Group>
                <Form.Label>Name: </Form.Label>
                <Form.Control id="username" name="InputName" type="name" defaultValue={info.username} />
                <br />
                <Form.Label>Position: </Form.Label>
                <Form.Control name="title" type="text" value={user.title} />
                <br />
                <Form.Label>Email: </Form.Label>
                <Form.Control id="useremail" name="InputEmail" type="email" defaultValue={info.useremail} />
              </Form.Group>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
            </ModalFooter>
          </ModalDialog>
        </Modal>
      </div>
      <div className="text-center mt-4">
        <button type="button" onClick={toggleShowPassword} className="btn btn-light mt-2">Change Password</button>
        <Modal show={modalShowPassword} centered>
          <ModalDialog>
            <ModalHeader>
              <ModalTitle> Change Password </ModalTitle>
              <Button className="btn-close" color="none" onClick={toggleShowPassword}> </Button>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={(data) => handleSubmitPassword(data)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" name="newpassword" placeholder="New Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="submitpassword" placeholder="Confirm Password" />
                </Form.Group>
                <Button type="submit">
                  Save Changes
                </Button>
              </Form>
            </ModalBody>
            {/* <ModalFooter>
              <Button type="submit" value="submit">
                Save Changes
              </Button>
            </ModalFooter> */}
          </ModalDialog>
        </Modal>
      </div>

    </Container>
  );
};

export default Profile;
