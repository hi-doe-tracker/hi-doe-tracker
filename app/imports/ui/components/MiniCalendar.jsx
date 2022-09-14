import React, { useState } from 'react';
import { Card, Button, ButtonGroup, Table, ToggleButton, ListGroup } from 'react-bootstrap';
import { CaretRight, CaretLeft } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const testData = [
  {
    measureType: 'BILL',
    measureNumber: 101,
    datetime: 'Wed Sep 21 2022 08:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)',
  },
  {
    measureType: 'BILL',
    measureNumber: 103,
    datetime: 'Wed Sep 21 2022 10:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)',
  },
  {
    measureType: 'BILL',
    measureNumber: 107,
    datetime: 'Fri Sep 23 2022 12:30:00 GMT-1000 (Hawaii-Aleutian Standard Time)',
  },
];

// Used to keep track to the current date
const today = new Date();
// Used to map a month from an integer to a name
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MiniCalendar = ({ darkTheme }) => {
  // State variable that determines which month is being displayed
  const [date, setDate] = useState(new Date());
  const [radioValue, setRadioValue] = useState(date.toDateString());
  const isEventArray = new Array(32).fill(false);
  let color = 'light';

  if (darkTheme) {
    color = 'dark';
  }

  const updateIsEventArray = () => {
    let testDate;
    isEventArray.fill(false);
    for (let i = 0; i < testData.length; i++) {
      testDate = new Date(testData[i].datetime);
      if (testDate.getMonth() === date.getMonth() && testDate.getFullYear() === date.getFullYear()) {
        isEventArray[testDate.getDate()] = true;
      }
    }
  };

  // Sets the dates in the correct position of the week.
  const getDays = tempDate => {
    const content = [];
    let printDate;
    let disabled;
    let variant;
    let dateString;
    updateIsEventArray();
    tempDate.setDate(tempDate.getDate() - tempDate.getDay());
    for (let i = 0; i < 7; i++) {
      printDate = `${tempDate.getDate()}`;
      if (printDate.length < 2) {
        printDate = `0${printDate}`;
      }
      if (tempDate.getMonth() === date.getMonth()) {
        if (
          tempDate.getDate() === today.getDate() &&
          tempDate.getMonth() === today.getMonth() &&
          tempDate.getFullYear() === today.getFullYear()
        ) {
          variant = 'primary';
          disabled = false;
        } else {
          if (isEventArray[tempDate.getDate()]) {
            variant = 'warning';
          } else {
            variant = color;
          }
          disabled = false;
        }
      } else {
        variant = color;
        disabled = true;
      }
      dateString = tempDate.toDateString();
      content.push(
        <ToggleButton
          size="sm"
          type="radio"
          id={dateString}
          key={dateString}
          variant={variant}
          disabled={disabled}
          value={dateString}
          checked={radioValue === dateString}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          {printDate}
        </ToggleButton>,
      );
      tempDate.setDate(tempDate.getDate() + 1);
    }
    return content;
  };

  // Builds the weeks for the calendar month defined in 'tempDate'. Calls getDays
  const getWeeks = tempDate => {
    tempDate.setDate(1);
    const month = tempDate.getMonth();
    const content = [];
    while (month === tempDate.getMonth()) {
      content.push(<ButtonGroup className="col-1" key={`week${tempDate.getDate()}`}>{getDays(tempDate)}</ButtonGroup>);
    }
    return content;
  };

  // function to make the calendar display the next month when right arrow is clicked
  const nextMonth = () => {
    const temp = new Date(date);
    if (temp.getMonth() === 11) {
      temp.setMonth(0);
      temp.setYear(temp.getFullYear() + 1);
    } else {
      temp.setMonth(temp.getMonth() + 1);
    }
    setDate(temp);
    setRadioValue('');
  };

  // function to make the calendar display the previous month when left arrow is clicked
  const prevMonth = () => {
    const temp = new Date(date);
    if (temp.getMonth() === 0) {
      temp.setMonth(11);
      temp.setYear(temp.getFullYear() - 1);
    } else {
      temp.setMonth(temp.getMonth() - 1);
    }
    setDate(temp);
    setRadioValue('');
  };

  const getEvents = (tempDate) => {
    if (radioValue === '') {
      return '';
    }
    const content = [];
    let testDate;
    for (let i = 0; i < testData.length; i++) {
      testDate = new Date(testData[i].datetime);
      if (
        tempDate.getFullYear() === testDate.getFullYear() &&
        tempDate.getMonth() === testDate.getMonth() &&
        tempDate.getDate() === testDate.getDate()
      ) {
        content.push(
          <ListGroup.Item key={testData[i].measureNumber} variant={color}>
            <h6>{testData[i].measureNumber} {testData[i].measureType}</h6>
            Time: {testDate.toLocaleTimeString('en-US')}
          </ListGroup.Item>,
        );
      }
    }
    if (content.length <= 0) {
      return 'No Scheduled Hearings';
    }
    return content;
  };

  // Main Body for MiniCalendar
  return (
    <Card
      style={{ width: '228px' }}
      className="float-end"
      bg={darkTheme ? 'dark' : ''}
      text={darkTheme ? 'light' : 'dark'}
    >
      <Card.Header>
        <Table size="sm" className="p-0 m-0" borderless>
          <tfoot>
            <tr>
              <td className={`w-75 p-0 m-0 ${darkTheme ? 'text-white' : null}`}>
                {months[date.getMonth()]} {date.getFullYear()}
              </td>
              <td className="p-0 m-0">
                <div className="text-center d-grid p-0 m-0">
                  <ButtonGroup>
                    <Button variant={color} size="sm" onClick={prevMonth}>
                      <CaretLeft />
                    </Button>
                    <Button variant={color} size="sm" onClick={nextMonth}>
                      <CaretRight />
                    </Button>
                  </ButtonGroup>
                </div>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Card.Header>
      <ButtonGroup vertical className="d-grid">
        <ButtonGroup className="font-monospace">
          <Button size="sm" variant="light" active>S</Button>
          <Button size="sm" variant="light" active>M</Button>
          <Button size="sm" variant="light" active>T</Button>
          <Button size="sm" variant="light" active>W</Button>
          <Button size="sm" variant="light" active>T</Button>
          <Button size="sm" variant="light" active>F</Button>
          <Button size="sm" variant="light" active>S</Button>
        </ButtonGroup>
        {getWeeks(new Date(date))}
      </ButtonGroup>
      <Card.Footer>
        <h6>{radioValue}</h6>
        <ListGroup variant="flush">
          {getEvents(new Date(radioValue))}
        </ListGroup>
      </Card.Footer>
    </Card>
  );
};

MiniCalendar.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default MiniCalendar;
