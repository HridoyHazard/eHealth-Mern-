import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../slices/cartSlice";
import FormContainer from "../../components/FormContainer";
import CheckOutSteps from "../../components/CheckOutSteps.jsx";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckOutSteps value={2} />
      <h1 className="text-center">Payment Method</h1>
      <MDBCard className="my-4 shadow-3">
        <MDBCardBody className="text-black d-flex align-items-center justify-content-center">
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
              <Col>
                <Form.Check
                  className="my-2"
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  required
                  name="paymentMethod"
                  value="PayPal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                  className="my-2"
                  type="radio"
                  label="AamarPay"
                  id="PayPal"
                  required
                  name="paymentMethod"
                  value="AamarPay"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>

            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </MDBCardBody>
      </MDBCard>
    </FormContainer>
  );
};

export default PaymentScreen;
