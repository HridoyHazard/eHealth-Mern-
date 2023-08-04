import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Doctor = ({ doctor }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/doctor/${doctor._id}`}>
        <Card.Img src={doctor.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/doctor/${doctor._id}`}>
          <Card.Title as='div' className='doctor-title'>
            <strong>{doctor.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
        <strong>{doctor.degree}</strong>
        </Card.Text>

        <Card.Text as='h3'>${doctor.specialist}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Doctor;