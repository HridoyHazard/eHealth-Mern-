import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Doctor = ({ doctor }) => {
  return (
    <div className="col-lg-3 col-md-3 pb-5 ">
      <div className="card cardxx">
        
        <div className="card-body">
        <Link to={`/doctor/${doctor._id}`}>
          <img
            src={doctor.image}
            alt=""
            className="img-fluid rounded-circle  mb-3"
          />
          </Link>
          <Link to={`/doctor/${doctor._id}`}>
            <h3 className="doctorh3">
              <strong>{doctor.name}</strong>
            </h3>
          </Link>
          <h5>{doctor.degree}</h5>
          <h6>{doctor.specialist}</h6>
          <p>{doctor.chamber}</p>
          <div className="d-flex flex-row justify-content-center ">
            <a
              style={{ paddingRight: "1em" }}
              href="https://www.facebook.com/"
              className="fb"
            >
              <i>
                <FontAwesomeIcon
                  className="fontSizeChanging"
                  icon={faFacebook}
                ></FontAwesomeIcon>
              </i>
            </a>
            <a
              style={{ paddingRight: "1em" }}
              href="https://twitter.com/"
              className="tw"
            >
              <i>
                <FontAwesomeIcon
                  className="fontSizeChanging"
                  icon={faTwitter}
                ></FontAwesomeIcon>
              </i>
            </a>
            <a
              style={{ paddingRight: "1em" }}
              href="www.instagram.com"
              className="ig"
            >
              <i>
                <FontAwesomeIcon
                  className="fontSizeChanging"
                  icon={faInstagram}
                ></FontAwesomeIcon>
              </i>
            </a>
            <a
              style={{ paddingRight: "1em" }}
              href="www.linkedin.com"
              className="in"
            >
              <i>
                <FontAwesomeIcon
                  className="fontSizeChanging"
                  icon={faLinkedin}
                ></FontAwesomeIcon>
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
