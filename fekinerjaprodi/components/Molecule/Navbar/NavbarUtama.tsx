import { useRouter } from "next/router";
import React from "react";

interface NavProps {
  rlUser: String;
  kriteria?: string;
  halaman?: string;
}
export default function NavbarUtama(props: Partial<NavProps>) {
  const { rlUser } = props;
  const router = useRouter();
  const pathHalaman = router.asPath;
  const arrHalaman = pathHalaman.split("/");

  let kriteriaSekarang = "Dashboard";
  let halamanSekarang = "/dashboards/dashboardadmin";

  if (props.kriteria) {
    kriteriaSekarang = props.kriteria;
  }

  if (props.halaman) {
    halamanSekarang = props.halaman;
  }

  const listHalaman = [
    "dashboardadmin",
    "tabelewmp",
    "tabelewmpdsn",
    "dashboarddosen",
    "daftarmatkul",
  ];
  const namaHalaman = [
    "Dashboard Admin",
    "Tabel List Ewmp",
    "List Ewmp Dosen",
    "Dashboard Dosen",
    "Mata Kuliah",
  ];
  const indexNama = listHalaman.findIndex((a) => {
    return a == arrHalaman.slice(-1)[0];
  });
  let namaHalamanIni = namaHalaman[indexNama];
  if (!namaHalamanIni) {
    namaHalamanIni = arrHalaman.slice(-1)[0];
  }

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
      id="navbarBlur"
      data-scroll="false"
    >
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb mt-2">
          {/* {arrHalaman.map((hal, key, arrHalaman) => {
              if (key + 1 === arrHalaman.length) {
                return (
                  <li className="breadcrumb-item text-sm" key={`halaman${key}`}>
                    <a className="text-white text-bold" href="#">
                      {hal}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li className="breadcrumb-item text-sm" key={`halaman${key}`}>
                    <a className="opacity-5 text-white" href="#">
                      {hal}
                    </a>
                  </li>
                );
              }
              
            })} */}

          <a className="text-white text-bold fs-6 mt-3" href="#">
            <p className="text-xs mb-0 mt-2">Kriteria : </p>
          </a>
          <a href={halamanSekarang}>
            <h5 className="font-weight-bolder text-white mb-0">
              {kriteriaSekarang}
            </h5>
          </a>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group">
              <h4 className="text-white">
                Sistem Informasi Kinerja Program Studi
              </h4>
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a href="#" className="nav-link text-white font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">{`lv : ${rlUser}`}</span>
              </a>
            </li>
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a
                href="#"
                className="nav-link text-white p-0"
                id="iconNavbarSidenav"
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="#" className="nav-link text-white p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a
                href="#"
                className="nav-link text-white p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
              <ul
                className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="#">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img
                          src="/img/argon/team-2.jpg"
                          className="avatar avatar-sm  me-3 "
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New message</span>{" "}
                          from Laur
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="#">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img
                          src="/img/argon/small-logos/logo-spotify.svg"
                          className="avatar avatar-sm bg-gradient-dark  me-3 "
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New album</span> by
                          Travis Scott
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>1 day
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item border-radius-md" href="#">
                    <div className="d-flex py-1">
                      <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto"></div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          Payment successfully completed
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>2 days
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
