import { Button, Card, ListGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';
import _ from 'lodash';
import PropTypes from 'prop-types';

const testData = [
  {
    measureType: 'BILL',
    measureNumber: 101,
    lastUpdated: new Date('Wed Sep 14 2022 08:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)'),
    measureTitle: 'Measure Title',
  },
  {
    measureType: 'BILL',
    measureNumber: 103,
    lastUpdated: new Date('Wed Sep 14 2022 10:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)'),
    measureTitle: 'Measure Title',
  },
  {
    measureType: 'BILL',
    measureNumber: 107,
    lastUpdated: new Date('Fri Sep 16 2022 12:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)'),
    measureTitle: 'Measure Title',
  },
  {
    measureType: 'BILL',
    measureNumber: 1073,
    lastUpdated: new Date('Sat Sep 17 2022 12:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)'),
    measureTitle: 'Measure Title',
  },
  {
    measureType: 'BILL',
    measureNumber: 1074,
    lastUpdated: new Date('Sun Sep 18 2022 12:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)'),
    measureTitle: 'Measure Title',
  },
  {
    measureType: 'BILL',
    measureNumber: 1057,
    lastUpdated: new Date('Mon Sep 19 2022 12:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)'),
    measureTitle: 'Measure Title',
  },
  {
    measureType: 'BILL',
    measureNumber: 1067,
    lastUpdated: new Date('Tue Sep 20 2022 12:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)'),
    measureTitle: 'Measure Title',
  },
  {
    measureType: 'BILL',
    measureNumber: 1407,
    lastUpdated: new Date('Wed Sep 21 2022 12:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)'),
    measureTitle: 'Measure Title',
  },
  {
    measureType: 'BILL',
    measureNumber: 1017,
    lastUpdated: new Date('Thu Sep 22 2022 12:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)'),
    measureTitle: 'Measure Title',
  },
];

const sortedData = _.sortBy(testData, function (measure) { return measure.lastUpdated.getTime(); });

const BillQuickReference = ({ darkTheme }) => {
  const [show, setShow] = useState(false);
  let color = 'light';

  if (darkTheme) {
    color = 'dark';
  }

  const showMore = () => {
    setShow(true);
  };

  const showLess = () => {
    setShow(false);
  };

  return (
    <Card
      bg={darkTheme ? 'dark' : ''}
      text={darkTheme ? 'light' : 'dark'}
      style={{ width: '228px' }}
    >
      <Card.Header>Recent Bills</Card.Header>
      <ListGroup variant="flush">
        {sortedData.slice(0, (show ? 10 : 5)).map((measure) => (
          <ListGroup.Item key={measure.measureNumber} variant={color}>
            <h6>{measure.measureNumber}: {measure.measureTitle}</h6>
            {measure.lastUpdated.toDateString()}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Footer>
        <Button variant={color} onClick={show ? showLess : showMore}>
          {show ? 'Show Less' : 'Show More'} {show ? (<DashCircle />) : (<PlusCircle />)}
        </Button>
      </Card.Footer>
    </Card>
  );
};

BillQuickReference.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default BillQuickReference;
