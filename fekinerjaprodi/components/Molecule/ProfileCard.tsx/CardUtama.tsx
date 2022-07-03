import React from "react";

export default function CardUtama() {
  return (
    <div className="card card-profile">
      <img
        src="/img/argon/bg-profile.jpg"
        alt="Image placeholder"
        className="card-img-top"
      />
      <div className="row justify-content-center">
        <div className="col-4 col-lg-4 order-lg-2">
          <div className="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
            <a>
              <img
                src="/img/argon/LOgoPNB.png"
                className="rounded-circle img-fluid border border-2 border-white"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
        <div className="d-flex justify-content-between">
          <a className="btn btn-sm btn-info mb-0 d-none d-lg-block">Connect</a>
          <a className="btn btn-sm btn-info mb-0 d-block d-lg-none">
            <i className="ni ni-collection"></i>
          </a>
          <a className="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block">
            Message
          </a>
          <a className="btn btn-sm btn-dark float-right mb-0 d-block d-lg-none">
            <i className="ni ni-email-83"></i>
          </a>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center">
              {/* <div className="d-grid text-center">
                        <span className="text-lg font-weight-bolder">22</span>
                        <span className="text-sm opacity-8">Friends</span>
                      </div>
                      <div className="d-grid text-center mx-4">
                        <span className="text-lg font-weight-bolder">10</span>
                        <span className="text-sm opacity-8">Photos</span>
                      </div>
                      <div className="d-grid text-center">
                        <span className="text-lg font-weight-bolder">89</span>
                        <span className="text-sm opacity-8">Comments</span>
                      </div> */}
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          {/* <h5>
                    Mark Davis<span className="font-weight-light">, 35</span>
                  </h5>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2"></i>Bucharest, Romania
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2"></i>Solution
                    Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2"></i>University of
                    Computer Science
                  </div> */}
        </div>
      </div>
    </div>
  );
}
