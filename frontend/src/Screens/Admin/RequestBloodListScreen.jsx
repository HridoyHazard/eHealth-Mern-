import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert, Row, Col } from "react-bootstrap";
import { FaTimes, FaCheckCircle, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetRequestsQuery } from "../../slices/requestbloodSlice.js";
import { MDBCard } from "mdb-react-ui-kit";

const RequestBloodListScreen = () => {
  const { data: requests, isLoading, error } = useGetRequestsQuery();

  return (
    <>
      <Row className="align-items-center my-5 mx-3">
        <Col>
          <h1>Blood Request</h1>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <MDBCard className="mx-4">
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>APPROVED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((request) => (
                <tr key={request._id}>
                  <td>{request._id}</td>
                  <td>{request.user && request.user.name}</td>
                  <td>{request.createdAt.substring(0, 10)}</td>
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
                      <Button variant="warning" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </MDBCard>
      )}
    </>
  );
};

export default RequestBloodListScreen;
