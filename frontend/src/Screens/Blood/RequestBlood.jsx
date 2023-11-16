import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Form, Button } from "react-bootstrap";
import { useCreateRequestMutation } from "../../slices/requestbloodSlice";
import images1 from "../../images/BloodDonation/bloodrequest.jpeg";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const RequestBlood = () => {
  const navigate = useNavigate();

  const [createRequest, { isLoading, error }] = useCreateRequestMutation();

  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Date, setDate] = useState("");
  const [Group, setGroup] = useState("");
  const [Contact, setContact] = useState("");
  const [Unit, setUnit] = useState("");
  const [Hospital, setHospital] = useState("");
  const today = new window.Date().toISOString().split("T")[0];

  const resetbutton = () => {
    setName("");
    setAge("");
    setDate("");
    setGroup("");
    setContact("");
    setUnit("");
    setHospital("");
  };

  const submitbutton = async () => {
    if (!Name || !Age || !Date || !Group || !Contact || !Unit || !Hospital) {
      toast.warning("Please fill all the fields");
      return;
    } else {
      try {
        const res = await createRequest({
          requestItems: [
            {
              name: Name,
              age: Age,
              date: Date,
              group: Group,
              contact: Contact,
              unit: Unit,
              hospital: Hospital,
            },
          ],
        }).unwrap();
        resetbutton();
        navigate(`/request/${res._id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <MDBContainer style={{ maxWidth: "1100px" }}>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard className="my-4 shadow-3">
            <MDBRow className="g-0">
              <MDBCol xl="6" className="d-xl-block bg-image">
                <MDBCardImage
                  src={images1}
                  alt="Sample photo"
                  className="rounded-start"
                  fluid
                />
              </MDBCol>

              <MDBCol md="4">
                <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                  <h3 className="mb-5 text-uppercase fw-bold">
                    Blood Request Form
                  </h3>

                  <MDBRow>
                    <MDBCol md="8" className="mb-1.8">
                      <MDBInput
                        wrapperClass="mb-3"
                        label="Patient Full Name"
                        size="lg"
                        id="form1"
                        type="text"
                        required
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="6" className="mb-1.8">
                      <MDBInput
                        className="mb-3"
                        label="Age"
                        size="lg"
                        id="form3"
                        required
                        type="text"
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="6" className="mb-1.8">
                      <MDBInput
                        className="mb-3"
                        label="Date"
                        size="lg"
                        id="form3"
                        required
                        type="date"
                        min={today}
                        value={Date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="9" className="mb-3">
                      <Form.Control
                        class="form-control select-input placeholder-active active"
                        as="select"
                        size="lg"
                        type="text"
                        wrapperClass="mb-3"
                        required
                        value={Group}
                        onChange={(e) => setGroup(e.target.value)}
                      >
                        <option className="d-none" value="">
                          Select Blood Group
                        </option>
                        {["A+", "A-", "AB+", "B+", "B-", "AB-", "O+", "O-"].map(
                          (option) => (
                            <option key={option}> {option}</option>
                          )
                        )}
                      </Form.Control>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="9" className="mb-1.8">
                      <MDBInput
                        wrapperClass="mb-3"
                        label="Contact Info"
                        size="lg"
                        id="form4"
                        type="text"
                        required
                        value={Contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="9" className="mb-1.8">
                      <MDBInput
                        wrapperClass="mb-3"
                        label="How Many Unit?"
                        size="lg"
                        id="form5"
                        type="text"
                        required
                        value={Unit}
                        onChange={(e) => setUnit(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="9" className="mb-1.8">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Hospital Name"
                        size="lg"
                        id="form6"
                        type="text"
                        required
                        value={Hospital}
                        onChange={(e) => setHospital(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <div className="d-flex justify-content-end pt-3">
                    <MDBBtn color="light" size="lg" onClick={resetbutton}>
                      Reset all
                    </MDBBtn>
                    <MDBBtn
                      className="ms-2"
                      color="warning"
                      size="lg"
                      onClick={submitbutton}
                    >
                      Submit form
                    </MDBBtn>
                    {isLoading && <Loader />}
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RequestBlood;
