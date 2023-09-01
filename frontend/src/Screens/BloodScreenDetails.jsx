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
import { useGetBloodDetailsQuery } from "../slices/bloodsApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const BloodScreenDetails = () => {
  const { id: bloodId } = useParams();

  const { data: blood, isLoading, error } = useGetBloodDetailsQuery(bloodId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/Blood">
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
      )}
    </>
  );
};

export default BloodScreenDetails;
