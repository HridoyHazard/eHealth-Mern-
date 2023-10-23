import React, { useEffect, useState } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaCheckCircle, FaTimes } from "react-icons/fa";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {
  useGetMyOrdersQuery,
} from "../slices/ordersApiSlice";
import {
  useGetMyAppointmentsQuery,
} from "../slices/appointmentsApiSlice";
import {
  useGetMyRequestsQuery,
} from "../slices/requestbloodSlice";

const MyProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const {
    data: appointments,
    isAppointmentLoading,
    Appointmenterror,
  } = useGetMyAppointmentsQuery();

  const {
    data: requests,
    isRequestLoading,
    Requesterror,
  } = useGetMyRequestsQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  console.log(requests);
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row className="py-5">
      <Col md={2}>
        <MDBCard
          className="d-flex justify-content-center align-items-center"
          style={{ borderRadius: "15px" }}
        >
          <MDBCardBody>
            <h2 className="text-center pt-2">{userInfo.name} Profile</h2>

            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="text-center">
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form.Group>
              {loadingUpdateProfile && <Loader />}
            </Form>
          </MDBCardBody>
        </MDBCard>
      </Col>

      <Col md={9}>
        <MDBCard>
          <MDBCardBody>
            <h2 className="text-center">My Orders</h2>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : (
              <Table striped hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <>
                            <div>
                              {" "}
                              <FaCheck style={{ color: "green" }} />
                            </div>
                            <div>{order.paidAt.substring(0, 10)}</div>
                          </>
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <>
                            <div>
                              {" "}
                              <FaCheckCircle style={{ color: "green" }} />
                            </div>
                            <div>{order.deliveredAt.substring(0, 10)}</div>
                          </>
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <>
              <h2 className="text-center mt-4">My Appointments</h2>
              {isAppointmentLoading ? (
                <Loader />
              ) : Appointmenterror ? (
                <Message variant="danger">
                  {Appointmenterror?.data?.message || Appointmenterror.error}
                </Message>
              ) : (
                <Table striped hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>Doctor Name</th>
                      <th>Chamber</th>
                      <th>Approved</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments?.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>{appointment._id}</td>
                        <td>{appointment.createdAt.substring(0, 10)}</td>
                        <td>
                          {appointment.appointmentItems.map((items) => (
                            <div>{items.name}</div>
                          ))}
                        </td>
                        <td>
                          {appointment.appointmentItems.map((items) => (
                            <div>{items.chamber}</div>
                          ))}
                        </td>
                        <td>
                          {appointment.isApproved ? (
                            <>
                              <div>
                                {" "}
                                <FaCheckCircle style={{ color: "green" }} />
                              </div>
                              <div>
                                {appointment.ApprovedAt.substring(0, 10)}
                              </div>
                            </>
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/appointment/${appointment._id}`}>
                            <Button className="btn-sm" variant="light">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
            <>
              <h2 className="text-center mt-4">My Blood Requests</h2>
              {isRequestLoading ? (
                <Loader />
              ) : Requesterror ? (
                <Message variant="danger">
                  {Requesterror?.data?.message || Requesterror.error}
                </Message>
              ) : (
                <Table striped hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>Patient Name</th>
                      <th>Blood Group</th>
                      <th>Hospital</th>
                      <th>Approved</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests?.map((request) => (
                      <tr key={request._id}>
                        <td>{request._id}</td>
                        <td>{request.createdAt.substring(0, 10)}</td>
                        <td>
                          {request.requestItems.map((items) => (
                            <div>{items.name}</div>
                          ))}
                        </td>
                        <td>
                          {request.requestItems.map((items) => (
                            <div>{items.group}</div>
                          ))}
                        </td>
                        <td>
                          {request.requestItems.map((items) => (
                            <div>{items.hospital}</div>
                          ))}
                        </td>
                        <td>
                          {request.isApproved ? (
                            <>
                              <div>
                                {" "}
                                <FaCheckCircle style={{ color: "green" }} />
                              </div>
                              <div>{request.ApprovedAt.substring(0, 10)}</div>
                            </>
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/request/${request._id}`}>
                            <Button className="btn-sm" variant="light">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          </MDBCardBody>
        </MDBCard>
      </Col>
    </Row>
  );
};

export default MyProfileScreen;
