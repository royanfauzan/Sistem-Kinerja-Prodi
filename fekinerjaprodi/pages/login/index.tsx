import { useRouter } from "next/router";
import axios from "axios";
import React, { ChangeEvent, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function index() {
  const router = useRouter();
  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/testaxios",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { profil } = response.data;
        console.log(profil);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  }, []);

  const viewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPwd = document.getElementById("password");
    if (event.target.checked) {
      inputPwd?.setAttribute("type", "text");
    } else {
      inputPwd?.setAttribute("type", "password");
    }
    console.log(event);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading('Loading...');

    let formData = new FormData();
    formData.append("NIDK", event.target.nidk.value);
    formData.append("password", event.target.password.value);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/login",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        const {token} = response.data;
        //handle success
        toast.dismiss();
        toast.success('Login Sugses!!');
        // console.log(token);
        localStorage.setItem('token',token);
        console.log(localStorage.getItem('token'));
        console.log("success");
        console.log(response);
        router.push("/profildosen/inputprofil");
      })
      .catch(function (error) {
        //handle error
        toast.dismiss();
        if(error.response.status==400){
            toast.error('Login Gagal, periksa email dan password!!');
        }else{
            toast.error('Login Gagal....');
        }
        
        console.log("tidak success");
        console.log(error.response);
      });
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <a href="index.html" className="app-brand-link gap-2">
                  <span className="app-brand-logo demo"></span>
                  <span className="app-brand-text demo text-body fw-bolder">
                    SI-Kinerja Prodi
                  </span>
                </a>
              </div>

              <h4 className="mb-2">Selamat Datang! 👋</h4>
              <p className="mb-4">
                Sebelum melanjutkan, harap Login terlebih dahulu..
              </p>

              <form
                id="formAuthentication"
                className="mb-3"
                action="index.html"
                method="POST"
                onSubmit={submitForm}
              >
                <div className="mb-3">
                  <label htmlFor="nidk" className="form-label">
                    NIDK
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nidk"
                    name="nidk"
                    placeholder="NIDK"
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                    <span className="input-group-text cursor-pointer">
                      <i className="bx bx-hide"></i>
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember-me"
                      onChange={viewPassword}
                    />
                    <label className="form-check-label" htmlFor="remember-me">
                      {" "}
                      Lihat Password{" "}
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary d-grid w-100"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
