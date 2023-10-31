import { Link, useParams } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useGetBloodDetailsQuery } from "../../slices/bloodsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const BloodScreenDetails = () => {
  const { id: bloodId } = useParams();

  const { data: blood, isLoading, error } = useGetBloodDetailsQuery(bloodId);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        // vh-100
        <section style={{ backgroundColor: "#f4f5f7", height: "50rem" }}>
          <Link className="btn btn-dark mx-3 my-3" to="/Blood">
            Go Back
          </Link>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-80">
              <MDBCol lg="10" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                  <MDBRow className="g-0">
                    <MDBCol
                      md="4"
                      className="gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                      }}
                    >
                      <MDBCardImage
                        src={blood.image}
                        alt="Avatar"
                        className="my-0"
                        style={{ width: "100%", height: "100%" }}
                        fluid
                      />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">
                          Donor Information
                        </MDBTypography>
                        <hr className="mt-0 mb-1" />
                        <MDBRow className="pt-0">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6" className="mb-2">
                              Name
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {blood.name}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6" className="mb-2">
                              Phone
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {blood.contact}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6" className="mb-2">
                              Blood Group
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {blood.group}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6" className="mb-2">
                              Age
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {blood.age}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6" className="mb-2">
                              Last Donation
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {blood.lastdonate}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6" className="mb-2">
                              Address
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {blood.address}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>

                        <div className="d-flex justify-content-end">
                          <a href="#!">
                            <MDBIcon fab icon="facebook me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="twitter me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="instagram me-3" size="lg" />
                          </a>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      )}
    </>
  );
};

export default BloodScreenDetails;
