import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import { MDBCardBody, MDBCard } from "mdb-react-ui-kit";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useMakePaymentMutation,
} from "../../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading: loadingOrder,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  const [makePayment, { isLoading: loadingPayment }] = useMakePaymentMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const paymentHandler = async () => {
    try {
      await makePayment({
        orderId,
      }).then((res) => {
        window.location.replace(res.data.payment_url);
        console.log(res.data.payment_url);
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
    toast.success("Delivered Successfull");
  };

  //For Paypal

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successfull");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  return loadingOrder ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <>
      <Container>
        {/* <h1>Order Id: {order._id}</h1> */}
        <MDBCard className="mb-5 mt-5">
          <MDBCardBody>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong> {order.shippingAddress.name}
                    </p>
                    <p>
                      <strong>Email: </strong>{" "}
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingAddress.address},
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.city}{" "}
                    </p>
                    <p>
                      <strong>Contact: </strong>
                      {order.shippingAddress.contact}
                    </p>
                    {order.isDelivered ? (
                      <Message variant="success">
                        Delivered on {order.deliveredAt.substr(0, 10)}
                      </Message>
                    ) : (
                      <Message variant="danger">Not Delivered</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Message variant="success">
                        Paid on {order.paidAt.substr(0, 10)}
                      </Message>
                    ) : (
                      <Message variant="danger">Not Paid</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (
                      <Message>Order is empty</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
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
                                <Link to={`/med/${item.med}`}>{item.name}</Link>
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
                        <Col>৳{order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>৳{order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>৳{order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    {!order.isPaid && !userInfo.isAdmin && (
                      <ListGroup.Item>
                        {order.paymentMethod === "PayPal" || order.paymentMethod == "Paypal" ? (
                          <>
                            {loadingPayPal && <Loader />}
                            {isPending && <Loader />}
                            <div>
                              <div>
                                <PayPalButtons
                                  createOrder={createOrder}
                                  onApprove={onApprove}
                                  onError={onError}
                                ></PayPalButtons>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                          <Button
                            type="button"
                            className="btn btn-danger btn-block text-capitalize fw-bold fs-5 p-3 text-black"
                            onClick={paymentHandler}
                          >
                            AamarPay
                          </Button>
                          {loadingPayment && <Loader />}
                          </>
                        )}
                      </ListGroup.Item>
                    )}

                    {loadingDeliver && <Loader />}

                    {userInfo &&
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <ListGroup.Item>
                          <Button
                            type="button"
                            className="btn btn-block"
                            onClick={deliverHandler}
                          >
                            Mark As Delivered
                          </Button>
                        </ListGroup.Item>
                      )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </MDBCardBody>
        </MDBCard>
      </Container>
    </>
  );
};

export default OrderScreen;
