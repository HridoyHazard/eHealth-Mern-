import React from "react";
import { Link } from "react-router-dom";
import StepProgressBar from "react-step-progress";
import "../assets/styles/steps.css"

const CheckOutSteps = ({ value }) => {
  return (
    <StepProgressBar
      startingStep={value}
      steps={[
        {
          label: <Link to="/login">Login</Link>,
        },
        {
          label: <Link to="/shipping">Shipping</Link>,
        },
        {
          label: <Link  to="/payment">Payment</Link>,
        },
        {
          label: <Link to="/placeorder">Place Order</Link>,
        },
      ]}
    />
  );
};

export default CheckOutSteps;
