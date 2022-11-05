import React from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
// import PropTypes from 'prop-types';
import {
  Row,
  Container,
  Col,
  ListGroup,
  Accordion,
} from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Bills } from '../../api/bill/BillCollection';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import ListOneBillTestimony from '../components/ListOneBillTestimony';

// ViewBill component displays information about the specific bill
const ViewBill = () => {
  const { _id } = useParams();
  const style = { width: '100%', margin: 0 };
  const { ready, viewBill, readyTestimony } = useTracker(() => {
    const subscription = Bills.subscribeBill();
    const subscriptionTestimony = Testimonies.subscribeTestimony();
    const rdyTest = subscriptionTestimony.ready();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the bill data from DB.
    // const billDoc = Bills.findDoc(_id);
    const allBills = Bills.find({ _id: _id }, { sort: { name: 1 } }).fetch();
    const billDoc = allBills[0];
    return {
      viewBill: billDoc,
      ready: rdy,
      readyTestimony: rdyTest,
      // testimonies: testimonies,
    };
  }, []);

  // returns a single container containing information about the bill
  return (ready && readyTestimony ? (
    <Container id={PAGE_IDS.VIEW_BILL} className="viewbill-container" key={`${viewBill.billNo}`}>
      <Row>
        <center>
          <Col>
            <h2>Bill | Resolution Tracking</h2>
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
                  {viewBill.billNo}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Main Office</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.mainOffice}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Offices</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.office.join(', ')}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Action</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.action}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Act #</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.actionNumber}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Status</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.status}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Companion</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.companion}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Legislation Type
                </span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.legalType}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Committee Referral
                </span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.committeeReferral.join(', ')}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Introduced By</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.introducedBy}({viewBill.introducedByDate})
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Hearing Date</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.hearingDate.getDate()}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Hearing Location
                </span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.hearingLocation}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Committee</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.committee}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Type</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.type}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Lead Office Position
                </span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.leadOfficePosition}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">Testifier</span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.testifier}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex">
              <div className="ms-2 me-auto viewbill-div viewbill-font">
                <span className="fw-bold viewbill-spandiv">
                  Monitoring Reports
                </span>
                <span className="description-font viewbill-spandiv">
                  {viewBill.monitoringReports}
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
                <div className="description-font">{viewBill.reportTitle}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Measure Title</div>
                <div className="description-font">{viewBill.measureTitle}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Description</div>
                <div className="description-font">{viewBill.description}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Rationale</div>
                <div className="description-font">{viewBill.rationale}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Notified of Hearing</div>
                <a
                  className="description-font"
                  href={`https://${viewBill.notifiedHearing}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'black' }}
                >
                  {viewBill.notifiedHearing}
                </a>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex flex2">
              <div className="ms-2 me-auto flexcenter viewbill-font">
                <div className="fw-bold divcolor">Testifier Contact</div>
                <div className="description-font">
                  {viewBill.testifierContact.join(', ')}
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
                    {viewBill.allVersions.map((item) => (
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
                    {viewBill.committeeReports.map((item) => (
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
                    {viewBill.hearingNotices.map((item) => (
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
                    {viewBill.lastStatus.map((item) => (
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
                    {viewBill.similar.map((item) => (
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
                    {viewBill.hearingComments.map((item) => (
                      <p className="description-font" key={item}>
                        {item}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Accordion style={{ marginBottom: '10px' }}>
          <Accordion.Item eventKey="7" className="flexcenter">
            <Accordion.Header className="viewbill-acchead">
              <div className="fw-bold divcolor viewbill-font acc-header">
                Testimony
              </div>
            </Accordion.Header>
            <Accordion.Body className="full-body-testimony" style={style}>
              <ListOneBillTestimony billNo={viewBill.billNo} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Data" />);
};

/*
ViewBill.propTypes = {
  viewBill: PropTypes.shape({
    billLink: PropTypes.string.isRequired,
    billNo: PropTypes.string.isRequired,
    office: PropTypes.arrayOf(PropTypes.string).isRequired,
    action: PropTypes.string,
    status: PropTypes.string,
    actionNumber: PropTypes.number.isRequired,
    companion: PropTypes.string,
    reportTitle: PropTypes.string.isRequired,
    legalType: PropTypes.string.isRequired,
    committeeReferral: PropTypes.arrayOf(PropTypes.string).isRequired,
    measureTitle: PropTypes.string,
    introducedBy: PropTypes.string.isRequired,
    introducedByDate: PropTypes.string.isRequired,
    description: PropTypes.string,
    allVersions: PropTypes.arrayOf(PropTypes.string),
    committeeReports: PropTypes.arrayOf(PropTypes.string),
    hearingNotices: PropTypes.arrayOf(PropTypes.string),
    lastStatus: PropTypes.arrayOf(PropTypes.string),
    notifiedHearing: PropTypes.string,
    hearingDate: PropTypes.string,
    hearingLocation: PropTypes.string,
    committee: PropTypes.string,
    type: PropTypes.string,
    testifierContact: PropTypes.arrayOf(PropTypes.string),
    similar: PropTypes.arrayOf(PropTypes.string),
    leadOfficePosition: PropTypes.string,
    testifier: PropTypes.string,
    approvedTestimony: PropTypes.arrayOf(PropTypes.string),
    monitoringReports: PropTypes.arrayOf(PropTypes.string).isRequired,
    hearingComments: PropTypes.arrayOf(PropTypes.string),
    testimony: PropTypes.arrayOf(PropTypes.string),
    rationale: PropTypes.string,
    statusText: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}; */

export default ViewBill;
