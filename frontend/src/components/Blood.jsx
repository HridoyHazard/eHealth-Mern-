import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/blood.css";

const Blood = ({ blood }) => {
  return (
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
