import { Button, Popover, Card, ListGroup, Table, OverlayTrigger, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PlusCircle, DashCircle, Sliders2 } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { Bills } from '../../api/bill/BillCollection';
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
  let initialFilter;
  if (localStorage.getItem('filter') == null) {
    initialFilter = [true, true, true, true, true, true, true, true];
  } else {
    initialFilter = JSON.parse(localStorage.getItem('filter'));
  }
  const [filter, setFilter] = useState(initialFilter);
  const { ready, bills } = useTracker(() => {
    const subscription = Bills.subscribeBill();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the scraper bill data from DB.
    const billItems = Bills.find({}, { sort: { hearingDate: -1 } }).fetch();
    console.log(billItems.length);
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
    localStorage.setItem('filter', JSON.stringify(temp));
    setFilter(temp);
  };

  const filteredBills = () => {
    const filterBills = [];
    for (let i = 0; i < bills.length; i++) {
      for (let j = 0; j < officeNames.length; j++) {
        if (bills[i].office.includes(officeNames[j].name) && filter[j]) {
          filterBills.push(bills[i]);
          break;
        }
      }
    }
    return filterBills;
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
                Bills Due
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
        {ready ? filteredBills().slice(0, (show ? 10 : 5)).map((measure) => (
          <ListGroup.Item key={measure.billNo} variant={color}>
            <h6>{measure.billNo}: {measure.measureTitle}</h6>
            {measure.hearingDate.toDateString()}
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
