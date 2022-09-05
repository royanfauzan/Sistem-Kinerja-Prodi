import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import style from "./sideb.module.css"

export default function SidebarUtama() {
  const router = useRouter()

  const pathHalaman = router.asPath
  const arrHalaman = pathHalaman.split("/")
  const HalamanActive = arrHalaman.slice(-1)[0]

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

  const listFolderPendidikan = [
    "dashboardadmin",
    "capkurikulum",
    "integrasi",
    "kepuasanmhs",
    "matkul",
    "mahasiswa",
  ]
  const isMenuPendidikan = listFolderPendidikan.includes(arrHalaman[1])

  const listFolderCapaian = ["dashboards_capaian_tridarma", "prestasi", "ipk"]
  const isMenuCapaian = listFolderCapaian.includes(arrHalaman[1])

  const listFolderMitra = ["mitra"]
  const isMenuMitra = listFolderMitra.includes(arrHalaman[1])

  const listFolderKjs = ["kerjasama"]
  const isMenuKjs = listFolderKjs.includes(arrHalaman[1])

  const listFolderMhs = ["MahasiswaBaru_Asing"]
  const isMenuMhs = listFolderMhs.includes(arrHalaman[1])

  const listFolderKeuangan = ["penggunaan_dana"]
  const isMenuKeuangan = listFolderKeuangan.includes(arrHalaman[1])

  const listFolderUser = ["User"]
  const isMenuUser = listFolderUser.includes(arrHalaman[1])
  console.log(arrHalaman)
  console.log(`arrHalaman`)

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
                isMenuDashboard ? "active bg-light text-dark opacity-10" : ""
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
            <a
              className={`nav-link ${
                isMenuUser ? "active bg-light text-dark opacity-10" : ""
              }`}
              href="/User/Tabel_User"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">User</span>
            </a>
          </li>

          <li className={`nav-item `}>
            <a
              className={`nav-link ${
                isMenuMitra
                  ? "active bg-light text-dark opacity-10"
                  : ""
              }`}
              href="/mitra/tabelmitra"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">
                Data Mitra
              </span>
            </a>
          </li>

          <li className={`nav-item `}>
            <a
              className={`nav-link ${
                isMenuKjs
                  ? "active bg-light text-dark opacity-10"
                  : ""
              }`}
              href="/kerjasama/tabelkerjasama"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">
                Kriteria Kerjasama
              </span>
            </a>
          </li>

          <li className={`nav-item `}>
            <a
              className={`nav-link ${
                isMenuMhs
                  ? "active bg-light text-dark opacity-10"
                  : ""
              }`}
              href="/dashboard_rona/dashboard_mahasiswa"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">
                Kriteria Mahasiswa
              </span>
            </a>
          </li>

          <li className={`nav-item `}>
            <a
              className={`nav-link ${
                isMenuKeuangan
                  ? "active bg-light text-dark opacity-10"
                  : ""
              }`}
              href="/penggunaan_dana/tabel_penggunaan_dana"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">
                
                Kriteria Keuangan, <br /> Sarana dan Prasarana
               
              </span>
            </a>
          </li>


          <li className={`nav-item `}>
            <a
              className={`nav-link ${
                isMenuCapaian ? "active bg-light text-dark opacity-10" : ""
              }`}
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
            <a
              className={`nav-link ${
                isMenuPendidikan ? "active bg-light text-dark opacity-10" : ""
              }`}
              href="/dashboardadmin/dashboardpendidikan"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Kriteria Pendidikan</span>
            </a>
          </li>
          <li className={`nav-item `}>
            <a
              className={`nav-link ${
                isMenuSdm ? "active bg-light text-dark" : ""
              }`}
              href="/sdm/dashboardsdmadm"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">
                Kriteria Sumber Daya
                <br /> Manusia(SDM)
              </span>
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
