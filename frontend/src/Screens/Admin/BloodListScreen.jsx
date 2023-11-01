import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetBloodsQuery,
  useCreateBloodMutation,
  useDeleteBloodMutation,
} from "../../slices/bloodsApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MDBCard } from "mdb-react-ui-kit";

const BloodListScreen = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetBloodsQuery({ keyword });

  console.log(data);

  const [createBlood, { isLoading: loadingCreate }] = useCreateBloodMutation();

  const [deleteBlood, { isLoading: loadingDelete }] = useDeleteBloodMutation();

  const createBloodHandler = () => {
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
          const blood = await createBlood();
          navigate(`/admin/blood/${blood.data._id}/create`);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    });
  };

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
          await deleteBlood(id);
          toast.success("Donor Deleted");
          refetch();
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
          <h1>Donors</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createBloodHandler}>
            <FaPlus /> Create Donor
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
                  <th>Group</th>
                  <th>Last Donate</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.bloods.map((blood) => (
                  <tr key={blood._id}>
                    <td>{blood._id}</td>
                    <td>{blood.name}</td>
                    <td>{blood.group}</td>
                    <td>{blood.lastdonate}</td>
                    <td>{blood.age}</td>
                    <td>{blood.address}</td>
                    <td>{blood.contact}</td>
                    <td>
                      <LinkContainer to={`/admin/blood/${blood._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit style={{ color: "green" }} />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(blood._id)}
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

export default BloodListScreen;
