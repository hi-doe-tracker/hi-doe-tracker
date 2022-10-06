import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { useMediaQuery } from 'usehooks-ts';
import { Link } from 'react-router-dom';

const BillViewDisplay = ({ billData }) => {
  const mobileView = useMediaQuery('(max-width: 850px)');

  if (mobileView) {
    return (
      <tr>
        <td><Link id="bill-view" to={`/viewbill/${billData._id}`}>{`#${billData.billNo}: ${billData.measureTitle}`}</Link></td>
        <td>{billData.hearingDate.getDate()}</td>
        <td>{billData.office.toString()}</td>
        <td>Progress<ProgressBar now="25" /><br /></td>
        <td><Button variant="outline-danger" onClick={() => window.alert('Button Clicked')}>Delete</Button></td>
      </tr>
    );
  }
  return (
    <tr>
      <td><Link id="bill-view" to={`/viewbill/${billData._id}`}>{`#${billData.billNo}: ${billData.measureTitle}`}</Link></td>
      <td>{billData.hearingDate.getDate()}</td>
      <td>{billData.office.toString()}</td>
      <td>Progress<ProgressBar now="25" /><br /></td>
      <td><Button variant="outline-danger" onClick={() => window.alert('Button Clicked')}>Delete</Button></td>
    </tr>
  );
};

BillViewDisplay.propTypes = {
  billData: PropTypes.shape({
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
    hearingDate: PropTypes.instanceOf(Date),
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
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BillViewDisplay;
