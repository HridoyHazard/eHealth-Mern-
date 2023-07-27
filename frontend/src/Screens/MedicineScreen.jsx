import { Col, Row } from "react-bootstrap";
import meds from "../meds";

const MedicineScreen = () => {
  return (
    <>
      <h1>Latest Medicine</h1>
      <Row>
        {meds.map((med) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3>{med.name}</h3>
            <h3>{med.brand}</h3>
            <h3>{med.price}</h3>
            <h3>{med.category}</h3>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MedicineScreen;
