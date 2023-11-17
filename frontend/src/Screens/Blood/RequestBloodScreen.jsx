import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetRequestDetailsQuery,
  useApproveRequestMutation,
  useDonorNumberMutation,
  useGetRequestsQuery,
} from "../../slices/requestbloodSlice";
import { MDBInput } from "mdb-react-ui-kit";

const RequestBloodScreen = () => {
  const { id: requestId } = useParams();
  const [DonorNumber, setDonorNumber] = useState("");

  const [donorNumber, { isLoading: loadingNumber }] = useDonorNumberMutation();

  const {
    data: request,
    refetch,
    isLoading: loadingDonor,
    error,
  } = useGetRequestDetailsQuery(requestId);

  const [approveRequest, { isLoading: loadingRequest }] =
    useApproveRequestMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const approveAppointmentHandler = async () => {
    if (DonorNumber === "") {
      toast.error("Please Enter Donor Number");
      return;
    } else {
      if (DonorNumber.length < 11) {
        toast.error("Please Enter Valid Donor Number");
        return;
      } else {
        await donorNumber({ availableDonor: DonorNumber, id: requestId });
        await approveRequest(requestId);
        refetch();
        toast.success("Approved Successfull");
      }
    }
  };

  return loadingDonor ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <Container>
      {/* <p>Appointment Id: {request._id}</p> */}
      <Row>
        <Col md={3}></Col>
        <Col md={5} className="mt-5">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Request Summary</h2>
              </ListGroup.Item>
              {request.requestItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col>Name:</Col>
                    <Col>{item.name}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Age:</Col>
                    <Col>{item.age}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Blood Group:</Col>
                    <Col>{item.group}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Date:</Col>
                    <Col>{item.date.substring(0, 10)}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Unit:</Col>
                    <Col>{item.unit}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Contact Info</Col>
                    <Col>{item.contact}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Hospital Name</Col>
                    <Col>{item.hospital}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4} className="mt-5">
          <Card>
            <ListGroup variant="flush">
              {userInfo && userInfo.isAdmin && !request.isApproved && (
                <ListGroup.Item>
                  <MDBInput
                    wrapperClass="mb-3"
                    label="Available Donor Number"
                    size="lg"
                    id="form1"
                    type="text"
                    value={DonorNumber}
                    onChange={(e) => setDonorNumber(e.target.value)}
                  />
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={approveAppointmentHandler}
                  >
                    Mark As Approved
                  </Button>
                </ListGroup.Item>
              )}
              {loadingRequest && <Loader />}
              {loadingNumber && <Loader />}
            </ListGroup>
            <ListGroup>
              <ListGroup.Item>
                {request.isApproved ? (
                  <>
                    <Message variant="success">
                      Approved on {request.ApprovedAt.substr(0, 10)}
                    </Message>
                    {request.availableDonor.map((item, index) => (
                      <Message variant="success">
                        Available Donor Number: {item.number}
                      </Message>
                    ))}
                  </>
                ) : (
                  <Message variant="danger">Not Approved</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestBloodScreen;
