import { Button, Card, ListGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';
import _ from 'lodash';

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

const BillQuickReference = () => {
  const [show, setShow] = useState(false);

  const showMore = () => {
    setShow(true);
  };

  const showLess = () => {
    setShow(false);
  };

  return (
    <Card style={{ width: '225px' }}>
      <Card.Header>Recent Bills</Card.Header>
      <ListGroup variant="flush">
        {sortedData.slice(0, (show ? 10 : 5)).map((measure) => (
          <ListGroup.Item key={measure.measureNumber}>
            <h6>{measure.measureNumber}: {measure.measureTitle}</h6>
            {measure.lastUpdated.toDateString()}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Footer>
        <Button variant="light" onClick={show ? showLess : showMore}>
          {show ? 'Show Less' : 'Show More'} {show ? (<DashCircle />) : (<PlusCircle />)}
        </Button>
      </Card.Footer>
    </Card>
  );
};
export default BillQuickReference;
