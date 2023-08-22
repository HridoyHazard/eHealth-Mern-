import { Col, Row } from "react-bootstrap";
import Medicine from "../components/Medicine";
import { useGetMedicinesQuery } from "../slices/medsApiSlice";

const MedicineScreen = () => {
  const { data: meds, isLoading, error } = useGetMedicinesQuery();
  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
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
