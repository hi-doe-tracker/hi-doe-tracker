import React from 'react';
import '/client/style.css';
import { AutoForm, Button, Card, Container, Form, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Row, Col, TextField, InputGroup, useState} from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const Profile = () => {
  const user = {
    name: 'Jane Doe',
    title: 'Administrative associate',
    email: 'Jane.doe@hidoe.com',
    image: '/images/profile-image.png',
  };
  // const [username, setusername] = React.useState('Jane Doe');
  // const [useremail, setuseremail] = React.useState('Jane.doe@hidoe.com');

  const [info, setInfo] = React.useState({
    username: 'Jane Doe',
    useremail: 'Jane.doe@hidoe.com',
  });

  const [modalShow, setModalShow] = React.useState(false);
  const toggleShow = () => setModalShow(!modalShow);

  const handleClose = () => {
    setModalShow(false);
  };

  // const updateUser  = (data) => {
  //   console.log('HERJA');
  //   setusername(getInp);
  //   setuseremail(event.target.email);
  //   console.log(event.target.name);
  //   handleClose();
  // };

  const handleChange = (e) => {
    setInfo({ [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    setInfo((state) => ({
      username: state.username1,
      textInput: state.useremail1,
    }));
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
                <Form.Control id="username1" name="InputName" type="name" defaultValue={info.username} onChange={handleChange} />
                <br></br>
                <Form.Label>Position: </Form.Label>
                <Form.Control name="title" type="text" value={user.title} />
                <br></br>
                <Form.Label>Email: </Form.Label>
                <Form.Control id="useremail1" name="InputEmail" type="email" defaultValue={info.useremail} onChange={handleChange} />
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
