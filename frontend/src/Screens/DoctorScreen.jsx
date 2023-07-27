import { Col, Row } from "react-bootstrap";
import doctors from "../doctors.js"

const DoctorScreen = () => {
  return (
    <>
      <h1>All Doctor</h1>
      <Row>
        {doctors.map((doctor) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3>{doctor.name}</h3>
            <h3>{doctor.degree}</h3>
            <h3>{doctor.specialist}</h3>
            <h3>{doctor.chamber}</h3>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default DoctorScreen
