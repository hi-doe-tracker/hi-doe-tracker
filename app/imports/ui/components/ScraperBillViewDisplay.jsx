import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

/** Returns the table display for a given billData. */
const ScraperBillViewDisplay = ({ scraperBillData }) => (
  <tr>
    <td>{`#${scraperBillData.measureNumber}: ${scraperBillData.measureTitle}`}</td>
    <td>{scraperBillData.lastUpdated}</td>
    <td>Progress<ProgressBar now="25" /><br /></td>
  </tr>
);

ScraperBillViewDisplay.propTypes = {
  scraperBillData: PropTypes.shape({
    bitAppropriation: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    companion: PropTypes.string,
    currentReferral: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    introducer: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string.isRequired,
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
