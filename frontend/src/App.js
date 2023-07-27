import { Container } from "react-bootstrap";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Hello</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
