import { Col, Row } from "react-bootstrap";
import Blood from "../../components/Blood";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetBloodsQuery } from "../../slices/bloodsApiSlice";
import { useParams } from "react-router-dom";
import SearchBox from "../../components/SearchBox";

const BloodScreen = () => {
  const { keyword } = useParams();

  const { data, isLoading, error } = useGetBloodsQuery({ keyword });

  return (
    <>
      <h1>Active Blood Donors</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <SearchBox />
          <div className="d-flex justify-content-around row">
            {data.bloods.length > 0 &&
              data.bloods.map((blood) => <Blood blood={blood} />)}
          </div>
        </>
      )}
    </>
  );
};

export default BloodScreen;
