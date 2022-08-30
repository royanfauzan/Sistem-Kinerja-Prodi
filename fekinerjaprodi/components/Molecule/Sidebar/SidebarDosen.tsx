import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import style from "./sideb.module.css"

export default function SidebarDosen() {
  const router = useRouter()

  const pathHalaman = router.asPath
  const arrHalaman = pathHalaman.split("/")
  const HalamanActive = arrHalaman.slice(-1)[0]

  // const arrMenuSDM =['']

  const listFolderDashboard = ["dashboards"]
  const isMenuDashboard = listFolderDashboard.includes(arrHalaman[1])

  const listFolderSdm = [
    "sdm",
    "rekognisi",
    "publikasidos",
    "penelitiandosen",
    "pkmdosen",
    "profildosen",
    "profildetail",
    "dtps",
    "ewmp",
    "produk",
    "luaranlaindos",
    "mengajar",
    "bukujurnal",
    "bimbingan",
  ]
  const isMenuSdm = listFolderSdm.includes(arrHalaman[1])

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
      className={`sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 `}
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
            src="/img/argon/LOgoPNB.png"
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
          <li className={`nav-link ${
                isMenuDashboard ? "active bg-light text-dark" : ""
              }`}>
            <a className="nav-link " href="/dashboards/dashboarddosen">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className="nav-link " href="/dashboards/dashboardpendidikan">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Kriteria Pendidikan</span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className="nav-link " href="/dashboards/dashboardpenelitian">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Kriteria Penelitian</span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className="nav-link " href="/dashboards/dashboardpkm">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">
                Kriteria Pengabdian <br /> Kepada Masyarakat
              </span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a className={`nav-link ${
                isMenuSdm ? "active bg-light text-dark" : ""
              }`}href="/sdm/dashboardsdm">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">
                Kriteria Sumber Daya <br />  Manusia(SDM)
              </span>
            </a>
          </li>
          
        </ul>
      </div>
      <div className=" mx-3 ">
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
