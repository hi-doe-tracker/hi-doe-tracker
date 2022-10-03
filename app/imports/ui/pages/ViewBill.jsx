import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Container,
  Col,
  Breadcrumb,
  ListGroup,
  Accordion,
} from 'react-bootstrap';
import TestimonyProgressBar from '../components/TestimonyProgressBar';
import { PAGE_IDS } from '../utilities/PageIDs';

// ViewBill component displays information about the specific bill
const ViewBill = ({ viewBill }) => {
  const {
    billlink,
    billno,
    office,
    action,
    status,
    actno,
    companion,
    reporttitle,
    legtype,
    committeereferral,
    measuretitle,
    introducedby,
    introducedbydate,
    description,
    allversion,
    committeereports,
    hearingnotices,
    laststatus,
    notifiedhearingdate,
    notifiedhearing,
    hearingdate,
    hearingtime,
    hearinglocation,
    committee,
    type,
    testifiercontact,
    similar,
    leadofficeposition,
    testifier,
    approvedtestimony,
    monitoringreports,
    hearingcomments,
    testimony,
    rationale,
  } = viewBill;
  return (
    // returns a single container containing information about the bill
    <Container id={PAGE_IDS.VIEW_BILL} className="viewbill-container">
      <Row>
        <center>
          <Col>
            <h2>Bill | Resolution Tracking</h2>
            <Breadcrumb className="viewbill-breadcrumb">
              <Breadcrumb.Item
                href={billlink}
                target="_blank"
                className="viewbill-breadcrumbItem"
              >
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
                <span className="fw-bold viewbill-spandiv">
                  Bill/Resolution No
                </span>
                <span className="description-font viewbill-spandiv">
                  {billno}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Office</span>
                <span className="description-font viewbill-spandiv">
                  {office.join(', ')}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Action</span>
                <span className="description-font viewbill-spandiv">
                  {action}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Act #</span>
                <span className="description-font viewbill-spandiv">
                  {actno}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Status</span>
                <span className="description-font viewbill-spandiv">
                  {status}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Companion</span>
                <span className="description-font viewbill-spandiv">
                  {companion}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Legislation Type
                </span>
                <span className="description-font viewbill-spandiv">
                  {legtype}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Committee Referral
                </span>
                <span className="description-font viewbill-spandiv">
                  {committeereferral.join(', ')}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Introduced By</span>
                <span className="description-font viewbill-spandiv">
                  {introducedby}({introducedbydate})
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Hearing Date</span>
                <span className="description-font viewbill-spandiv">
                  {hearingdate}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Hearing Time</span>
                <span className="description-font viewbill-spandiv">
                  {hearingtime}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Hearing Location
                </span>
                <span className="description-font viewbill-spandiv">
                  {hearinglocation}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Committee</span>
                <span className="description-font viewbill-spandiv">
                  {committee}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Type</span>
                <span className="description-font viewbill-spandiv">
                  {type}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Lead Office Position
                </span>
                <span className="description-font viewbill-spandiv">
                  {leadofficeposition}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Testifier</span>
                <span className="description-font viewbill-spandiv">
                  {testifier}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Monitoring Reports
                </span>
                <span className="description-font viewbill-spandiv">
                  {monitoringreports}
                </span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup className="viewbill-col2">
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Report Title</div>
                <div className="description-font">{reporttitle}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Measure Title</div>
                <div className="description-font">{measuretitle}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Description</div>
                <div className="description-font">{description}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Rationale</div>
                <div className="description-font">{rationale}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Notified of Hearing</div>
                <div className="description-font">{notifiedhearingdate}</div>
                <a
                  className="description-font"
                  href={`https://${notifiedhearing}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {notifiedhearing}
                </a>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Testifier Contact</div>
                <div className="description-font">
                  {testifiercontact.join(', ')}
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
                    {allversion.map((item) => (
                      <a
                        className="description-font"
                        key={item}
                        href={`https://${item}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item}
                      </a>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="flexcenter">
                  <Accordion.Header className="viewbill-acchead">
                    <div className="fw-bold divcolor viewbill-font acc-header">
                      Committee Reports
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="viewbill-accbody">
                    {committeereports.map((item) => (
                      <a
                        className="description-font"
                        key={item}
                        href={`https://${item}`}
                      >
                        {item}
                      </a>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="flexcenter">
                  <Accordion.Header className="viewbill-acchead">
                    <div className="fw-bold divcolor viewbill-font acc-header">
                      Hearing Notices
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="viewbill-accbody">
                    {hearingnotices.map((item) => (
                      <a
                        className="description-font"
                        key={item}
                        href={`https://${item}`}
                      >
                        {item}
                      </a>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="flexcenter">
                  <Accordion.Header className="viewbill-acchead">
                    <div className="fw-bold divcolor viewbill-font acc-header">
                      Last Status Check
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="viewbill-accbody">
                    {laststatus.map((item) => (
                      <p className="description-font" key={item}>
                        {item}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4" className="flexcenter">
                  <Accordion.Header className="viewbill-acchead">
                    <div className="fw-bold divcolor viewbill-font acc-header">
                      Similar
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="viewbill-accbody">
                    {similar.map((item) => (
                      <p className="description-font" key={item}>
                        {item}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5" className="flexcenter">
                  <Accordion.Header className="viewbill-acchead">
                    <div className="fw-bold divcolor viewbill-font acc-header">
                      Hearing Comments
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="viewbill-accbody">
                    {hearingcomments.map((item) => (
                      <p className="description-font" key={item}>
                        {item}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6" className="flexcenter">
                  <Accordion.Header className="viewbill-acchead">
                    <div className="fw-bold divcolor viewbill-font acc-header">
                      Approved Testimony
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="viewbill-accbody">
                    {approvedtestimony.map((item) => (
                      <p className="description-font" key={item}>
                        {item}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7" className="flexcenter">
                  <Accordion.Header className="viewbill-acchead">
                    <div className="fw-bold divcolor viewbill-font acc-header">
                      Testimony
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="full-body-testimony">
                    <ListGroup>
                      {testimony.map((item) => (
                        <ListGroup.Item as="div" className="full-body-testimony" key={item}>
                          <div className="ms-2 me-auto viewbill-div viewbill-font ">
                            <span className="fw-bold viewbill-spandiv">
                              {item}
                            </span>
                            <span className="description-font viewbill-spandiv">
                              09/06/2022
                            </span>
                          </div>
                          <TestimonyProgressBar percent={75} />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

ViewBill.propTypes = {
  viewBill: PropTypes.shape({
    billlink: PropTypes.string.isRequired,
    billno: PropTypes.string.isRequired,
    office: PropTypes.arrayOf(PropTypes.string).isRequired,
    action: PropTypes.string,
    status: PropTypes.string,
    actno: PropTypes.number.isRequired,
    companion: PropTypes.string,
    reporttitle: PropTypes.string.isRequired,
    legtype: PropTypes.string.isRequired,
    committeereferral: PropTypes.arrayOf(PropTypes.string).isRequired,
    measuretitle: PropTypes.string,
    introducedby: PropTypes.string.isRequired,
    introducedbydate: PropTypes.string.isRequired,
    description: PropTypes.string,
    allversion: PropTypes.arrayOf(PropTypes.string),
    committeereports: PropTypes.arrayOf(PropTypes.string),
    hearingnotices: PropTypes.arrayOf(PropTypes.string),
    laststatus: PropTypes.arrayOf(PropTypes.string),
    notifiedhearing: PropTypes.string,
    notifiedhearingdate: PropTypes.string,
    hearingdate: PropTypes.string,
    hearingtime: PropTypes.string,
    hearinglocation: PropTypes.string,
    committee: PropTypes.string,
    type: PropTypes.string,
    testifiercontact: PropTypes.arrayOf(PropTypes.string),
    similar: PropTypes.arrayOf(PropTypes.string),
    leadofficeposition: PropTypes.string,
    testifier: PropTypes.string,
    approvedtestimony: PropTypes.arrayOf(PropTypes.string),
    monitoringreports: PropTypes.string,
    hearingcomments: PropTypes.arrayOf(PropTypes.string),
    testimony: PropTypes.arrayOf(PropTypes.string),
    rationale: PropTypes.string,
    statustext: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ViewBill;
