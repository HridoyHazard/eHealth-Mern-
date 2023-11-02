import React from "react";
import images01 from "../images/undraw_message_sent_1030.svg";
import "../assets/styles/contactus.css";

const ContactUS = () => {
  return (
    <div className="contact1">
      <div className="container-contact1">
        <div id="contactid" className="contact1-pic js-tilt" data-tilt>
          <img className="animated" src={images01} alt="" />
        </div>

        <form className="contact1-form validate-form">
          <span className="contact1-form-title">Contact Us</span>

          <div className="wrap-input1 validate-input">
            <input
              className="input1"
              type="text"
              placeholder="Name"
              name="name"
            />
            <span className="shadow-input1"></span>
          </div>

          <div className="wrap-input1 validate-input">
            <input
              className="input1"
              type="text"
              name="email"
              placeholder="Email"
            />
            <span className="shadow-input1"></span>
          </div>

          <div className="wrap-input1 validate-input">
            <textarea
              className="input1"
              name="message"
              placeholder="Message"
            ></textarea>
            <span className="shadow-input1"></span>
          </div>

          <div className="container-contact1-form-btn">
            <button className="contact1-form-btn">
              <span>
                Send
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ContactUS;
