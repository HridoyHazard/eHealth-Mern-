import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "../src/assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import App from "./App";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

import MedicineScreen from "./Screens/Medicine/MedicineScreen";
import MedicineScreenDetails from "./Screens/Medicine/MedicineScreenDetails";

import DoctorScreen from "./Screens/Doctor/DoctorScreen";
import DoctorScreenDetails from "./Screens/Doctor/DoctorScreenDetails";

import BloodScreen from "./Screens/Blood/BloodScreen";
import BloodScreenDetails from "./Screens/Blood/BloodScreenDetails";
import BloodCreateScreen from "./Screens/Admin/BloodCreateScreen";
import RequestBlood from "./Screens/Blood/RequestBlood";
import RequestBloodScreen from "./Screens/Blood/RequestBloodScreen";
import RequestBloodListScreen from "./Screens/Admin/RequestBloodListScreen";

import ContactUS from "./Screens/ContactUS";
import AboutUs from "./Screens/AboutUs";
import Success from "./Screens/Success";
import Active from "./Screens/Active";

import CartScreen from "./Screens/Order And Cart/CartScreen";

import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";

import ShippingScreen from "./Screens/Order And Cart/ShippingScreen";
import PaymentScreen from "./Screens/Order And Cart/PaymentScreen";
import PlaceOrderScreen from "./Screens/Order And Cart/PlaceOrderScreen";
import OrderScreen from "./Screens/Order And Cart/OrderScreen";

import AppointmentScreen from "./Screens/Appointment/AppointmentScreen";
import AppointmentAddress from "./Screens/Appointment/AppointmentAddress";
import PlaceAppointmentScreen from "./Screens/Appointment/PlaceAppointmentScreen";
import AppointmentDate from "./Screens/Appointment/AppointmentDate";

import MyProfileScreen from "./Screens/MyProfileScreen";
import AdminProfile from "./Screens/Admin/AdminProfile";
import OrderListScreen from "./Screens/Admin/OrderListScreen";
//Medicine
import MedicineListScreen from "./Screens/Admin/MedicineListScreen";
import MedicineEditScreen from "./Screens/Admin/MedicineEditScreen";
import MedicineCreateScreen from "./Screens/Admin/MedicineCreateScreen";

import UserListScreen from "./Screens/Admin/UserListScreen";
import UserEditScreen from "./Screens/Admin/UserEditScreen";

import HomeScreen from "./Screens/HomeScreen";

import DoctorListScreen from "./Screens/Admin/DoctorListScreen";
import DoctorEditScreen from "./Screens/Admin/DoctorEditScreen";
import DoctorCreateScreen from "./Screens/Admin/DoctorCreateScreen";

import BloodListScreen from "./Screens/Admin/BloodListScreen";
import BloodEditScreen from "./Screens/Admin/BloodEditScreen";

import ChatScreen from "./Screens/ChatScreen";

import AppointmentListScreen from "./Screens/Admin/AppointmentListScreen";
import ForgetPassword from "./Screens/ForgetPassword";
import ResetPassword from "./Screens/ResetPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/Medicine" element={<MedicineScreen />} />
      <Route path="/med/:id" element={<MedicineScreenDetails />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen setAuthenticated={true} />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/Doctor" element={<DoctorScreen />} />
      <Route path="/doctor/:id" element={<DoctorScreenDetails />} />
      <Route path="/Blood" element={<BloodScreen />} />
      <Route path="/Contactus" element={<ContactUS />} />
      <Route path="/Aboutus" element={<AboutUs />} />
      <Route path="/Blood/search/:keyword" element={<BloodScreen />} />
      <Route path="/blood/:id" element={<BloodScreenDetails />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
      <Route path="/active/:token" element={<Active />} />
      //All Private Routes
      <Route path="" element={<PrivateRoute />}>
        <Route path="/success" element={<Success />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/placeappointment" element={<PlaceAppointmentScreen />} />
        <Route path="/appointmentaddress" element={<AppointmentAddress />} />
        <Route path="/appointmentdate" element={<AppointmentDate />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/myprofile" element={<MyProfileScreen />} />
        <Route path="/appointment/:id" element={<AppointmentScreen />} />
        <Route path="/requestblood" element={<RequestBlood />} />
        <Route path="/request/:id" element={<RequestBloodScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Route>
      //All Admin Routes
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route
          path="/admin/appointmentlist"
          element={<AppointmentListScreen />}
        />
        <Route path="/admin/requestlist" element={<RequestBloodListScreen />} />
        <Route path="/admin/medicinelist" element={<MedicineListScreen />} />
        <Route path="/admin/med/:id/edit" element={<MedicineEditScreen />} />
        <Route
          path="/admin/med/:id/create"
          element={<MedicineCreateScreen />}
        />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/doctorlist" element={<DoctorListScreen />} />
        <Route path="/admin/doctor/:id/edit" element={<DoctorEditScreen />} />
        <Route
          path="/admin/doctor/:id/create"
          element={<DoctorCreateScreen />}
        />
        <Route path="/admin/bloodlist" element={<BloodListScreen />} />
        <Route path="/admin/blood/:id/edit" element={<BloodEditScreen />} />
        <Route path="/admin/blood/:id/create" element={<BloodCreateScreen />} />
        <Route path="/admin/chat" element={<ChatScreen />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  // </React.StrictMode>
);
reportWebVitals();
