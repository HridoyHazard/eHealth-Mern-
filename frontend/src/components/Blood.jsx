import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blood = ({ blood }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/blood/${blood._id}`}>
        <Card.Img src={blood.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/blood/${blood._id}`}>
          <Card.Title as="div" className="doctor-title">
            <strong>{blood.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <strong>{blood.group}</strong>
        </Card.Text>

        <Card.Text as="h3">{blood.age}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Blood;
