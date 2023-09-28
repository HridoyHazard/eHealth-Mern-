import React, { useState } from "react";
import AppointmentSteps from "../../components/AppointmentSteps";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveAddress } from "../../slices/choiceSlice";
import FormContainer from "../../components/FormContainer";

const AppointmentAddress = () => {
  const choice = useSelector((state) => state.choice);
  const { Address } = choice;

  const [name, setName] = useState(Address.name || "");
  const [address, setAddress] = useState(Address.address || "");
  const [contact, setContact] = useState(Address.contact || "");

  const nagivate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveAddress({ address, name, contact }));
    nagivate("/placeappointment");
  };
  return (
    <FormContainer>
      <AppointmentSteps step1 step2 />
      <h1>Patient Info</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="contact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter contact"
            value={contact}
            required
            onChange={(e) => setContact(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AppointmentAddress;
