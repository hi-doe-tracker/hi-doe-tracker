import React from 'react';
import '/client/style.css';
import { Button, Card, Container, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const Profile = () => {
  const user = {
    name: 'Jane Doe',
    title: 'Administrative associate',
    email: 'Jane.doe@hidoe.com',
    image: '/images/profile-image.png',
  };
  const [modalShow, setModalShow] = React.useState(false);
  const toggleShow = () => setModalShow(!modalShow);
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
          <h4 className="mt-4">{user.name}</h4>
          <p className="card-text">{user.title}</p>
          <p className="card-text">{user.email}</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <button type="button" onClick={toggleShow} className="btn btn-light mt-2">Change profile</button>
        <Modal show={modalShow} setShow={setModalShow}>
          <ModalDialog>
            <ModalHeader>
              <ModalTitle> Title </ModalTitle>
              <Button className="btn-close" color="none" onClick={toggleShow}> </Button>
            </ModalHeader>
            <ModalBody> </ModalBody>
            <ModalFooter> </ModalFooter>
          </ModalDialog>
        </Modal>
      </div>

    </Container>
  );
};

export default Profile;
