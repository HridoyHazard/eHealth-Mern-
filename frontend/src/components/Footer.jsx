import React from "react";
import { CDBSidebarFooter, CDBLink, CDBBox, CDBBtn, CDBIcon } from "cdbreact";
import logo from "../images/ehealth.svg";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <CDBSidebarFooter
      className="shadow"
      style={{
        background:
          "linear-gradient(170deg, rgb(0, 198, 167), rgb(30, 77, 146))",
      }}
    >
      <CDBBox
        display="flex"
        flex="column"
        className="mx-auto py-5"
        style={{ width: "80%" }}
      >
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              <img alt="logo" src={logo} width="30px" /> eHealth
            </p>

            <p className="my-3" style={{ width: "250px" }}>
              We are creating High Quality Resources and tools to Aid developers
              during the developement of their projects
            </p>
            <CDBBox display="flex" className="mt-4">
              <CDBBtn flat color="dark">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3">
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              eHealth
            </p>
            <CDBBox flex="column" style={{ cursor: "pointer", padding: "0" }}>
              <CDBLink href="/">Resources</CDBLink>
              <CDBLink href="/">About Us</CDBLink>
              <CDBLink href="/">Contact</CDBLink>
              <CDBLink href="/">Blog</CDBLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Help
            </p>
            <CDBBox flex="column" style={{ cursor: "pointer", padding: "0" }}>
              <CDBLink href="/">Support</CDBLink>
              <CDBLink href="/">Sign Up</CDBLink>
              <CDBLink href="/">Sign In</CDBLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Service
            </p>
            <CDBBox flex="column" style={{ cursor: "pointer", padding: "0" }}>
              <CDBLink href="/">Medicine</CDBLink>
              <CDBLink href="/">Doctor</CDBLink>
              <CDBLink href="/">Blood</CDBLink>
            </CDBBox>
          </CDBBox>
        </CDBBox>
        <small className="text-center mt-5">
          &copy; eHealth @ {currentYear} All rights reserved.
        </small>
      </CDBBox>
    </CDBSidebarFooter>
  );
};

export default Footer;
