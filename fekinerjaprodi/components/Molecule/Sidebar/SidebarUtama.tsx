import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import style from "./sideb.module.css"

export default function SidebarUtama() {
  const router = useRouter()

  const pathHalaman = router.asPath
  const arrHalaman = pathHalaman.split("/")
  const HalamanActive = arrHalaman.slice(-1)[0]

  const Logout = async () => {
    const lgToken = localStorage.getItem("token")

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/logout",
      headers: { Authorization: `Bearer ${lgToken}` },
      params: {
        token: lgToken,
      },
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        localStorage.removeItem("token")
        router.push("/login")
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
  }

  return (
    <aside
      className={`sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4`}
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <a
          className="navbar-brand m-0"
          href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html "
          target="_blank"
        >
          <img
            src="/img/argon/logo-ct-dark.png"
            className="navbar-brand-img h-100"
            alt="main_logo"
          />
          <span className="ms-1 font-weight-bold">Si-Kinerja Prodi</span>
        </a>
      </div>
      <hr className="horizontal dark mt-0" />
      <div
        className={`collapse navbar-collapse  w-auto ${style.hei_side}`}
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className={`nav-item `}>
            <a
              className={`nav-link ${
                HalamanActive == "dashboardadmin"
                  ? "active bg-primary text-white"
                  : ""
              }`}
              href="/dashboards/dashboardadmin"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className="nav-link " href="/dashboard_rona/dashboard_user">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">User</span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className="nav-link " href="/dashboard_rona/dashboard_tb124">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">
                Kriteria Kerjasama, <br /> Mahasiswa, Keuangan, <br />
                Sarana dan Prasarana
              </span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a
              className="nav-link "
              href="/dashboards_capaian_tridarma/dashboardtridarma"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">
                Kriteria Luaran dan <br /> Capaian Tridarama
              </span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className="nav-link " href="/dashboardadmin/dashboardpendidikan">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Kriteria Pendidikan</span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className="nav-link active" href="./dashboard_tabel.php">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Tables</span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className="nav-link " href="./dashboard_form.php">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-credit-card text-success text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Form</span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className="nav-link " href="./login.php">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-app text-info text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Login</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-3 ">
        <a href="/User/UbahPassword" className="btn btn-dark btn-sm w-100 mb-3">
          Change Password
        </a>
        <a
          className="btn btn-sm btn-outline-danger mb-0 w-100"
          type="button"
          onClick={Logout}
        >
          Logout
        </a>
      </div>
    </aside>
  )
}
