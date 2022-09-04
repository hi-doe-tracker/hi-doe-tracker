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
        <center>
          <Col>
            <h2>Bill | Resolution Tracking</h2>
            <Breadcrumb className="viewbill-breadcrumb">
              <Breadcrumb.Item href="#">Current Bill</Breadcrumb.Item>
              <Breadcrumb.Item href="#">Measure(Status)</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </center>
      </Row>
      <Row className="viewbill-row">
        <Col xs={5}>
          {/* <Card style={{ width: "18rem" }} className="text-center"> */}
          <ListGroup>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font ">
                <span className="fw-bold">Bill/Resolution No</span>
                <span className="description-font">AA1, BA1, CA2, DVB3</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Office</span>
                <span className="description-font">
                  OSIP, OPS, OCID, ABCD, EFGH, HIJK
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Action</span>
                <span className="description-font">Testimony</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Status</span>
                <span className="description-font">2nd Crossover</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Companion</span>
                <span className="description-font">What goes here?</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Legislation Type</span>
                <span className="description-font">Bill</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Committee Referral</span>
                <span className="description-font">ABC, DEF, GHI</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Introduced By</span>
                <span className="description-font">ABC, DEF, GHI</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Hearing Date</span>
                <span className="description-font">ABC, DEF, GHI</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Hearing Time</span>
                <span className="description-font">ABC, DEF, GHI</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Hearing Location</span>
                <span className="description-font">ABC, DEF, GHI</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Committee</span>
                <span className="description-font">ABC, DEF, GHI</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold">Type</span>
                <span className="description-font">ABC, DEF, GHI</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
          {/* </Card> */}
        </Col>
        <Col xs={7}>
          {/* <Card style={{ width: "18rem" }} className="text-center"> */}
          <ListGroup className="viewbill-col2">
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Report Title</div>
                <div className="description-font">
                  Department of Education, Community Schools, Grants, Pilot
                  Program
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Measure Title</div>
                <div className="description-font">Relating to Education</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Description</div>
                <div className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Notified Of Hearing</div>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">All Versions</div>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Committee Reports</div>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Youtube</div>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Last Status Check</div>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="description-font">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Introduced By</div>
                <div className="description-font">ABC, DEF, GHI</div>
              </div>
            </ListGroup.Item>
          </ListGroup>
          {/* </Card> */}
        </Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
};
