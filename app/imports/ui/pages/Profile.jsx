import React from 'react';
import '/client/style.css';
import { Button, Card, Container, Form, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

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
  const toggleShow = () => setModalShow(!modalShow);

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

    </Container>
  );
};

export default Profile;
