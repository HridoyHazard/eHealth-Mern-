import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/blood.css";

const Blood = ({ blood }) => {
  return (
    // <Card className="my-3 p-3 rounded">
    //   <Link to={`/blood/${blood._id}`}>
    //     <Card.Img src={blood.image} variant="top" />
    //   </Link>

    //   <Card.Body>
    //     <Link to={`/blood/${blood._id}`}>
    //       <Card.Title as="div" className="doctor-title">
    //         <strong>{blood.name}</strong>
    //       </Card.Title>
    //     </Link>

    //     <Card.Text as="div">
    //       <strong>{blood.group}</strong>
    //     </Card.Text>

    //     <Card.Text as="h3">{blood.age}</Card.Text>
    //   </Card.Body>
    // </Card>
    <div className="mb-3 mx-4 bloodcard">
    <Link
      style={{ textDecoration: "none" }}
      className="imgBx"
      to={`/blood/${blood._id}`}
    >
      <img className="img-fluid" src={blood.image} />
    </Link>
    <div className="contentBx">
      <Link style={{ textDecoration: "none" }} to={`/blood/${blood._id}`}>
        <h5>{blood.name}</h5>
      </Link>
      <div className="group mt-2">
        <strong>
          <span className="text-danger">{blood.group}</span>
        </strong>
      </div>
      <div className="age">
        <strong>
          <span className="text-success text-center">{blood.age}</span>
        </strong>
      </div>
    </div>
  </div>
  );
};

export default Blood;
