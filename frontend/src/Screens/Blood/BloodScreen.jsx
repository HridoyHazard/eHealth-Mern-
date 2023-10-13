import Blood from "../../components/Blood";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetBloodsQuery } from "../../slices/bloodsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import FormContainer from "../../components/FormContainer";
import { ListGroup, Button, Col } from "react-bootstrap";

const BloodScreen = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const { data, isLoading, error } = useGetBloodsQuery({ keyword });

  const DonorPage = () => {
    navigate("/requestblood");
  }


  return (
    <>
      <h1 className="text-center mb-5"></h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <FormContainer>
            <Col className="float-start" style={{marginLeft:"-30rem"}}>
              <Button className="btn-block" type="button" onClick={DonorPage}>
                Request Blood
              </Button>
            </Col>
            <Col>
              <SearchBox />
            </Col>
          </FormContainer>
          <div className="d-flex justify-content-center row mb-4">
            {data.bloods.length > 0 &&
              data.bloods.map((blood) => <Blood blood={blood} />)}
          </div>
        </>
      )}
    </>
  );
};

export default BloodScreen;
