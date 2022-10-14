import { Button, Popover, Card, ListGroup, Table, OverlayTrigger, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PlusCircle, DashCircle, Sliders2 } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { ScraperBills } from '../../api/scraperBill/ScraperBillCollection';
import LoadingSpinner from './LoadingSpinner';

const officeNames = [
  {
    name: 'DEPUTY',
    eventKey: 0,
  },
  {
    name: 'OCID',
    eventKey: 1,
  },
  {
    name: 'OFO',
    eventKey: 2,
  },
  {
    name: 'OFS',
    eventKey: 3,
  },
  {
    name: 'OITS',
    eventKey: 4,
  },
  {
    name: 'OSIP',
    eventKey: 5,
  },
  {
    name: 'OSSS',
    eventKey: 6,
  },
  {
    name: 'OTM',
    eventKey: 7,
  },
];

const BillQuickReference = ({ darkTheme }) => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState([true, true, true, true, true, true, true, true]);
  const { ready, bills } = useTracker(() => {
    const subscription = ScraperBills.subscribeScraperBill();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the scraper bill data from DB.
    const billItems = ScraperBills.find({}, { sort: { lastUpdated: -1 } }).fetch();
    return {
      bills: billItems,
      ready: rdy,
    };
  }, []);
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

  const updateFilter = (value) => {
    const temp = filter.concat();
    temp[value] = !temp[value];
    setFilter(temp);
  };

  const selectFilters = (
    <Popover>
      <Popover.Header as="h3">Select Offices</Popover.Header>
      <Popover.Body>
        <Form>
          {officeNames.map((office) => (
            <Form.Check
              key={office.name}
              type="checkbox"
              label={office.name}
              checked={filter[office.eventKey]}
              onChange={() => updateFilter(office.eventKey)}
            />
          ))}
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <Card
      bg={darkTheme ? 'dark' : ''}
      text={darkTheme ? 'light' : 'dark'}
      style={{ width: '228px' }}
    >
      <Card.Header>
        <Table size="sm" className="p-0 m-0" borderless>
          <tfoot>
            <tr>
              <td className={`w-75 p-0 m-0 ${darkTheme ? 'text-white' : null}`}>
                Recently Updated
              </td>
              <td className="p-0 m-0">
                <div className="text-center d-grid p-0 m-0">
                  <OverlayTrigger trigger="click" placement="right" overlay={selectFilters}>
                    <Button size="sm" variant="light">
                      <Sliders2 size={20} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Card.Header>
      <ListGroup variant="flush">
        {ready ? bills.slice(0, (show ? 10 : 5)).map((measure) => (
          <ListGroup.Item key={measure.measureNumber} variant={color}>
            <h6>{measure.measureNumber}: {measure.measureTitle}</h6>
            {measure.lastUpdated.toDateString()}
          </ListGroup.Item>
        )) : <LoadingSpinner message="Loading Data" />}
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
