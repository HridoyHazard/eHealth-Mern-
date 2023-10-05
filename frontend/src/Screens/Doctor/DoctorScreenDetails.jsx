import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ListGroupItem,
  ListGroup,
  Col,
  Row,
  Card,
  Button,
  Image,
} from "react-bootstrap";
import { useGetDoctorDetailsQuery } from "../../slices/doctorsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToChoice } from "../../slices/choiceSlice";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

const MedicineScreenDetails = () => {
  const { id: doctorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: doctor, isLoading, error } = useGetDoctorDetailsQuery(doctorId);

  const appointmentHandler = () => {
    // navigate(`/login?redirect=/doctor/${doctorId}/appointment`);
    dispatch(addToChoice({ ...doctor }));
    navigate(`/appointmentdate`);
  };

  const chatHandler = () => {
    navigate(`/login?redirect=/doctor/${doctorId}/chat`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/Doctor">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Container>
            <Row>
              <Col md={3}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.9436812455024!2d91.85047709678955!3d24.899902600000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37505536be64db9b%3A0x2c59a9310eef1711!2sMedinova%20Medical%20Services%20Ltd.!5e0!3m2!1sen!2sbd!4v1696529349591!5m2!1sen!2sbd"
                  width="580"
                  height="400"
                  style={{ border: "0" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </Col>
              <Col md={3} style={{ marginLeft: "16rem" }}>
                <ListGroup
                  variant="flush"
                  className="h-100 d-flex align-items-center justify-content-center"
                >
                  <h3>{doctor.name}</h3> <span>({doctor.specialist})</span>
                  <strong>{doctor.degree}</strong>
                  <strong>{doctor.chamber}</strong>
                  <strong>{doctor.specialist}</strong>
                  <strong>{doctor.available}</strong>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={300}
                  className="mb-3"
                />
                <div style={{ marginLeft: "4rem" }}>
                  <ListGroup.Item className="mb-3">
                    <Button
                      className="btn-block"
                      type="button"
                      onClick={appointmentHandler}
                    >
                      Get Appoinment
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item className="mx-5">
                    <Button
                      className="btn-block"
                      type="button"
                      onClick={chatHandler}
                    >
                      Chat
                    </Button>
                  </ListGroup.Item>
                </div>
              </Col>

              {/* <Col md={3}>
                
              </Col> */}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default MedicineScreenDetails;
