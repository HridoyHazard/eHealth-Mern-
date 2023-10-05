import { Col, Row } from "react-bootstrap";
import Medicine from "../../components/Medicine";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetMedicinesQuery } from "../../slices/medsApiSlice";

const MedicineScreen = () => {
  const { data: meds, isLoading, error } = useGetMedicinesQuery();
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
        <h2 className="text-center mt-4">Latest Medicine</h2>
          <div className="d-flex justify-content-center row mb-4">
            {meds.map((med) => (
              <Medicine med={med} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MedicineScreen;
