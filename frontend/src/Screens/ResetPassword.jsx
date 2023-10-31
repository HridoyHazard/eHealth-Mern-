import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Form, Button } from "react-bootstrap";
import { Box } from "@material-ui/core";
import { FaKey } from "react-icons/fa";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const [updatePassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePassword({
        password: password,
        id: id,
        token: token,
      }).unwrap();
      setPassword("");
      toast.success("Password Updated Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2300);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div style={{ minHeight: "770px", backgroundColor: "#172b4d" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center h-80">
          <MDBCol lg="8" className="mb-4 mb-lg-0 mt-5">
            <MDBCard
              className="mb-3 align-items-center"
              style={{ borderRadius: ".5rem" }}
            >
              <MDBCardBody>
                <FaKey style={{ width: "16rem", height: "12rem" }} />
                <h2 class="text-center">Change password</h2>
                <p>You can change your password here.</p>

                <Form onSubmit={submitHandler}>
                  <Form.Group className="my-2" controlId="password">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <span className="fa fa-lock"></span>
                        </span>
                      </div>
                      <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        class="form-control"
                        name="password"
                        placeholder="Enter New Password"
                        required="required"
                      ></Form.Control>
                    </div>
                  </Form.Group>
                  {password.length > 3 ? (
                    <p className="text-muted font-bold">
                      password strength:{" "}
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    </p>
                  ) : password.length > 0 ? (
                    <p className="text-muted font-bold">
                      password strength:{" "}
                      <span className="text-danger font-weight-700">
                        too weak
                      </span>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="text-center">
                    <Box
                      textAlign="center"
                      marginTop="1.5rem"
                      marginBottom="1.5rem"
                    >
                      <Button type="submit" color="primary" variant="primary">
                        Change Password
                      </Button>
                    </Box>
                  </div>
                </Form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ResetPassword;
