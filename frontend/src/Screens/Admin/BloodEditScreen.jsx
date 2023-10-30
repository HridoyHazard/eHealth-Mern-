import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import "../../assets/styles/bloodedit.css";
import {
  useGetBloodDetailsQuery,
  useUpdateBloodMutation,
} from "../../slices/bloodsApiSlice";
import { useUploadImageMutation } from "../../slices/uploadApiSlice";

const BloodEditScreen = () => {
  const { id: bloodId } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [group, setGroup] = useState("");
  const [lastdonate, setLastdonate] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const {
    data: blood,
    isLoading,
    error,
    refetch,
  } = useGetBloodDetailsQuery(bloodId);

  const [updateBlood, { isLoading: loadingUpdate }] = useUpdateBloodMutation();

  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateBlood({
        bloodId,
        name,
        image,
        group,
        lastdonate,
        age,
        address,
        contact,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Blood updated");
      refetch();
      navigate("/admin/bloodlist");
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
    if (blood) {
      setName(blood.name);
      setImage(blood.image);
      setGroup(blood.group);
      setLastdonate(blood.lastdonate);
      setAge(blood.age);
      setAddress(blood.address);
      setContact(blood.contact);
    }
  }, [blood]);

  return (
    <>
      <Link to="/admin/bloodlist" className="btn btn-dark mx-3 my-3">
        Go Back
      </Link>
      <div className="d-flex justify-content-center">
        <div className="BloodEditCard mb-5">
          <div className="BloodBx">
            <h1>Edit Donor</h1>
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
                    placeholder="Enter image url"
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
                  <Form.Label>Group</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="lastdonate" className="mb-2">
                  <Form.Label>lastdonate</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Donation "
                    value={lastdonate}
                    onChange={(e) => setLastdonate(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="age" className="mb-2">
                  <Form.Label>age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter category"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="address" className="mb-2">
                  <Form.Label>address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="contact" className="mb-2">
                  <Form.Label>contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
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

export default BloodEditScreen;
