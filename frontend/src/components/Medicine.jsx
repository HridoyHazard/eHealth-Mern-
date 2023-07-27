import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Medicine = ({ med }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/med/${med._id}`}>
        <Card.Img src={med.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/med/${med._id}`}>
          <Card.Title as='div' className='med-title'>
            <strong>{med.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={med.rating}
            text={`${med.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${med.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Medicine;