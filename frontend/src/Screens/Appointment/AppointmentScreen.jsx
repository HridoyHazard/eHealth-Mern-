import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetAppointmentDetailsQuery,
  useApproveAppointmentMutation,
} from "../../slices/appointmentsApiSlice";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

const AppointmentScreen = () => {
  const { id: appointmentId } = useParams();

  const {
    data: appointment,
    refetch,
    isLoading : loadingAppointment,
    error,
  } = useGetAppointmentDetailsQuery(appointmentId);

  const [approveAppointment, { isLoading: loadingApprove }] =
    useApproveAppointmentMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const approveAppointmentHandler = async () => {
    await approveAppointment(appointmentId);
    refetch();
    toast.success("Approved Successfull");
  };
  return loadingAppointment ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <>
      <Container>
        <MDBCard className="mt-5 mb-5">
          <MDBCardBody>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Address</h2>
                    <p>
                      <strong>Name: </strong> {appointment.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong>{" "}
                      <a href={`mailto:${appointment.user.email}`}>
                        {appointment.user.email}
                      </a>
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {appointment.address.address},
                    </p>
                    <p>
                      <strong>Contact: </strong>
                      {appointment.address.contact}
                    </p>
                    {appointment.isApproved ? (
                      <Message variant="success">
                        Approved on {appointment.ApprovedAt.substr(0, 10)}
                      </Message>
                    ) : (
                      <Message variant="danger">Not Approved</Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup.Item>
                  <h2>Doctor Info</h2>
                  {appointment.appointmentItems.length === 0 ? (
                    <Message>No Doctor Selected</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {appointment.appointmentItems.map((item, index) => (
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
                              <Link to={`/doctor/${item.doctor}`}>
                                {item.name}
                              </Link>
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
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Appointment Summary</h2>
                    </ListGroup.Item>
                    {appointment.appointmentItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col>Name</Col>
                          <Col>{item.name}</Col>
                        </Row>
                        <br />
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
                        <br />
                        <Row>
                          <Col>Appointment ID</Col>
                          <Col>{appointment._id}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}

                    {loadingApprove && <Loader />}

                    {userInfo &&
                      userInfo.isAdmin &&
                      !appointment.isApproved && (
                        <ListGroup.Item>
                          <Button
                            type="button"
                            className="btn btn-block"
                            onClick={approveAppointmentHandler}
                          >
                            Mark As Approved
                          </Button>
                        </ListGroup.Item>
                      )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </MDBCardBody>
        </MDBCard>
      </Container>
    </>
  );
};

export default AppointmentScreen;
