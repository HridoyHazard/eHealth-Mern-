import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../src/assets/styles/medicine.css";
import Rating from "./Rating";

const Medicine = ({ med }) => {
  return (
    // <Card className='my-3 p-3 rounded'>
    //   <Link to={`/med/${med._id}`}>
    //     <Card.Img src={med.image} variant='top' />
    //   </Link>

    //   <Card.Body>
    //     <Link to={`/med/${med._id}`}>
    //       <Card.Title as='div' className='med-title'>
    //         <strong>{med.name}</strong>
    //       </Card.Title>
    //     </Link>

    //     <Card.Text as='div'>
    //       <Rating
    //         value={med.rating}
    //         text={`${med.numReviews} reviews`}
    //       />
    //     </Card.Text>

    //     <Card.Text as='h3'>৳{med.price}</Card.Text>
    //   </Card.Body>
    // </Card>
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
            <span className="text-danger">{med.price}</span>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
