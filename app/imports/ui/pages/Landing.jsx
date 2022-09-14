import React from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div className="landing-space">
    <Container id={PAGE_IDS.LANDING} className="py-3">
      <Row className="align-middle text-center">
        <Col xs={5}>
          <Image roundedCircle src="/images/state-logo.png" width="300px" />
        </Col>

        <Col xs={6} className="d-flex flex-column justify-content-center">
          <h1>Hawaii State Legislature</h1>
          <p>Key portal to get informed and involved in the Hawaii legislative process.
            Provides a quick and easy access to the information
            needed to participate in the lawmaking process.
          </p>
          <Button type="button" size="sm" className="btn btn-light">Learn More</Button>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Landing;
