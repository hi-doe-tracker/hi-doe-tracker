import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Returns the table display for a given billData. */
const ScraperBillViewDisplay = ({ scraperBillData }) => {
  const date = new Date(scraperBillData.lastUpdated * 1000);
  return (
    <tr>
      <td><Link id="bill-view" to={`/admin/assignbills/${scraperBillData._id}`}>{`#${scraperBillData.measureNumber}: ${scraperBillData.measureTitle}`}</Link></td>
      <td>{`${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`}</td>
      <td>Progress<ProgressBar now="25" /><br /></td>
    </tr>
  );
};

ScraperBillViewDisplay.propTypes = {
  scraperBillData: PropTypes.shape({
    bitAppropriation: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    companion: PropTypes.string,
    currentReferral: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    introducer: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    measureArchiveUrl: PropTypes.string.isRequired,
    measureNumber: PropTypes.number.isRequired,
    measurePdfUrl: PropTypes.string.isRequired,
    measureTitle: PropTypes.string.isRequired,
    measureType: PropTypes.string.isRequired,
    reportTitle: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ScraperBillViewDisplay;
