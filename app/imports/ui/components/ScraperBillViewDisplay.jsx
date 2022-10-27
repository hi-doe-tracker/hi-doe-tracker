import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Returns the table display for a given billData. */
const ScraperBillViewDisplay = ({ scraperBillData }) => (
  <tr>
    <td><Link id="bill-view" to={`/admin/assignbills/${scraperBillData._id}`}>{`#${scraperBillData.measureNumber}: ${scraperBillData.measureTitle}`}</Link></td>
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
    // lastUpdated: PropTypes.number.isRequired,
    lastUpdated: PropTypes.instanceOf(Date),
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
