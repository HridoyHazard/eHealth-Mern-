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
      <Link className="btn btn-dark mx-3 my-3" to="/Doctor">
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
            <Row className="mt-5">
              <Col md={3} style={{ marginRight: "5rem" }}>
                <h2>Chamber Location</h2>
                {doctor.tag === "medinova" ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.9436812455024!2d91.85047709678955!3d24.899902600000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37505536be64db9b%3A0x2c59a9310eef1711!2sMedinova%20Medical%20Services%20Ltd.!5e0!3m2!1sen!2sbd!4v1696529349591!5m2!1sen!2sbd"
                    width="560"
                    height="400"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : doctor.tag === "alharamain" ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.2656612348183!2d91.87714957614342!3d24.888918344116885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751ab2d9985f76f%3A0x5f56b6ff53d48aa6!2sAl%20Haramain%20Hospital%20Private%20Limited!5e0!3m2!1sen!2sbd!4v1696599668456!5m2!1sen!2sbd"
                    width="560"
                    height="400"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : doctor.tag === "mount" ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14474.635500511367!2d91.8250547871582!3d24.90961490000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37505544775d6bf9%3A0xcec939c657524489!2sMount%20Adora%20Hospital%2C%20Akhalia!5e0!3m2!1sen!2sbd!4v1696599743395!5m2!1sen!2sbd"
                    width="560"
                    height="400"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : doctor.tag === "popular" ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.960001635034!2d91.85485847614359!3d24.89934594369903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375055315d7dbd0d%3A0x495d54cee9ae255f!2sPopular%20Medical%20Center%20Ltd!5e0!3m2!1sen!2sbd!4v1696599792099!5m2!1sen!2sbd"
                    width="560"
                    height="400"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  doctor.tag === "njl" && (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.9621682546117!2d91.85397057614365!3d24.899272043702044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750553151a3098b%3A0xb240d877fdcc954!2sHearing%20Centre%20NJL!5e0!3m2!1sen!2sbd!4v1696601309438!5m2!1sen!2sbd"
                      width="560"
                      height="400"
                      style={{ border: "0" }}
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  )
                )}
              </Col>
              <Col md={4} style={{ marginLeft: "8rem" }}>
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
