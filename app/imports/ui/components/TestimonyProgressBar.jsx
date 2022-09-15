import React from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import PropTypes from 'prop-types';

const TestimonyProgressBar = ({ percent }) => (
  <ProgressBar percent={percent}>
    <Step>
      {({ accomplished, index }) => (
        <div
          className={`indexedStep ${accomplished ? 'accomplished' : null}`}
        >
          {index + 1}
        </div>
      )}
    </Step>
    <Step>
      {({ accomplished, index }) => (
        <div
          className={`indexedStep ${accomplished ? 'accomplished' : null}`}
        >
          {index + 1}
        </div>
      )}
    </Step>
    <Step>
      {({ accomplished, index }) => (
        <div
          className={`indexedStep ${accomplished ? 'accomplished' : null}`}
        >
          {index + 1}
        </div>
      )}
    </Step>
    <Step>
      {({ accomplished, index }) => (
        <div
          className={`indexedStep ${accomplished ? 'accomplished' : null}`}
        >
          {index + 1}
        </div>
      )}
    </Step>
    <Step>
      {({ accomplished, index }) => (
        <div
          className={`indexedStep ${accomplished ? 'accomplished' : null}`}
        >
          {index + 1}
        </div>
      )}
    </Step>
  </ProgressBar>
);

TestimonyProgressBar.propTypes = {
  percent: PropTypes.number,
};

TestimonyProgressBar.defaultProps = {
  percent: 0,
};

export default TestimonyProgressBar;
