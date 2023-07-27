import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser, FaCapsules, FaStethoscope } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/Login">
                <FaUser /> Sign In
              </Nav.Link>
              <Nav.Link href="/Medicine">
                <FaCapsules /> Medicine
              </Nav.Link>
              <Nav.Link href="/Doctor">
                <FaStethoscope /> Doctor
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
