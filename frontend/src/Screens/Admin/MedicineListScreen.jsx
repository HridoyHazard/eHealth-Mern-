import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetMedicinesQuery,
  useCreateMedicineMutation,
  useDeleteMedicineMutation,
} from "../../slices/medsApiSlice";
import { MDBCard } from "mdb-react-ui-kit";
import Swal from "sweetalert2";

const MedicineListScreen = () => {
  const navigate = useNavigate();
  const { data: meds, isLoading, error, refetch } = useGetMedicinesQuery();

  const [createMedicine, { isLoading: loadingCreate }] =
    useCreateMedicineMutation();

  const [deleteMedicine, { isLoading: loadingDelete }] =
    useDeleteMedicineMutation();

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMedicine(id);
          toast.success("Medicine Deleted");
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    });
  };

  const createMedicineHandler = async () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const medicine = await createMedicine();
          navigate(`/admin/med/${medicine.data._id}/create`);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    });
  };

  return (
    <>
      <Row className="align-items-center my-5 mx-3">
        <Col>
          <h1>Medicines</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createMedicineHandler}>
            <FaPlus /> Create Medicine
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <MDBCard className="mx-4">
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
                    <td>৳{med.price}</td>
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
          </MDBCard>
        </>
      )}
    </>
  );
};

export default MedicineListScreen;
