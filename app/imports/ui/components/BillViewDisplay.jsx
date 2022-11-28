import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'usehooks-ts';
import { Link } from 'react-router-dom';

/** Returns the table display for a given billData. */
const BillViewDisplay = ({ billData }) => {
  const mobileView = useMediaQuery('(max-width: 850px)');
  return (
    <tr id="viewBillTableRow">
      <td><Link id="bill-view" to={`/viewbill/${billData._id}`}>{`#${billData.billNo}: ${billData.measureTitle}`}</Link></td>
      <td>{billData.hearingDate.toLocaleString()}</td>
      <td>
        <h6>{`Main Office: ${billData.mainOffice}`}</h6>
        {mobileView ? (billData.office.map(office => <div>{office.toString()}<br /></div>)) : (`${billData.office.join(', ')} `)}
      </td>
    </tr>
  );
};

BillViewDisplay.propTypes = {
  billData: PropTypes.shape({
    billLink: PropTypes.string.isRequired,
    billNo: PropTypes.string.isRequired,
    mainOffice: PropTypes.string,
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
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BillViewDisplay;
