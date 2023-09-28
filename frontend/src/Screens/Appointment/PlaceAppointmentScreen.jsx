import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useCreateAppointmentMutation } from "../../slices/appointmentsApiSlice";
import { cleardoctorInfo } from "../../slices/choiceSlice";
import AppointmentSteps from "../../components/AppointmentSteps";

const PlaceAppointmentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const choice = useSelector((state) => state.choice);

  const [createAppointment, { isLoading, error }] =
    useCreateAppointmentMutation();

  useEffect(() => {
    if (!choice.Address.address) {
      navigate("/appointmentaddress");
    }
  }, [choice.Address.address, navigate]);

  const placeAppointmentHandler = async () => {
    try {
      const res = await createAppointment({
        appointmentItems: choice.doctorInfo,
        address: choice.Address,
      }).unwrap();
      dispatch(cleardoctorInfo());
      navigate(`/appointment/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <AppointmentSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Patient Informations</h2>
              {choice.doctorInfo.length === 0 ? (
                <Message>Patient Information is empty</Message>
              ) : (
                <p>
                  <strong>Name: </strong>
                  {choice.Address.name}
                  <br></br>
                  <strong>Address: </strong>
                  {choice.Address.address}
                  <br></br>
                  <strong>Contact: </strong>
                  {choice.Address.contact}
                </p>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Doctor Information</h2>
              {choice.doctorInfo.length === 0 ? (
                <Message>Your Appointment is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {choice.doctorInfo.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/doctor/${item._id}`}>{item.name}</Link>
                        </Col>
                      </Row>
                      <br />
                      <p>
                        <strong>Specialist: </strong> {item.specialist}
                      </p>
                      <br />
                      <p>
                        <strong>Degree: </strong> {item.degree}
                      </p>
                      <br />
                      <p>
                        <strong>Chamber: </strong> {item.chamber}
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Appointment Summary</h2>
              </ListGroup.Item>
              <ListGroupItem>
                <Row>
                  <Col>Name</Col>
                  <Col>{choice.Address.name}</Col>
                </Row>
                <br />
                <Row>
                  <Col>Contact Info</Col>
                  <Col>{choice.Address.contact}</Col>
                </Row>
                <br />
                <Row>
                  <Col>Address</Col>
                  <Col>{choice.Address.address}</Col>
                </Row>
              </ListGroupItem>
              {choice.doctorInfo.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col>Chamber</Col>
                    <Col>{item.chamber}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Available</Col>
                    <Col>{item.available}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Specialist</Col>
                    <Col>{item.specialist}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
              {error && (
                <Message variant="danger">{error.data.message}</Message>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={choice.doctorInfo.length === 0}
                  onClick={placeAppointmentHandler}
                >
                  Place Appointment
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceAppointmentScreen;
