import React from 'react';
import { PAGE_IDS } from '../utilities/PageIDs';
import '/client/style.css';
import { Card, Col, Container, Row } from 'react-bootstrap';


const Profile = () => {
  const user = {
    name: 'Jane Doe',
    title: 'Administrative associate',
    priv: 'Admin',
    email: 'Jane.doe@hidoe.com',
    image: '/images/profile-image.png',
  };
  return (
    <Container id={PAGE_IDS.PROFILE} className="py-3">
        
        {/* <Row>
            <Col xs={4}>
                <Image src="/images/meteor-logo.png"></Image>
            </Col>
        </Row> */}

        
      <Card >
        
        <Card.Body className="text-center">
        <Card.Img
            src={user.image}
            className="rounded-circle img-thumbnail "
            style={{ width: '20rem' }}
          />
          <Card.Title className="profile-card">{user.name}</Card.Title>
          <Card.Text>{user.priv}</Card.Text>
          <Card.Text>{user.title}</Card.Text>
          <Card.Text>{user.email}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;