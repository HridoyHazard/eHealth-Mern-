import React from "react";
import Button from "@material-ui/core/Button";
import images01 from "../images/icon/blood_donation.png";
import images02 from "../images/icon/medical-kit.png";
import images03 from "../images/icon/AdobeStock_207418957_Preview-removebg-preview.png";
import images04 from "../images/icon/open.png";
import images05 from "../images/icon/chat.png";
import images06 from "../images/icon/appointment.png";
import "../assets/styles/Features.css";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div>
      <section id="home-icon" className="pb-3 text-center">
        <div className="content pb-5"></div>
        <div className="containerx text-center">
          <div className="row align-self-center">
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <div id="box-1" className="box col-md-4 ">
                <img style={{ height: "80px" }} src={images02} alt="" />
                <h3 className="my-2">Emergency Care</h3>
                <p className="lead mb-3">
                  emergency care is needed immediately needs to be in a medical
                  facility, while if it is an urgent medical issue .
                </p>
                <Button variant="contained" color="primary">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <div id="box-2" className="box  col-md-4">
                <img style={{ height: "80px" }} src={images04} alt="" />
                <h3 className="my-2">Openning Hours</h3>
                <p className="lead mb-3">
                  {" "}
                  Needed immediately and patient needs to be shifted in a
                  medical facility, while if it is an urgent medical issue .
                </p>
                <Button variant="contained" color="secondary">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <div id="box-3" className="box col-md-4 ">
                <img style={{ height: "80px" }} src={images01} alt="" />
                <h3 className="my-2">Blood Donation</h3>
                <p className="lead mb-3">
                  emergency care is needed immediately needs to be in a medical
                  facility, while if it is an urgent medical issue .
                </p>
                <Button variant="contained" color="primary">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <div id="box-4" className="box col-md-4 ">
                <img style={{ height: "80px" }} src={images05} alt="" />
                <h3 className="my-2">Chat With Doctors</h3>
                <p className="lead mb-3">
                  emergency care is needed immediately needs to be in a medical
                  facility, while if it is an urgent medical issue .
                </p>
                <Button variant="contained" color="primary">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <div id="box-5" className="box col-md-4 ">
                <img style={{ height: "80px" }} src={images06} alt="" />
                <h3 className="my-2">Get Appointment</h3>
                <p className="lead mb-3">
                  emergency care is needed immediately needs to be in a medical
                  facility, while if it is an urgent medical issue .
                </p>
                <Button variant="contained" color="primary">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <div id="box-6" className="box  col-md-4">
                <img style={{ height: "80px" }} src={images03} alt="" />
                <h3 className="my-2">24 Hours Service</h3>
                <p className="lead mb-3">
                  emergency care is needed immediately and patient needs medical
                  facility, while if it is an urgent medical issue .
                </p>

                <Button variant="contained" color="primary">
                  <Link className="btnlink" to="/contactus">
                    Contact Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
