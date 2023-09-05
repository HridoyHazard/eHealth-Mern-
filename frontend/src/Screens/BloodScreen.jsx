import { Col, Row } from "react-bootstrap";
import Blood from "../components/Blood";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetBloodsQuery } from "../slices/bloodsApiSlice";
import { useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";


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
          <Row>
            {data.bloods.length>0 && data.bloods.map((blood) => (
              <Col key={blood._id} sm={12} md={6} lg={4} xl={3}>
                <Blood blood={blood} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default BloodScreen;
