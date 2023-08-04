import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Doctor from "../components/Doctor";

const DoctorScreen = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(`/api/doctors`);
      setDoctors(data);
    };

    fetchDoctors();
  }, []);
  return (
    <>
      <h1>All Doctor</h1>
      <Row>
        {doctors.map((doctor) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DoctorScreen;
