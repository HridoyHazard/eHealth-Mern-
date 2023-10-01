import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../assets/styles/Testimonial.css";

const Testimonial = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 1920, min: 1080 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1366, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 800, min: 360 },
      items: 1,
    },
  };
  
  return (
    <div className="testimonial">
      <h1 className="text-center pb-3">Testimonial</h1>
      <Carousel
        showDots={true}
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        <div className="card">
          <div className="col text-center">
            <div className="card-body mx-3">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                  className="rounded-circle shadow-1-strong"
                  width={128}
                  height={128}
                />
              </div>
              <h5 className="font-weight-bold">Teresa May</h5>
              <div className="score">
                <span style={{ width: "88%" }}></span>
              </div>
              <p className="mb-2">
                <i className="fas fa-quote-left pe-2" />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                eos id officiis hic tenetur quae quaerat ad velit ab hic
                tenetur.
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="col text-center">
            <div className="card-body mx-3">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp"
                  className="rounded-circle shadow-1-strong"
                  width={128}
                  height={128}
                />
              </div>
              <h5 className="font-weight-bold">Alexa Horwitz</h5>
              <div className="score">
                <span style={{ width: "88%" }}></span>
              </div>
              <p className="mb-2">
                <i className="fas fa-quote-left pe-2" />
                Cras sit amet nibh libero, in gravida nulla metus scelerisque
                ante sollicitudin commodo cras purus odio, vestibulum in tempus
                viverra turpis.
                <i className="fas fa-quote-right pe-2" />
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="col text-center">
            <div className="card-body mx-3">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp"
                  className="rounded-circle shadow-1-strong"
                  width={128}
                  height={128}
                />
              </div>
              <h5 className="font-weight-bold">Maggie McLoan</h5>
              <div className="score">
                <span style={{ width: "88%" }}></span>
              </div>
              <p className="mb-2">
                <i className="fas fa-quote-left pe-2" />
                Autem, totam debitis suscipit saepe sapiente magnam officiis
                quaerat necessitatibus odio assumenda perferendis labore
                laboriosam.
                <i className="fas fa-quote-right pe-2" />
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="col text-center">
            <div className="card-body py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp"
                  className="rounded-circle shadow-1-strong"
                  width={128}
                  height={128}
                />
              </div>
              <h5 className="font-weight-bold">Maggie McLoan</h5>
              <div className="score">
                <span style={{ width: "88%" }}></span>
              </div>
              <p className="mb-2">
                <i className="fas fa-quote-left pe-2" />
                Autem, totam debitis suscipit saepe sapiente magnam officiis
                quaerat necessitatibus odio assumenda perferendis labore
                laboriosam.
                <i className="fas fa-quote-right pe-2" />
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="col text-center">
            <div className="card-body py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp"
                  className="rounded-circle shadow-1-strong"
                  width={128}
                  height={128}
                />
              </div>
              <h5 className="font-weight-bold">Maggie McLoan</h5>
              <div className="score">
                <span style={{ width: "88%" }}></span>
              </div>
              <p className="mb-2">
                <i className="fas fa-quote-left pe-2" />
                Autem, totam debitis suscipit saepe sapiente magnam officiis
                quaerat necessitatibus odio assumenda perferendis labore
                laboriosam.
                <i className="fas fa-quote-right pe-2" />
              </p>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonial;
