import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert, Row, Col } from "react-bootstrap";
import { FaTimes, FaCheckCircle, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { MDBCard } from "mdb-react-ui-kit";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <Row className="align-items-center my-5 mx-3">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <MDBCard className="mx-4">
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <>
                        <div>
                          {" "}
                          <FaCheck style={{ color: "green" }} />
                        </div>
                        <div>{order.paidAt.substring(0, 10)}</div>
                      </>
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <>
                        <div>
                          {" "}
                          <FaCheckCircle style={{ color: "green" }} />
                        </div>
                        <div>{order.deliveredAt.substring(0, 10)}</div>
                      </>
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="warning" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </MDBCard>
      )}
    </>
  );
};

export default OrderListScreen;
