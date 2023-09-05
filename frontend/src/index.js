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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
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
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import OrderListScreen from "./Screens/Admin/OrderListScreen";
import MedicineListScreen from "./Screens/Admin/MedicineListScreen";
import MedicineEditScreen from "./Screens/Admin/MedicineEditScreen";
import UserListScreen from "./Screens/Admin/UserListScreen";
import UserEditScreen from "./Screens/Admin/UserEditScreen";
import HomeScreen from "./Screens/HomeScreen";
import DoctorListScreen from "./Screens/Admin/DoctorListScreen";
import DoctorEditScreen from "./Screens/Admin/DoctorEditScreen";
import BloodListScreen from "./Screens/Admin/BloodListScreen";
import BloodEditScreen from "./Screens/Admin/BloodEditScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/Medicine" element={<MedicineScreen />} />
      <Route path="/med/:id" element={<MedicineScreenDetails />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/Doctor" element={<DoctorScreen />} />
      <Route path="/doctor/:id" element={<DoctorScreenDetails />} />
      <Route path="/Blood" element={<BloodScreen />} />
      <Route path="/Blood/search/:keyword" element={<BloodScreen />} />
      <Route path="/blood/:id" element={<BloodScreenDetails />} />
      //All Private Routes
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      //All Admin Routes
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/medicinelist" element={<MedicineListScreen />} />
        <Route path="/admin/med/:id/edit" element={<MedicineEditScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/doctorlist" element={<DoctorListScreen />} />
        <Route path="/admin/doctor/:id/edit" element={<DoctorEditScreen />} />
        <Route path="/admin/bloodlist" element={<BloodListScreen />} />
        <Route path="/admin/blood/:id/edit" element={<BloodEditScreen />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
