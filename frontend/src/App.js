import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-0">
          <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
