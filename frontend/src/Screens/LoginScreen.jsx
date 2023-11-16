import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import images01 from "../images/loginCover.jpg";

import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { Grid, Box } from "@material-ui/core";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      className="drow"
      style={{ minHeight: "864px", backgroundColor: "#172b4d" }}
    >
      <Grid style={{ paddingTop: "100px" }}>
        <div className="login container mt-8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card login2 border-0 mb-0">
                <div className="card-headerbg-transparent">
                  <div className="text-center mt-2 mb-3">
                    <img
                      src={images01}
                      alt=""
                      width={400}
                      style={{
                        borderRadius: "10px 10px 10px 10px",
                        paddingTop: "2.5rem",
                      }}
                    />
                  </div>
                </div>
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>sign in with credentials</small>
                  </div>
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="email">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <span className="fa fa-user"></span>
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
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        for=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
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
                          Sign in
                        </Button>
                      </Box>
                    </div>
                    {isLoading && <Loader />}
                  </Form>
                </div>
              </div>
              <div className="text-light text-center">
                Are You New User?{" "}
                <Link
                  className="text-light"
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register here
                </Link>
              </div>
              <div className="text-light text-center">
                <Link
                  className="text-light"
                  to={
                    redirect
                      ? `/forgetpassword?redirect=${redirect}`
                      : "/forgetpassword"
                  }
                >
                  Forget Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default LoginScreen;
