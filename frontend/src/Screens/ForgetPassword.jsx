import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBTypography,
  MDBCardText,
  MDBIcon,
} from "mdb-react-ui-kit";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../slices/usersApiSlice";

const ForgetPassword = () => {
  const [resetEmail, { isLoading }] = useForgetPasswordMutation();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await resetEmail({ email: email });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
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
      </div>
    </>
  );
};

export default ForgetPassword;
