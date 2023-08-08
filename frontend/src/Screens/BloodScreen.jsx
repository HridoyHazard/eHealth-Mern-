import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Blood from "../components/Blood";
import axios from "axios";

const BloodScreen = () => {
  const [bloods, setBloods] = useState([]);

  useEffect(() => {
    const fetchBloods = async () => {
      const { data } = await axios.get(`/api/bloods`);
      setBloods(data);
    };

    fetchBloods();
  }, []);
  return (
    <>
      <h1>Bloods List</h1>
      <Row>
        {bloods.map((blood) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Blood blood={blood} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BloodScreen;
