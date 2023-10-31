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
                      src="https://media.licdn.com/dms/image/C5603AQH1KvsQWNh7zA/profile-displayphoto-shrink_400_400/0/1517533258645?e=1698883200&v=beta&t=C5n7BqQngVUzH4TTQ_VKunMKr15Hve25hPEF2EBabtk"
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
