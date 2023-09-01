import { Col, Row } from "react-bootstrap";
import Doctor from "../components/Doctor";
import { useGetDoctorsQuery } from "../slices/doctorsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const DoctorScreen = () => {
  const { data: doctors, isLoading, error } = useGetDoctorsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>All Doctor</h1>
          <Row>
            {doctors.map((doctor) => (
              <Col key={doctor._id} sm={12} md={6} lg={4} xl={3}>
                <Doctor doctor={doctor} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default DoctorScreen;
