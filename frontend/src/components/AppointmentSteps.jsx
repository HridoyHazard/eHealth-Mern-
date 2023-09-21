import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AppointmentSteps = ({ step1, step2, step3 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/appointmentaddress'>
            <Nav.Link>Patient Info</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Patient Info</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/placeappointment'>
            <Nav.Link>Place Appointment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Appointment</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default AppointmentSteps;