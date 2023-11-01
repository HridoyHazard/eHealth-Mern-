import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetDoctorDetailsQuery,
  useUpdateDoctorMutation,
} from "../../slices/doctorsApiSlice";
import { useUploadImageMutation } from "../../slices/uploadApiSlice";
import "../../assets/styles/doctoredit.css";

const DoctorEditScreen = () => {
  const { id: doctorId } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [degree, setDegree] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [chamber, setChamber] = useState("");
  const [tag, setTag] = useState("");
  const [available, setAvailable] = useState("");

  const {
    data: doctor,
    isLoading,
    error,
    refetch,
  } = useGetDoctorDetailsQuery(doctorId);

  const [updateDoctor, { isLoading: loadingUpdate }] =
    useUpdateDoctorMutation();

  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(tag);
    try {
      await updateDoctor({
        doctorId,
        name,
        image,
        degree,
        specialist,
        chamber,
        tag,
        available,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Doctor updated");
      refetch();
      navigate("/admin/doctorlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (doctor) {
      setName(doctor.name);
      setImage(doctor.image);
      setDegree(doctor.degree);
      setSpecialist(doctor.specialist);
      setChamber(doctor.chamber);
      console.log(doctor.chamber)
      setTag(doctor.tag);
      console.log(doctor.tag)
      setAvailable(doctor.available);
    }
  }, [doctor]);

  return (
    <>
      <Link to="/admin/doctorlist" className="btn btn-dark mx-3 my-3">
        Go Back
      </Link>
      <div className="d-flex justify-content-center">
        <div className="DoctorEditCard mb-5">
          <div className="DoctorBx">
            <h1>Edit Doctor</h1>
            {loadingUpdate && <Loader />}
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error.data.message}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="image" className="mb-2">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    label="Choose File"
                    onChange={uploadFileHandler}
                    type="file"
                  ></Form.Control>
                  {loadingUpload && <Loader />}
                </Form.Group>

                <Form.Group controlId="degree" className="mb-2">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="specialist" className="mb-2">
                  <Form.Label>Specialist</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Specialist"
                    value={specialist}
                    onChange={(e) => setSpecialist(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="chamber" className="mb-2">
                  <Form.Label>Chamber</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Chamber"
                    value={chamber}
                    onChange={(e) => setChamber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="tag" className="mb-2">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="available" className="mb-2">
                  <Form.Label>Available</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Available"
                    value={available}
                    onChange={(e) => setAvailable(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  style={{ marginTop: "1rem", marginLeft: "6rem" }}
                >
                  Update
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorEditScreen;
