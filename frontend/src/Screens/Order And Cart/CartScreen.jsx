import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Message from "../../components/Message";
import { addToCart, removeFromCart,savePromo } from "../../slices/cartSlice";
import Loader from "../../components/Loader";
import { useState } from "react";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [promo, setPromo] = useState("");

  const cart = useSelector((state) => state.cart);
  const { cartItems, isLoading, error } = cart;

  const addToCartHandler = (med, qty) => {
    dispatch(addToCart({ ...med, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    dispatch(savePromo( promo ));
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <section style={{ backgroundColor: "#eee", height: "50rem" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol size="12">
                <MDBCard
                  className="card-registration card-registration-2"
                  style={{ borderRadius: "15px" }}
                >
                  <MDBCardBody className="p-0">
                    <MDBRow className="g-0">
                      <MDBCol lg="8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <MDBTypography
                              tag="h1"
                              className="fw-bold mb-0 text-black"
                            >
                              Shopping Cart
                            </MDBTypography>
                            <MDBTypography className="mb-0 text-muted">
                              {cartItems.reduce(
                                (acc, item) => acc + item.qty,
                                0
                              )}{" "}
                              items
                            </MDBTypography>
                          </div>

                          <hr className="my-4" />

                          {cartItems.map((item) => (
                            <MDBRow
                              key={item._id}
                              className="mb-4 d-flex justify-content-between align-items-center"
                            >
                              <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage
                                  src={item.image}
                                  fluid
                                  className="rounded-3"
                                  alt="Sample photo"
                                />
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography
                                  tag="h6"
                                  className="text-black mb-0"
                                >
                                  {item.name}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol
                                md="3"
                                lg="3"
                                xl="3"
                                className="d-flex align-items-center"
                              >
                                <Form.Control
                                  as="select"
                                  value={item.qty}
                                  onChange={(e) =>
                                    addToCartHandler(
                                      item,
                                      Number(e.target.value)
                                    )
                                  }
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" className="mb-0">
                                  {item.price}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <MDBBtn
                                  color="link"
                                  className="px-2"
                                  onClick={() =>
                                    removeFromCartHandler(item._id)
                                  }
                                >
                                  <MDBIcon fas icon="times" />
                                </MDBBtn>
                              </MDBCol>
                            </MDBRow>
                          ))}

                          <hr className="my-4" />

                          <div className="pt-5">
                            <MDBTypography tag="h6" className="mb-0">
                              <MDBCardText
                                tag="a"
                                href="#!"
                                className="text-body"
                              >
                                <MDBIcon fas icon="long-arrow-alt-left me-2" />{" "}
                                <Link to="/Medicine">Back to Medicine</Link>
                              </MDBCardText>
                            </MDBTypography>
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol lg="4" className="bg-grey">
                        <div className="p-5">
                          <MDBTypography
                            tag="h3"
                            className="fw-bold mb-5 mt-2 pt-1"
                          >
                            Summary
                          </MDBTypography>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between mb-4">
                            <MDBTypography tag="h5" className="text-uppercase">
                              items (
                              {cartItems.reduce(
                                (acc, item) => acc + item.qty,
                                0
                              )}
                              )
                            </MDBTypography>
                            <MDBTypography tag="h5">
                              {" "}
                              ৳
                              {cartItems
                                .reduce(
                                  (acc, item) => acc + item.qty * item.price,
                                  0
                                )
                                .toFixed(2)}
                            </MDBTypography>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <MDBTypography
                              tag="h5"
                              className="text-uppercase mb-3"
                            >
                              Shipping
                            </MDBTypography>

                            <MDBTypography tag="h5">
                              {cart.shippingPrice}
                            </MDBTypography>
                          </div>

                          <MDBTypography
                            tag="h5"
                            className="text-uppercase mb-3"
                          >
                            Promo code
                          </MDBTypography>

                          <div className="mb-5">
                            <MDBInput
                              size="lg"
                              label="Enter your code"
                              type="text"
                              required
                              value={promo}
                              onChange={(e) => setPromo(e.target.value)}
                            />
                          </div>

                          <hr className="my-4" />

                          <MDBBtn
                            color="dark"
                            block
                            size="lg"
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                          >
                            Proceed To Checkout
                          </MDBBtn>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      )}
    </>
  );
};

export default CartScreen;
