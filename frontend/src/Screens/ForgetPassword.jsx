import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForgetPasswordMutation } from "../slices/usersApiSlice";
import { Box } from "@material-ui/core";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [resetEmail, { isLoading }] = useForgetPasswordMutation();
  const [email, setEmail] = useState("");

  const submitHandler = async () => {
    await resetEmail({ email: email });
    toast.success("Email Sent Successfully");
  };

  return (
    <>
      {/* <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h4>Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Send
            </button>
          </form>
        </div>
      </div> */}
      <MDBContainer className="py-5 mt-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center h-80">
          <MDBCol lg="8" className="mb-4 mb-lg-0">
            <MDBCard
              className="mb-3 align-items-center"
              style={{ borderRadius: ".5rem" }}
            >
              <MDBCardBody>
                <FaLock style={{ width: "16rem", height: "12rem" }} />
                <h2 class="text-center">Forgot Password?</h2>
                <p>You can reset your password here.</p>

                <Form onSubmit={submitHandler}>
                  <Form.Group className="my-2" controlId="email">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <span className="fa fa-envelope"></span>
                        </span>
                      </div>
                      <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        class="form-control"
                        name="email"
                        placeholder="Email Address"
                        required="required"
                      ></Form.Control>
                    </div>
                  </Form.Group>
                  <div className="text-center">
                    <Box
                      textAlign="center"
                      marginTop="1.5rem"
                      marginBottom="1.5rem"
                    >
                      <Button
                        disabled={isLoading}
                        type="submit"
                        color="primary"
                        variant="primary"
                      >
                        Send
                      </Button>
                    </Box>
                  </div>
                </Form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default ForgetPassword;
