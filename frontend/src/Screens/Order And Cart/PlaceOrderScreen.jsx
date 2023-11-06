import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
import { clearCartItems } from "../../slices/cartSlice";
import FormContainer from "../../components/FormContainer";
import CheckOutSteps from "../../components/CheckOutSteps.jsx";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  let updatedprice = cart.totalPrice;

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: updatedprice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <Container>
        <FormContainer>
          <CheckOutSteps value={3} />
        </FormContainer>

        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress.address},
                  {cart.shippingAddress.postalCode}, {cart.shippingAddress.city}{" "}
                  <br></br>
                  <strong>Contact: </strong>
                  {cart.shippingAddress.contact}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/med/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ৳{item.price} = ৳
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>৳{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>৳{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {cart.promo === "NewUser" ? (
                  updatedprice = updatedprice - 100,
                  <ListGroup.Item>
                    <Row>
                      <Col>Promo Off</Col>
                      <Col>৳100</Col>
                    </Row>
                  </ListGroup.Item>
                ) : null}

                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    {cart.promo === "NewUser" ? (
                      <Col>৳{updatedprice}</Col>
                    ) : (
                      <Col>৳{cart.totalPrice}</Col>
                    )}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && (
                    <Message variant="danger">{error.data.message}</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                  {isLoading && <Loader />}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
