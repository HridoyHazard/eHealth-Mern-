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

const BloodScreenDetails = () => {
  const [blood, setBlood] = useState([]);

  const { id: bloodId } = useParams();

  useEffect(() => {
    const fetchBlood = async () => {
      const { data } = await axios.get(`/api/bloods/${bloodId}`);
      setBlood(data);
    };
    fetchBlood();
  }, []);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={blood.image} alt={blood.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{blood.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>{blood.group}</strong>
            </ListGroup.Item>
            <ListGroupItem>
              <strong>{blood.age}</strong>
            </ListGroupItem>
            <ListGroupItem>
              <strong>{blood.address}</strong>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default BloodScreenDetails;
