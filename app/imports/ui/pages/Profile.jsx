import React from 'react';
import '/client/style.css';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Card, Container, Form, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';

const Profile = () => {
  const user = {
    name: 'Jane Doe',
    title: 'Administrative associate',
    email: 'Jane.doe@hidoe.com',
    image: '/images/profile-image.png',
  };

  const { ready, userProfile } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const rdy = subscription.ready();
    const users = UserProfiles.find({}).fetch();
    const user2 = users[0];
    return {
      ready: rdy,
      userProfile: user2,
    };
  }, []);

  const [info] = React.useState({
    username: 'Jane Doe',
    useremail: 'Jane.doe@hidoe.com',
  });

  const [modalShow, setModalShow] = React.useState(false);
  const toggleShow = () => setModalShow(!modalShow);

  const assignedOffice = ready ? userProfile.assignedOffice : 'NULL';

  const handleClose = () => {
    setModalShow(false);
  };

  // TODO: fix non updating values
  const handleSubmit = () => {
    // setInfo((state) => ({
    //   username: state.username,
    //   textInput: state.useremail,
    // }));
    handleClose();
  };

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
          <p><b className="text-muted">Office: </b>{assignedOffice && assignedOffice.length > 0 ? assignedOffice.toString() : 'Not Applicable'}</p>
          <p className="card-text">{info.useremail}</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <button type="button" onClick={toggleShow} className="btn btn-light mt-2">Change profile</button>
        <Modal show={modalShow} centered>
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

    </Container>
  );
};

export default Profile;
