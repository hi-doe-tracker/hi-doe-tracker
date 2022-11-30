import React from 'react';
import { Card, Col, Container, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FileEarmarkPdf, CalendarMonth, Archive, Megaphone } from 'react-bootstrap-icons';
import { useMediaQuery } from 'usehooks-ts';
import { NavLink } from 'react-router-dom';
import MiniCalendar from '../components/MiniCalendar';
import BillQuickReference from '../components/BillQuickReference';
import MiniMeasureTracker from '../components/HearingQuickReference';
import { PAGE_IDS } from '../utilities/PageIDs';
import { HOMEPAGE_IDS } from '../utilities/HomePageIDs';

const objects = [
  {
    title: 'Hearings',
    id: HOMEPAGE_IDS.HEARINGS_BUTTON,
    icon: (<Megaphone size={100} />),
    link: '/view-hearings',
    description: 'View all hearings here',
  },
  {
    title: 'Measures',
    id: HOMEPAGE_IDS.MEASURES_BUTTON,
    icon: (<Archive size={100} />),
    link: '/bills',
    description: 'View all measures here',
  },
  {
    title: 'Submit Testimony',
    id: HOMEPAGE_IDS.SUBMIT_TESTIMONY_BUTTON,
    icon: (<FileEarmarkPdf size={100} />),
    link: '/submit',
    description: 'Fill out a form to sumbit your testimony here',
  },
  {
    title: 'Calendar',
    id: HOMEPAGE_IDS.CALENDAR_BUTTON,
    icon: (<CalendarMonth size={100} />),
    link: '/calendar',
    description: 'Manage your calendar here',
  },
];

const darkTheme = false;

const HomeContent = () => (
  <Container id={PAGE_IDS.HOME} fluid className="px-5" style={{ overflow: 'hidden', height: '100%' }}>
    <Row>
      <Col xs={3}>
        <BillQuickReference darkTheme={darkTheme} />
      </Col>
      <Col>
        <Row xs={1} md={3} className="g-4">
          {objects.map((info) => (
            <Col key={info.link}>
              <OverlayTrigger
                placement="bottom"
                overlay={(
                  <Tooltip
                    key={info.title}
                    style={{ position: 'absolute', top: '50%', left: '50%' }}
                  >
                    {info.description}
                  </Tooltip>
                )}
              >
                <Card
                  id={info.id}
                  bg={darkTheme ? 'dark' : ''}
                  text={darkTheme ? 'light' : 'dark'}
                  as={NavLink}
                  to={info.link}
                  style={{ textDecoration: 'none' }}
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
              </OverlayTrigger>
            </Col>
          ))}
        </Row>
      </Col>
      <Col xs={3}>
        <MiniCalendar darkTheme={darkTheme} />
        <MiniMeasureTracker darkTheme={darkTheme} />
      </Col>
    </Row>
  </Container>
);

const HomeMobile = () => (
  <Container fluid id={PAGE_IDS.HOME_MOBILE}>
    <Row>
      <Col className="p-5">
        <Row xs={2} className="g-4">
          {objects.map((info) => (
            <Col>
              <Card
                id={info.id}
                bg={darkTheme ? 'dark' : ''}
                text={darkTheme ? 'light' : 'dark'}
                as={NavLink}
                to={info.link}
                style={{ textDecoration: 'none' }}
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

const Home = () => {
  const mobileView = useMediaQuery('(max-width: 760px)');
  if (mobileView) {
    return (<HomeMobile />);
  }
  return (<HomeContent />);
};

export default Home;
