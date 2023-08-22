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
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetMedicineDetailsQuery } from "../slices/medsApiSlice";

const MedicineScreenDetails = () => {
  const { id: medId } = useParams();
  const { data: med, isLoading, error } = useGetMedicineDetailsQuery(medId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={med.image} alt={med.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{med.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={med.rating}
                    text={`${med.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroupItem>
                  <strong>${med.price}</strong>
                </ListGroupItem>
                <ListGroupItem>
                  <strong>{med.description}</strong>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {med.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={med.countInStock === 0}
                    >
                      Add To Cart
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
