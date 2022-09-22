import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const bills = [
  {
    billId: 1,
    billName: 'First Bill',
  },
  {
    billId: 2,
    billName: 'Second Bill',
  },
  {
    billId: 3,
    billName: 'Third Bill',
  },
];

const offices = ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'];

const AssignBill = () => (
  <Container id={PAGE_IDS.ASSIGN_BILLS}>
    <Form>
      <h3>Assigned Bill</h3>
      <Form.Select>
        <option>Assign an existing bill</option>
        {bills.map(bill => <option key={bill.id} value={bill.id}>{bill.billName}</option>)}
      </Form.Select>
      <h3>Offices</h3>
      {offices.map(office => (
        <Form.Check
          inline
          label={office}
          name={office}
          type="checkbox"
          id="inline-checkbox-1"
        />
      ))}
    </Form>
  </Container>
);

export default AssignBill;
