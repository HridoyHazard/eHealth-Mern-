import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";


const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
