import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, ListGroup, Table, OverlayTrigger, Button, Popover, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Sliders2 } from 'react-bootstrap-icons';
import { Bills } from '../../api/bill/BillCollection';
import { Hearings } from '../../api/hearing/HearingCollection';
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

const HearingsQuickReference = ({ darkTheme }) => {

  let color = 'light';

  if (darkTheme) {
    color = 'dark';
  }

  let initialFilter;
  if (localStorage.getItem('filter') == null) {
    initialFilter = [true, true, true, true, true, true, true, true];
  } else {
    initialFilter = JSON.parse(localStorage.getItem('filter'));
  }
  const [filter, setFilter] = useState(initialFilter);

  const { ready, bills, hearings } = useTracker(() => {
    const billSubscription = Bills.subscribeBill();
    const hearingsSubscription = Hearings.subscribeHearings();
    // Determine if the subscription is ready
    const rdy = billSubscription.ready() && hearingsSubscription.ready();
    // Get the scraper bill data from DB.
    const billItems = Bills.find({}, { sort: { hearingDate: -1 } }).fetch();
    const hearingItems = Hearings.find({}, { sort: { datetime: -1 } }).fetch();
    return {
      bills: billItems,
      ready: rdy,
      hearings: hearingItems,
    };
  }, []);

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

  const getHearings = () => {
    const filterBills = filteredBills();
    const filterHearings = [];
    for (let i = 0; i < hearings.length; i++) {
      for (let j = 0; j < filterBills.length; j++) {
        if (filterBills[j].billNo.includes(`${hearings[i].measureNumber}`)) {
          filterHearings.push(hearings[i]);
          break;
        }
      }
    }
    return filterHearings;
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
      bg={darkTheme ? 'dark' : null}
      text={darkTheme ? 'light' : 'dark'}
      style={{ width: '228px' }}
      className="float-end"
    >
      <Card.Header>
        <Table size="sm" className="p-0 m-0" borderless>
          <tfoot>
            <tr>
              <td className={`w-75 p-0 m-0 ${darkTheme ? 'text-white' : null}`}>
                Hearings
              </td>
              <td className="p-0 m-0">
                <div className="text-center d-grid p-0 m-0">
                  <OverlayTrigger trigger="click" placement="left" overlay={selectFilters}>
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
      <ListGroup>
        {ready ? getHearings().slice(0, 3).map((hearing) => (
          <ListGroup.Item variant={color}>
            <h6>{hearing.measureType} {hearing.measureNumber}</h6>
          </ListGroup.Item>
        )) : <LoadingSpinner message="Loading Data" />}
      </ListGroup>
    </Card>
  );
};

HearingsQuickReference.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default HearingsQuickReference;
