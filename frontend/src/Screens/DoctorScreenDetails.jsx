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
import { useEffect, useState } from "react";
import axios from "axios";

const MedicineScreenDetails = () => {
  const [doctor, setDoctor] = useState([]);

  const { id: doctorId } = useParams();

  useEffect(() => {
    const fetchDoctor = async () => {
      const { data } = await axios.get(`/api/doctors/${doctorId}`);
      setDoctor(data);
    };
    fetchDoctor();
  }, []);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
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
  );
};

export default MedicineScreenDetails;
