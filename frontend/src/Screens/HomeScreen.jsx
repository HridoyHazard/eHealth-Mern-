import React from "react";
import MakeAppointment from "../components/MakeAppointment";
import Service from "../components/Service";
import Counter from "../components/Counter";
import Heading from "../components/Heading";
import Features from "../components/Features";
import Testimonial from "../components/Testimonial";

const HomeScreen = () => {
  return (
    <>
      <Heading />
      <Features />
      <MakeAppointment />
      <Service />
      <Counter />
      <Testimonial />
    </>
  );
};

export default HomeScreen;
