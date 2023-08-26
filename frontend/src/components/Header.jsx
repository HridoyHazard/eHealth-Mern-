import React from "react";
import { Navbar, Nav, NavDropdown, Container,Badge } from "react-bootstrap";
import { FaUser, FaCapsules, FaStethoscope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    console.log("logout successfull");
  };
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">eHealth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/Medicine">
                <Nav.Link>
                  <FaCapsules /> Medicine
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Doctor">
                <Nav.Link>
                  <FaStethoscope /> Doctor
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                      <NavDropdown.Item>
                        Cart
                        {cartItems.length > 0 && (
                          <Badge
                            pill
                            bg="success"
                            style={{ marginLeft: "5px" }}
                          >
                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                          </Badge>
                        )}
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
