import axios from "axios";
import React, { useEffect, useState } from "react";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";

interface Udosen {
    NIDK: string;
    role: string;
    level_akses: number;
    created_at: string;
    updated_at: string;
}

export default function inputprofil() {
  const [userDosens, setuserDosens] = useState<Udosen[]>([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/testuser",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { userdosen } = response.data;
        setuserDosens(userdosen);
        console.log(userdosen);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  }, []);

  return (
    <LayoutForm>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex align-items-center">
                  <p className="mb-0">Input Data</p>
                  <button className="btn btn-primary btn-sm ms-auto">
                    Simpan
                  </button>
                </div>
              </div>
              <div className="card-body">
                <p className="text-uppercase text-sm">Profil Dosen</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        NIDK
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue="0"
                      >
                        <option >Pilih NIDK User</option>
                        {userDosens.map((userDosen) => {
                            if (userDosen.role!=='admin') {
                                return (
                                    <option value={userDosen.NIDK} key={userDosen.NIDK}>{userDosen.NIDK}</option>
                                );
                            }
                      })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        NIK
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="NIK dosen"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Nama
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nama dosen"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Agama
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Agama"
                      />
                    </div>
                  </div>
                </div>
                <hr className="horizontal dark" />
                <p className="text-uppercase text-sm">Informasi Akademik</p>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Pangkat
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="pangkat"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Jabatan Akademik
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Jabatan Akademik"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Golongan
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="golongan"
                      />
                    </div>
                  </div>
                </div>
                <hr className="horizontal dark" />
                <p className="text-uppercase text-sm">Kontak</p>
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Email
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Nomor Telpon
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="085******"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
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
                  <a className="btn btn-sm btn-info mb-0 d-none d-lg-block">
                    Connect
                  </a>
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
          </div>
        </div>
        <footer className="footer pt-3  ">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-lg-6 mb-lg-0 mb-4">
                <div className="copyright text-center text-sm text-muted text-lg-start">
                  © 2022, made with{" "}
                  <i className="fa fa-heart" aria-hidden="true"></i> by
                  <a
                    href="https://www.creative-tim.com"
                    className="font-weight-bold"
                    target="_blank"
                  >
                    Creative Tim
                  </a>
                  for a better web.
                </div>
              </div>
              <div className="col-lg-6">
                <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com"
                      className="nav-link text-muted"
                      target="_blank"
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className="nav-link text-muted"
                      target="_blank"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/blog"
                      className="nav-link text-muted"
                      target="_blank"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/license"
                      className="nav-link pe-0 text-muted"
                      target="_blank"
                    >
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </LayoutForm>
  );
}
