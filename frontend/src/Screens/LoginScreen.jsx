import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
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
    // <section className="login">
    //   <Container className="mt-5">
    //     <FormContainer>
    //       <h1>Sign In</h1>

    //       <Form onSubmit={submitHandler}>
    //         <Form.Group className="my-2" controlId="email">
    //           <Form.Label>Email Address</Form.Label>
    //           <Form.Control
    //             type="email"
    //             placeholder="Enter email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           ></Form.Control>
    //         </Form.Group>

    //         <Form.Group className="my-2" controlId="password">
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control
    //             type="password"
    //             placeholder="Enter password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           ></Form.Control>
    //         </Form.Group>

    //         <Button disabled={isLoading} type="submit" variant="primary">
    //           Sign In
    //         </Button>

    //         {isLoading && <Loader />}
    //       </Form>

    //       <Row className="py-3">
    //         <Col>
    //           New Customer?{" "}
    //           <Link
    //             to={redirect ? `/register?redirect=${redirect}` : "/register"}
    //           >
    //             Register
    //           </Link>
    //         </Col>
    //       </Row>
    //     </FormContainer>
    //   </Container>
    // </section>
    <div
      className="drow"
      style={{ minHeight: "864px", backgroundColor: "#172b4d" }}
    >
      <Grid style={{ paddingTop: "100px" }}>
        <div className="login container mt-8 pb-5">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <img
                src={images01}
                alt=""
                width={600}
                style={{ borderRadius: "30px", paddingTop: "10px" }}
              />
            </div>
            <div className="col-lg-5 col-md-7">
              <div className="card login2 border-0 mb-0">
                <div className="card-header bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-3">
                    <small>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Box component="span">
                      <Button
                        // onClick={handleSignIn}
                        className="materialButton"
                      >
                        <Box component="span" marginRight="4px">
                          {/* <FaGoogle></FaGoogle> */}
                        </Box>

                        <Box component="span" marginLeft=".75rem">
                          <strong>GOOGLE</strong>
                        </Box>
                      </Button>

                      <Button className="materialButton">
                        <Box component="span" style={{ paddingRight: "4px" }}>
                          {/* <FaFacebookF></FaFacebookF> */}
                        </Box>
                        <Box component="span" marginLeft=".75rem">
                          <strong>Facebook</strong>
                        </Box>
                      </Button>
                    </Box>
                  </div>
                </div>
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="email">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend pt-1">
                          <span className="input-group-text">
                            <span className="fa fa-user"></span>
                          </span>
                        </div>
                        <Form.Control
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          name="email"
                          required="required"
                        ></Form.Control>
                      </div>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="password">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend pt-1">
                          <span className="input-group-text">
                            <i className="fa fa-lock"></i>
                          </span>
                        </div>
                        <Form.Control
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Enter Password"
                          required="required"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
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
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default LoginScreen;
