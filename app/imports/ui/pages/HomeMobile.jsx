import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FileEarmarkPdf, CalendarMonth, Archive, JournalText, Megaphone } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import MiniCalendar from '../components/MiniCalendar';
import BillQuickReference from '../components/BillQuickReference';
import MiniMeasureTracker from '../components/MiniMeasureTracker';

const objects = [
  {
    title: 'Hearings',
    icon: (<Megaphone size={100} />),
    link: '',
    description: 'description of where this will take you',
  },
  {
    title: 'Measures',
    icon: (<Archive size={100} />),
    link: '',
    description: 'description of where this will take you',
  },
  {
    title: 'Submit Testimony',
    icon: (<FileEarmarkPdf size={100} />),
    link: '',
    description: 'description of where this will take you',
  },
  {
    title: 'Reports',
    icon: (<JournalText size={100} />),
    link: '',
    description: 'description of where this will take you',
  },
  {
    title: 'Calendar',
    icon: (<CalendarMonth size={100} />),
    link: '',
    description: 'description of where this will take you',
  },
];

const HomeMobile = ({ darkTheme }) => (
  <Container fluid>
    <Row>
      <Col className="p-5">
        <Row xs={2} className="g-4">
          {objects.map((info) => (
            <Col>
              <Card
                bg={darkTheme ? 'dark' : ''}
                text={darkTheme ? 'light' : 'dark'}
              >
                <Card.Body>
                  <div className="d-flex justify-content-center">
                    {info.icon}
                  </div>
                </Card.Body>
                <Card.Footer>
                  {info.title}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
    <Row xs={1}>
      <Col className="px-5 pb-5">
        <div style={{ width: '100%', padding: '0 0 0 50%' }}>
          <div style={{ width: '228px', left: '-114px', position: 'relative' }}>
            <MiniCalendar darkTheme={darkTheme} />
          </div>
        </div>
      </Col>
    </Row>
    <Row>
      <Col className="px-5 pb-5">
        <div style={{ width: '100%', padding: '0 0 0 50%' }}>
          <div style={{ width: '228px', left: '-114px', position: 'relative' }}>
            <MiniMeasureTracker darkTheme={darkTheme} />
          </div>
        </div>
      </Col>
    </Row>
    <Row>
      <Col className="px-5 pb-5">
        <div style={{ width: '100%', padding: '0 0 0 50%' }}>
          <div style={{ width: '228px', left: '-114px', position: 'relative' }}>
            <BillQuickReference darkTheme={darkTheme} />
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);

HomeMobile.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default HomeMobile;
