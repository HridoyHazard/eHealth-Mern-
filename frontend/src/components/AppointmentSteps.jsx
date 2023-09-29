import React from "react";
import { Link } from "react-router-dom";
import StepProgressBar from "react-step-progress";
import "../assets/styles/steps.css";

const AppointmentSteps = ({ steps }) => {
  return (
    <StepProgressBar
      startingStep={steps}
      steps={[
        {
          label: <Link to="/login">Login</Link>,
        },
        {
          label: <Link to="/appointmentdate">Date & Time</Link>,
        },
        {
          label: <Link to="/appointmentaddress">Patient Info</Link>,
        },
        {
          label: <Link to="/placeappointment">Place Appointment</Link>,
        },
      ]}
    />
  );
};

export default AppointmentSteps;
