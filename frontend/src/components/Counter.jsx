import React from "react";
import "../assets/styles/Counter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faFaceSmile,
  faPills,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Zoom } from "react-awesome-reveal";

const Counter = () => {
  return (
    <section class="counter">
      <Zoom top>
        <div class="containerx">
          <div class="box-container">
            <div class="box" data-aos="fade-up">
              <FontAwesomeIcon icon={faCalendarCheck} className="i" />
              <span>40+</span>
              <h3>Appointments</h3>
            </div>

            <div class="box" data-aos="fade-up">
              <FontAwesomeIcon icon={faUsers} className="i" />
              <span>100+</span>
              <h3>Users</h3>
            </div>

            <div class="box" data-aos="fade-up">
              <FontAwesomeIcon icon={faFaceSmile} className="i" />
              <span>1200+</span>
              <h3>happy patients</h3>
            </div>

            <div class="box" data-aos="fade-up">
              <FontAwesomeIcon icon={faPills} className="i" />
              <span>130+</span>
              <h3>Medicine</h3>
            </div>
          </div>
        </div>
      </Zoom>
    </section>
  );
};

export default Counter;
