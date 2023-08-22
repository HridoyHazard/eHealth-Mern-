import { Col, Row } from "react-bootstrap";
import Medicine from "../components/Medicine";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetMedicinesQuery } from "../slices/medsApiSlice";

const MedicineScreen = () => {
  const { data: meds, isLoading, error } = useGetMedicinesQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Medicine</h1>
          <Row>
            {meds.map((med) => (
              <Col key={med._id} sm={12} md={6} lg={4} xl={3}>
                <Medicine med={med} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default MedicineScreen;
