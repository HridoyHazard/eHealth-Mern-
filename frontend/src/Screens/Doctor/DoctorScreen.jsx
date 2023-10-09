import { Col, Row } from "react-bootstrap";
import Doctor from "../../components/Doctor";
import { useGetDoctorsQuery } from "../../slices/doctorsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import "../../assets/styles/doctor.css";

const DoctorScreen = () => {
  const { data: doctors, isLoading, error } = useGetDoctorsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <section id="ourdoctor">
            <div className="doctor_container my-3 py-5 text-center">
              <div className="row  mb-3">
                <div className="col">
                  <h1 className="doctorh1">All Doctors</h1>
                </div>
              </div>
              <div className="row">
                {doctors.map((doctor) => {
                  return <Doctor key={doctor._id} doctor={doctor}></Doctor>;
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default DoctorScreen;
