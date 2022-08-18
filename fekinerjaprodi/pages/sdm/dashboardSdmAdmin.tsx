import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import MenuCardUtama from "../../components/Molecule/MenuCard/MenuCardUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutDashboardBlue from "../../components/Organism/Layout/LayoutDashboardBlue";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

export default function dashboardSdmAdmin() {
  const router = useRouter();

  const linkKelola = {
    profilDsn: "/profildosen/daftarprofil",
  };

  const [stadmin, setStadmin] = useState(false);
  const [profilDosen, setprofilDosen] = useState([]);
  const [dataRole, setRole] = useState("");
  const [dataDashboardadmin, setdataDashboardadmin] = useState();
  const [progresEwmp, setprogresEwmp] = useState(0);

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profildosens",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { profilDosens } = response.data;
        setprofilDosen(profilDosens);

        console.log(profilDosens);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/data_dashboard",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { data } = response;
        setdataDashboardadmin(data);
        setprogresEwmp(data.progres_ewmp);

        console.log(data);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  };

  useEffect(() => {
    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem("token");
    if (!lgToken) {
      router.push("/login");
    }

    // perjalanan validasi token
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_user",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { level_akses } = response.data.user;
        const { role } = response.data.user;
        setRole(role);

        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
          return router.push("/dashboards/darboarddosen");
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        pengambilData();
        setStadmin(true);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
        return router.push("/");
      });
  }, []);

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutDashboardBlue rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="row mx-3 my-3 bg-white rounded">
              <div className="col-12 mx-2 my-2">
                <div className="row justify-content-center mt-3">
                  <div className="col-10 border-top border-bottom">
                  <h3 className="text-center"> Overview Kriteria Sumber Daya Manusia </h3>
                  </div>
                </div>
                <div className="row justify-content-center ">
                  <div className="col-10 mb-3 pb-3 border-bottom">
                    <div className="row mb-3 mt-3">
                      <h5 className="text-center">
                        Ringkasan Pengumpulan Data EWMP
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <div className="col-3 border-end text-center">
                        <p>Jumlah DTPS</p>
                        {dataDashboardadmin && (
                          <h5>{dataDashboardadmin.jumlah_dtps}</h5>
                        )}
                      </div>
                      <div className="col-3 border-end text-center">
                        <p>Data EWMP TS</p>
                        {dataDashboardadmin && (
                          <h5>{dataDashboardadmin.jumlah_ewmp_ts}</h5>
                        )}
                      </div>
                      <div className="col-3 border-end text-center">
                        <p>Data EWMP TS-1</p>
                        {dataDashboardadmin && (
                          <h5>{dataDashboardadmin.jumlah_ewmp_ts1}</h5>
                        )}
                      </div>
                      <div className="col-3 text-center">
                        <p>Data EWMP TS-2</p>
                        {dataDashboardadmin && (
                          <h5>{dataDashboardadmin.jumlah_ewmp_ts2}</h5>
                        )}
                      </div>
                    </div>
                    <div className="row mb-0 mt-5">
                      <h5 className="text-center">Overall EWMP Progress</h5>
                    </div>
                    <div className="row mb-0">
                      <p className="text-center fw-lighter fst-italic pb-0">
                        <small>
                          *Berdasarkan data ideal(DTPS * 3Tahun * 2 Semester)
                        </small>
                      </p>
                    </div>
                    <div className="row mb-3 justify-content-center">
                      <div className="col-3 text-center border-bottom">
                        {dataDashboardadmin && <h5>{progresEwmp}%</h5>}
                        <div className="progress p-0">
                          <div
                            className="progress-bar bg-info text-xs"
                            role="progressbar"
                            style={{ width: `${progresEwmp}%` }}
                            aria-valuenow={progresEwmp}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            {progresEwmp}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-0 mt-5 justify-content-center">
                      <div className="col-4">
                        <div className="row">
                          <Link href={`/ewmp/tabelewmp/`}>
                            <button className=" btn btn-outline-primary shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                              Kelola EWMP
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="row justify-content-center ">
                  <div className="col-10 mb-3 pb-3 border-bottom">
                    <div className="row mb-3 mt-3">
                      <h5 className="text-center">
                        Data Pagelaran/Publikasi Ilmiah
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <div className="col-3 border-end text-center">
                        <p>Jurnal</p>
                        {dataDashboardadmin && (
                          <h5>{dataDashboardadmin.jumlah_publikasi_jurnal}</h5>
                        )}
                      </div>
                      <div className="col-3 text-center border-end">
                        <p>Sitasi Jurnal</p>
                        {dataDashboardadmin && (
                          <h5>{dataDashboardadmin.jumlah_sitasi_jurnal}</h5>
                        )}
                      </div>
                      <div className="col-3 border-end text-center">
                        <p>Seminar</p>
                        {dataDashboardadmin && (
                          <h5>{dataDashboardadmin.jumlah_publikasi_seminar}</h5>
                        )}
                      </div>
                      <div className="col-3 border-end text-center">
                        <p>Pagelaran</p>
                        {dataDashboardadmin && (
                          <h5>{dataDashboardadmin.jumlah_publikasi_pagelaran}</h5>
                        )}
                      </div>
                      
                    </div>
                    <div className="row mb-0 mt-5">
                      <h5 className="text-center">Total Publikasi Tersimpan</h5>
                    </div>
                    <div className="row mb-0">
                      <p className="text-center fw-lighter fst-italic pb-0">
                        <small>
                          *Jurnal + Seminar + Pagelaran
                        </small>
                      </p>
                    </div>
                    <div className="row mb-3 justify-content-center">
                      <div className="col-3 text-center border-bottom">
                        {dataDashboardadmin && (<h5>{dataDashboardadmin.total_publikasi}</h5>)}
                        {/* <div className="progress p-0">
                          <div
                            className="progress-bar bg-info text-xs"
                            role="progressbar"
                            style={{ width: `${progresEwmp}%` }}
                            aria-valuenow={progresEwmp}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            {progresEwmp}%
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="row mb-0 mt-5 justify-content-center">
                      <div className="col-4">
                        <div className="row">
                          <Link href={`/ewmp/tabelewmp/`}>
                            <button className=" btn btn-outline-primary shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                              Kelola Publikasi
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            <FooterUtama />
          </div>
        </LayoutDashboardBlue>
      )}
    </>
  );
}
