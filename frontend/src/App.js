import { Container } from "react-bootstrap";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import HomeScreen from "./Screens/HomeScreen.jsx";
import MedicineScreen from "./Screens/MedicineScreen.jsx";
import DoctorScreen from "./Screens/DoctorScreen.jsx";
import BloodScreen from "./Screens/BloodScreen.jsx";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <MedicineScreen />
          <DoctorScreen />
          <BloodScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
