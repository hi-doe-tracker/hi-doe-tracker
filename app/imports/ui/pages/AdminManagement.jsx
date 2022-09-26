import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const AdminManagement = () => {
  const navigate = useNavigate();
  const goToAssignBill = () => {
    navigate('/admin/assignbills');
  };
  const goToManageAccount = () => {
    navigate('/admin/manageaccount');
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="outline-primary" onClick={() => goToAssignBill()}>Assign a Bill</Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button variant="outline-primary" onClick={() => goToManageAccount()}>Manage Accounts</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminManagement;
