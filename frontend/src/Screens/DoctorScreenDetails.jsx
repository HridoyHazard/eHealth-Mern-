import { Link, useParams } from "react-router-dom";
import {
  ListGroupItem,
  ListGroup,
  Col,
  Row,
  Card,
  Button,
  Image,
} from "react-bootstrap";
import { useGetDoctorDetailsQuery } from "../slices/doctorsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const MedicineScreenDetails = () => {
  const { id: doctorId } = useParams();

  const { data: doctor, isLoading, error } = useGetDoctorDetailsQuery(doctorId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/Doctor">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={doctor.image} alt={doctor.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{doctor.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>{doctor.degree}</strong>
                </ListGroup.Item>
                <ListGroupItem>
                  <strong>{doctor.chamber}</strong>
                </ListGroupItem>
                <ListGroupItem>
                  <strong>{doctor.specialist}</strong>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Button className="btn-block" type="button">
                      Get Appoinment
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button className="btn-block" type="button">
                      Chat
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default MedicineScreenDetails;
