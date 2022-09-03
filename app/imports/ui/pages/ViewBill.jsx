import React from "react";
import {
  Row,
  Container,
  Col,
  Breadcrumb,
  ListGroup,
  Card,
} from "react-bootstrap";
// import { Container } from "react-bootstrap"
export default ViewBill = () => {
  return (
    <Container className="viewbill-container">
      <Row>
        <Col>
          <h2>Bill | Resolution Tracking</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Current Bill</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Measure(Status)</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <Card style={{ width: "18rem" }} className="text-center"> */}
          <ListGroup variant="flush">
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto listview-div">
                <span className="fw-bold">Bill/Resolution No</span>
                <span>Cras justo odio</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
          {/* </Card> */}
        </Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
};
