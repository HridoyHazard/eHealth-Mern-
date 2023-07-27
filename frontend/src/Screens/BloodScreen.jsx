import { Col,Row } from 'react-bootstrap'
import bloods from '../bloods.js'

const BloodScreen = () => {
  return (
    <>
      <h1>Bloods List</h1>
      <Row>
        {bloods.map((blood) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3>{blood.name}</h3>
            <h3>{blood.group}</h3>
            <h3>{blood.age}</h3>
            <h3>{blood.address}</h3>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default BloodScreen
