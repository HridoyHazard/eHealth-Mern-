import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert, Row, Col } from "react-bootstrap";
import { FaTimes, FaCheckCircle, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetAppointmentsQuery } from "../../slices/appointmentsApiSlice";
import { MDBCard } from "mdb-react-ui-kit";

const AppointmentListScreen = () => {
  const { data: appointments, isLoading, error } = useGetAppointmentsQuery();

  return (
    <>
      <Row className="align-items-center my-5 mx-3">
        <Col>
          <h1>Appointments</h1>
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
              {appointments?.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment._id}</td>
                  <td>{appointment.user && appointment.user.name}</td>
                  <td>{appointment.createdAt.substring(0, 10)}</td>
                  <td>
                    {appointment.isApproved ? (
                      <>
                        <div>
                          {" "}
                          <FaCheckCircle style={{ color: "green" }} />
                        </div>
                        <div>{appointment.ApprovedAt.substring(0, 10)}</div>
                      </>
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/appointment/${appointment._id}`}>
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

export default AppointmentListScreen;
