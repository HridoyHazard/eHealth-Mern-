import React from "react";
import Carousel from "react-elastic-carousel";
import { Item } from "../utils/chat.styled.js";
import "../assets/styles/Service.css";
import images01 from "../images/homeService/001-dental.png";
import images02 from "../images/homeService/medicine symbol.jpg";
import images03 from "../images/homeService/cartoon_doctor_icon-removebg-preview.png";
import images04 from "../images/homeService/Drop of Blood.jpg";
import images05 from "../images/homeService/medical service robot.jpg";
import images06 from "../images/homeService/tooth (1).png";
import images07 from "../images/homeService/smoker lungs.jpg";
import images08 from "../images/homeService/pulse symbol icon.jpg";
import images09 from "../images/icon/lungs.png";
import images10 from "../images/icon/throat.png";
import images11 from "../images/icon/141-stomach.png";
import images12 from "../images/icon/surgery.png";
import images13 from "../images/icon/141-ambulance.png";
import images14 from "../images/icon/cardiology.png";
import images15 from "../images/icon/stethoscope.png";
import images16 from "../images/icon/surgeon (1).png";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];

const Service = () => {
  return (
    <div style={{ paddingLeft: "100px", paddingRight: "100px", paddingTop:"40px" }}>
      <h1 style={{ paddingTop: "30px", textAlign: "center" }}>
        Service We Provides
      </h1>
      <div className="service_container">
        <Carousel breakPoints={breakPoints}>
          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images09}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">Cardiology </h5>
              <p className="text-secondary">
                This department provides medical care to patients who have
                problems with their heart or circulation!
              </p>
            </div>
          </Item>
          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images01}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">Dentits Point</h5>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates, at!
              </p>
            </div>
          </Item>

          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images12}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">General surgery</h5>
              <p className="text-secondary">
                Covers a wide range of types of surgery and procedures on
                patients.!
              </p>
            </div>
          </Item>
          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images10}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">Ear nose and throat (ENT)</h5>
              <p className="text-secondary">
                The ENT department provides care for patients with a variety of
                ear, nose and throat problems!
              </p>
            </div>
          </Item>
          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images11}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">Gastroenterology Department</h5>
              <p className="text-secondary">
                This department investigates and treats digestive and upper and
                lower gastrointestinal diseases!
              </p>
            </div>
          </Item>

          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images06}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">Fluoride Treatement</h5>
              <p className="text-secondary">
                Dentists provide professional fluoride treatments in the form of
                a highly concentrated rinse, foam, gel, or varnish. !
              </p>
            </div>
          </Item>
          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images13}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">Critical care</h5>
              <p className="text-secondary">
                {" "}
                Also called intensive care, this department is for seriously ill
                patients.
              </p>
            </div>
          </Item>
          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images14}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">Intensive Care Unit (ICU)</h5>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates, at!
              </p>
            </div>
          </Item>

          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images15}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">Anesthesiology</h5>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates, at!
              </p>
            </div>
          </Item>
          <Item>
            <div className="text-center" style={{ color: "black" }}>
              <img
                style={{ height: "60px" }}
                src={images16}
                className="img-fluid"
                alt="rdg"
              />
              <h5 className="mt-3 mb-3">Anesthesiology</h5>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates, at!
              </p>
            </div>
          </Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Service;
