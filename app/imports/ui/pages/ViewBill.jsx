import React from 'react';
import {
  Row,
  Container,
  Col,
  Breadcrumb,
  ListGroup,
  Accordion,
} from 'react-bootstrap';

const ViewBill = () => (
  <Container className="viewbill-container">
    <Row>
      <center>
        <Col>
          <h2>Bill | Resolution Tracking</h2>
          <Breadcrumb className="viewbill-breadcrumb">
            <Breadcrumb.Item href="#" className="viewbill-breadcrumbItem">
              Current Bill
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" className="viewbill-breadcrumbItem">
              Measure(Status)
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </center>
    </Row>
    <Row className="viewbill-row">
      <Col>
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
      </Col>
      <Col>
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
            <Accordion className="viewbill-accordion description-font">
              <Accordion.Item eventKey="0" className="flexcenter">
                <Accordion.Header className="viewbill-acchead">
                  <div className="fw-bold divcolor viewbill-font acc-header">
                    All Versions
                  </div>
                </Accordion.Header>
                <Accordion.Body className="viewbill-accbody">
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="flexcenter">
                <Accordion.Header className="viewbill-acchead">
                  <div className="fw-bold divcolor viewbill-font acc-header">
                    Committee Reports
                  </div>
                </Accordion.Header>
                <Accordion.Body className="viewbill-accbody">
                  <p className="description-font">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </p>
                  <p className="description-font">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </p>
                  <p className="description-font">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" className="flexcenter">
                <Accordion.Header className="viewbill-acchead">
                  <div className="fw-bold divcolor viewbill-font acc-header">
                    Youtube
                  </div>
                </Accordion.Header>
                <Accordion.Body className="viewbill-accbody">
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="flexcenter">
                <Accordion.Header className="viewbill-acchead">
                  <div className="fw-bold divcolor viewbill-font acc-header">
                    Last Status Check
                  </div>
                </Accordion.Header>
                <Accordion.Body className="viewbill-accbody">
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4" className="flexcenter">
                <Accordion.Header className="viewbill-acchead">
                  <div className="fw-bold divcolor viewbill-font acc-header">
                    Similar
                  </div>
                </Accordion.Header>
                <Accordion.Body className="viewbill-accbody">
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5" className="flexcenter">
                <Accordion.Header className="viewbill-acchead">
                  <div className="fw-bold divcolor viewbill-font acc-header">
                    Lead Office Position
                  </div>
                </Accordion.Header>
                <Accordion.Body className="viewbill-accbody">
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6" className="flexcenter">
                <Accordion.Header className="viewbill-acchead">
                  <div className="fw-bold divcolor viewbill-font acc-header">
                    Testifier
                  </div>
                </Accordion.Header>
                <Accordion.Body className="viewbill-accbody">
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7" className="flexcenter">
                <Accordion.Header className="viewbill-acchead">
                  <div className="fw-bold divcolor viewbill-font acc-header">
                    Approved testimony
                  </div>
                </Accordion.Header>
                <Accordion.Body className="viewbill-accbody">
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  </Container>
);

export default ViewBill;
