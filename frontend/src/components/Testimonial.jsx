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
      <div className="d-flex justify-content-center">
        <div className="col-md-8">
          <Carousel
            showDots={true}
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={3000}
          >
            <div className="card">
              <div className="col text-center">
                <div className="card-body mx-3">
                  <div className="mb-4">
                    <img
                      src="https://media.istockphoto.com/id/923274708/photo/mid-adult-woman-headshot.jpg?s=612x612&w=0&k=20&c=0W9LmlqPr7bQyBGQEnBwJl-Qjss6r4-DgDUdSUQ_LeY="
                      className="rounded-circle shadow-1-strong"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h5 className="font-weight-bold">Jahanara Ahmed</h5>
                  <div className="score">
                    <span style={{ width: "88%" }}></span>
                  </div>
                  <p className="mb-2">
                    <i className="fas fa-quote-left pe-2" />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod eos id officiis hic tenetur quae quaerat ad velit ab
                    hic tenetur.
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="col text-center">
                <div className="card-body mx-3">
                  <div className="mb-4">
                    <img
                      src="https://qph.cf2.quoracdn.net/main-qimg-d18e12caac9ff88d9293a013819b4429-lq"
                      className="rounded-circle shadow-1-strong"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h5 className="font-weight-bold">Dilara Begum</h5>
                  <div className="score">
                    <span style={{ width: "100%" }}></span>
                  </div>
                  <p className="mb-2">
                    <i className="fas fa-quote-left pe-2" />
                    Cras sit amet nibh libero, in gravida nulla metus
                    scelerisque ante sollicitudin commodo cras purus odio,
                    vestibulum in tempus viverra turpis.
                    <i className="fas fa-quote-right pe-2" />
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="col text-center">
                <div className="card-body mx-3">
                  <div className="mb-4">
                    <img
                      src="https://media.licdn.com/dms/image/D5612AQEPv36iMlRGUQ/article-cover_image-shrink_600_2000/0/1681961472754?e=2147483647&v=beta&t=rMb4vw7fcCUfDwRKZYwCYlqU3JDPaD8Dz0DXxJ4QyAk"
                      className="rounded-circle shadow-1-strong"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h5 className="font-weight-bold">Milon Ahmed</h5>
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
                  <div className="mb-4">
                    <img
                      src="data:image/jpeg;base64,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"
                      className="rounded-circle shadow-1-strong"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h5 className="font-weight-bold">Abdur Alim</h5>
                  <div className="score">
                    <span style={{ width: "100%" }}></span>
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
                  <div className="mb-4">
                    <img
                      src="https://jkkniu.edu.bd/wp-content/uploads/hafiz-300x300.jpg"
                      className="rounded-circle shadow-1-strong"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h5 className="font-weight-bold">Rafiq Bhuiya </h5>
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
                  <div className="mb-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJbmhzrt9WSwJZAuqpDnEWFODx-Ska9w854g&usqp=CAU"
                      className="rounded-circle shadow-1-strong"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h5 className="font-weight-bold">Nasin Akter</h5>
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
                  <div className="mb-4">
                    <img
                      src="https://softexpo.com.bd/assets/media/speaker_photo/1676123055.jpg"
                      className="rounded-circle shadow-1-strong"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h5 className="font-weight-bold">Umma Kulsum</h5>
                  <div className="score">
                    <span style={{ width: "70%" }}></span>
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
      </div>
    </div>
  );
};

export default Testimonial;
