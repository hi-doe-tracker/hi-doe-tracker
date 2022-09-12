import React from 'react';
import { PAGE_IDS } from '../utilities/PageIDs';
import '/client/style.css';
import { Card, Container } from 'react-bootstrap';


const Profile = () => {
  const user = {
    name: 'Jane Doe',
    title: 'Administrative associate',
    priv: 'Admin',
    email: 'Jane.doe@hidoe.com'
  };
  return (
    <Container id={PAGE_IDS.PROFILE} className="py-3">
      <Card>
        <Card.Body className="text-left">
          <Card.Title className="user-profile-main-card">{user.name}</Card.Title>
          <Card.Text>{user.priv}</Card.Text>
          <Card.Text>{user.title}</Card.Text>
          <Card.Text>{user.email}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;