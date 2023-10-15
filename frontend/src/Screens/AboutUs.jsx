import React from "react";
import { Link } from "react-router-dom";
import images01 from "../images/Group 140.png";
import "../assets/styles/aboutus.css";

const AboutUs = () => {
  return (
    <section id="about" className=" d-flex align-item-center aboutcls">
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row">
              <div className="col-md-6 pt-3 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                <h1>
                  Welcome to About Page <br />
                  <strong className="brand-name "> eHealth</strong>
                </h1>
                <h2 className="my-2">
                  We are a dedicated team of healthcare professionals and
                  technologists, committed to transforming the way healthcare is
                  delivered. Our mission is to make healthcare more accessible,
                  efficient, and personalized through innovative technology
                  solutions.
                  <br /> <br />
                  eHealth is more than a project for us. It's our contribution
                  to making healthcare better for everyone. We are committed to
                  developing technology that not only improves the efficiency of
                  healthcare services but also enhances patient experience.
                  <br /> <br />
                  Thank you for being a part of our mission. We look forward to
                  continuing to serve you and revolutionize healthcare together.
                </h2>
                <div className="mt-3">
                  <Link to="/service" className="btn-get-started">
                    Contact Now
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2  about-img">
                <img
                  src={images01}
                  style={{ height: "82vh" }}
                  className="img-fluid animated"
                  alt="about image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
