import { Link } from "react-router-dom";
import "../../src/assets/styles/medicine.css";
import Rating from "./Rating";

const Medicine = ({ med }) => {
  return (
    <div className="mb-3 productcard">
      <Link
        style={{ textDecoration: "none" }}
        className="imgBx"
        to={`/med/${med._id}`}
      >
        <img className="img-fluid" src={med.image} />
      </Link>
      <div className="contentBx">
        <Link style={{ textDecoration: "none" }} to={`/med/${med._id}`}>
          <h5>{med.name}</h5>
        </Link>
        <Rating value={med.rating} text={`${med.numReviews} reviews`} />
        <div className="price mt-2">
          <strong>
            <span className="text-danger">৳
            </span>
            {" "}{med.price}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
