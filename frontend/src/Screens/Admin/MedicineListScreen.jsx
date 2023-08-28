import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetMedicinesQuery,
  useCreateMedicineMutation,
} from "../../slices/medsApiSlice";

const MedicineListScreen = () => {
  const { data: meds, isLoading, error, refetch } = useGetMedicinesQuery();

  const [createMedicine, { isLoading: loadingCreate }] =
    useCreateMedicineMutation();
  console.log(meds);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      console.log("delete", id);
    }
  };

  const createMedicineHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createMedicine();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createMedicineHandler}>
            <FaPlus /> Create Medicine
          </Button>
        </Col>
      </Row>
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {meds.map((med) => (
                <tr key={med._id}>
                  <td>{med._id}</td>
                  <td>{med.name}</td>
                  <td>${med.price}</td>
                  <td>{med.category}</td>
                  <td>{med.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/med/${med._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit style={{ color: "green" }} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(med._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default MedicineListScreen;
