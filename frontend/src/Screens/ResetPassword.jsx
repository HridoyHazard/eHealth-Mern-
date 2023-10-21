import React, { useState } from "react";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { id, token } = useParams();

  const [updatePassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async () => {
    await updatePassword({
      password: password,
      id: id,
      token: token,
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h4>Update Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;
