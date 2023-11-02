import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useUpdateMedicineMutation,
  useGetMedicineDetailsQuery,
} from "../../slices/medsApiSlice";
import { useUploadImageMutation } from "../../slices/uploadApiSlice";
import "../../assets/styles/medicineedit.css";

const MedicineEditScreen = () => {
  const { id: medId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: med,
    isLoading,
    error,
    refetch,
  } = useGetMedicineDetailsQuery(medId);

  const [updateMedicine, { isLoading: loadingUpdate }] =
    useUpdateMedicineMutation();

  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateMedicine({
        medId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Product updated");
      refetch();
      navigate("/admin/medicinelist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (med) {
      setName(med.name);
      setPrice(med.price);
      setImage(med.image);
      setBrand(med.brand);
      setCategory(med.category);
      setCountInStock(med.countInStock);
      setDescription(med.description);
    }
  }, [med]);

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

  return (
    <>
      <Link to="/admin/medicinelist" className="btn btn-dark mx-3 my-3">
        Go Back
      </Link>
      <div className="d-flex justify-content-center">
        <div className="MedicineEditCard mb-5">
          <div className="MedicineBx">
            <h1>Edit Medicine</h1>
            {loadingUpdate && <Loader />}
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error.data.message}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="image">
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

                <Form.Group controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="countInStock">
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter countInStock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  
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

export default MedicineEditScreen;
