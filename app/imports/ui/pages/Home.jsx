import React from 'react';
import { Card, Col, Container, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FileEarmarkText, FileEarmarkPdf, CalendarMonth, Archive, JournalText, Megaphone } from 'react-bootstrap-icons';
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

const Home = () => (
  <Container fluid className="px-5">
    <Row>
      <Col xs={3}>
        <BillQuickReference />
      </Col>
      <Col>
        <Row xs={1} md={3} className="g-4">
          {objects.map((info) => (
            <Col>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">{info.description}</Tooltip>}
              >
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-center">
                      {info.icon}
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    {info.title}
                  </Card.Footer>
                </Card>
              </OverlayTrigger>
            </Col>
          ))}
        </Row>
      </Col>
      <Col xs={3}>
        <MiniCalendar />
        <MiniMeasureTracker />
      </Col>
    </Row>
  </Container>
);

export default Home;
