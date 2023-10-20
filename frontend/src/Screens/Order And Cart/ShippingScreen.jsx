import { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { saveShippingAddress } from "../../slices/cartSlice";
import CheckOutSteps from "../../components/CheckOutSteps.jsx";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [name, setName] = useState(shippingAddress?.name || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [contact, setContact] = useState(shippingAddress?.contact || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ name, address, city, postalCode, contact }));
    navigate("/payment");
  };

  return (
    <>
      <FormContainer>
        <CheckOutSteps value={1} />
      </FormContainer>

      <MDBContainer style={{ maxWidth: "1100px" }}>
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol>
            <MDBCard className="my-4 shadow-3">
              <MDBRow className="g-0">
                <MDBCol xl="6" className="d-xl-block bg-image">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp"
                    alt="Sample photo"
                    fluid
                  />
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                  >
                    <div className="justify-content-center align-items-center h-100">
                      <div
                        className="text-center"
                        style={{ marginTop: "220px" }}
                      >
                        <MDBIcon fas icon="truck text-white" size="3x" />

                        <p className="text-white mb-0"></p>

                        <figure className="text-center mb-0">
                          <blockquote className="blockquote text-white">
                            <p className="pb-3">
                              <span className="lead font-italic">
                                Medicine at your doorstep.
                              </span>
                            </p>
                          </blockquote>
                        </figure>
                      </div>
                    </div>
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <MDBCardBody className="p-md-5 text-black">
                    <MDBTypography tag="h3" className="mb-4 text-uppercase">
                      Shipping Info
                    </MDBTypography>
                    <div className="text-center">
                      <MDBRow>
                        <MDBCol md="6" className="mb-4">
                          <MDBInput
                            label="Full Name"
                            type="text"
                            size="lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="12" className="mb-1.8">
                          <MDBInput
                            label="Address"
                            type="text"
                            className="mb-4"
                            size="lg"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md="6" className="mb-4">
                          <Form.Control
                            class="form-control select-input placeholder-active active"
                            type="text"
                            as="select"
                            placeholder="Select City"
                            size="lg"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          >
                            <option className="d-none" value="">
                              Select City
                            </option>
                            {[
                              "Dhaka",
                              "Sylhet",
                              "Chattogram",
                              "Khulna",
                              "Rajshahi",
                              "Barisal",
                              "Rangpur",
                              "Mymensingh",
                            ].map((option) => (
                              <option key={option}> {option}</option>
                            ))}
                          </Form.Control>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6" className="mb-1.8">
                          <MDBInput
                            label="Postal Code"
                            type="text"
                            className="mb-4"
                            size="lg"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6" className="mb-4">
                          <MDBInput
                            label="Contact Number"
                            type="text"
                            className="mb-4"
                            size="lg"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <MDBBtn
                        size="lg"
                        className="ms-2"
                        style={{ backgroundColor: "hsl(210, 100%, 50%)" }}
                        onClick={submitHandler}
                      >
                        Continue
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default ShippingScreen;
