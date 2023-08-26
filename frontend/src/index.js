import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import PrivateRoute from "./components/PrivateRoute";
import MedicineScreen from "./Screens/MedicineScreen";
import MedicineScreenDetails from "./Screens/MedicineScreenDetails";
import DoctorScreen from "./Screens/DoctorScreen";
import DoctorScreenDetails from "./Screens/DoctorScreenDetails";
import BloodScreen from "./Screens/BloodScreen";
import BloodScreenDetails from "./Screens/BloodScreenDetails";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<MedicineScreen />} />
      <Route path="/med/:id" element={<MedicineScreenDetails />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/Doctor" element={<DoctorScreen />} />
      <Route path="/doctor/:id" element={<DoctorScreenDetails />} />
      <Route path="/Blood" element={<BloodScreen />} />
      <Route path="/blood/:id" element={<BloodScreenDetails />} />

      //All Private Routes
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
