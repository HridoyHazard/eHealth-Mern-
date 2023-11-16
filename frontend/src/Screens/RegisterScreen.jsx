import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/signup.css";
import Loader from "../components/Loader";

import { Grid } from "@material-ui/core";

import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        // dispatch(setCredentials({ ...res }));
        // navigate(redirect);
        toast.success("Account created successfully");
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
        
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div style={{ minHeight: "864px", backgroundColor: "#172b4d" }}>
      <Grid style={{ paddingTop: "75px" }}>
        <div className="login container mt-8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="login2 signup-form">
                <Form onSubmit={submitHandler}>
                  <h2>Sign Up</h2>
                  <p>Please fill in this form to create an account!</p>
                  <hr />

                  <Form.Group className="my-2" controlId="name">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <span className="fa fa-user"></span>
                        </span>
                      </div>
                      <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                        name="user_name"
                        placeholder="User Name"
                        required="required"
                      ></Form.Control>
                    </div>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="email">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="fa fa-paper-plane"></i>
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

                  <Form.Group className="my-2" controlId="password">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock"></i>
                        </span>
                      </div>
                      <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        required="required"
                      ></Form.Control>
                    </div>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="confirmPassword">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock"></i>
                        </span>
                      </div>
                      <Form.Control
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        name="cppassword"
                        placeholder="Confrim Password"
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

                  <Form.Group className="my-2" controlId="terms">
                    <label class="form-check-label">
                      <input type="checkbox" required="required" /> I accept the{" "}
                      <Link to="/login">Terms of Use</Link> &amp;{" "}
                      <Link to="/login">Privacy Policy</Link>
                    </label>
                  </Form.Group>
                  <Form.Group>
                    <div className="col text-center">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-info btn-lg"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form.Group>
                  {isLoading && <Loader />}
                </Form>

                <div className="text-light text-center">
                  Already have an account?{" "}
                  <Link
                    className="text-light"
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Login here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default RegisterScreen;
