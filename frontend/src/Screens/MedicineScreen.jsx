import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Medicine from "../components/Medicine";
import axios from "axios"

const MedicineScreen = () => {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    const fetchMeds = async () => {
      const { data } = await axios.get(`/api/meds`);
      setMeds(data);
    };
    fetchMeds();
  }, []);
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
