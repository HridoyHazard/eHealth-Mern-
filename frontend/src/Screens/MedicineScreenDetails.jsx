import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ListGroupItem,
  ListGroup,
  Col,
  Row,
  Card,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetMedicineDetailsQuery } from "../slices/medsApiSlice";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const MedicineScreenDetails = () => {
  const { id: medId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data: med, isLoading, error } = useGetMedicineDetailsQuery(medId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...med, qty }));
    navigate("/cart");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
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
                  {med.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(med.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={med.countInStock === 0}
                      onClick={addToCartHandler}
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
