import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
} from "../../slices/doctorsApiSlice";
import { useNavigate } from "react-router-dom";
import { MDBCard } from "mdb-react-ui-kit";
import Swal from "sweetalert2";

const DoctorListScreen = () => {
  const { data: doctors, isLoading, error, refetch } = useGetDoctorsQuery();

  const navigate = useNavigate();

  const [createDoctor, { isLoading: loadingCreate }] =
    useCreateDoctorMutation();

  const [deleteDoctor, { isLoading: loadingDelete }] =
    useDeleteDoctorMutation();

  const createDoctorHandler = () => {
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
          const doctor = await createDoctor();
          navigate(`/admin/doctor/${doctor.data._id}/create`);
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
          await deleteDoctor(id);
          toast.success("Doctor Deleted");
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
          <h1>Doctors</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createDoctorHandler}>
            <FaPlus /> Create Doctor
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
                  <th>Degree</th>
                  <th>Specialist</th>
                  <th>Chamber</th>
                  <th>Available</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor._id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.degree}</td>
                    <td>{doctor.specialist}</td>
                    <td>{doctor.chamber}</td>
                    <td>{doctor.available}</td>
                    <td>
                      <LinkContainer to={`/admin/doctor/${doctor._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit style={{ color: "green" }} />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(doctor._id)}
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

export default DoctorListScreen;
