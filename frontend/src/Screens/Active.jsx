import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useActiveUserMutation } from "../slices/usersApiSlice";

const Active = () => {
  const { token } = useParams();

  const [activeUser, { isLoading }] = useActiveUserMutation();

  useEffect(() => {
    if (token) {
      activeUser(token);
    }
  }, [activeUser, token]);

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
                <FaCheck style={{ width: "16rem", height: "12rem" }} />
                <h2 class="text-center">Your Account Verified</h2>
                <p className="text-center">You can login now.</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Active;
