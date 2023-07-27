import { Col, Row } from "react-bootstrap";
import meds from "../meds";
import Medicine from "../components/Medicine";

const MedicineScreen = () => {
  return (
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
  );
};

export default MedicineScreen;
