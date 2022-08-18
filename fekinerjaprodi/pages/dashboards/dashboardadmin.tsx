import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import Carddashboard from "../../components/Molecule/MenuCard/Carddashboard";
import ListCardDash from "../../components/Molecule/MenuCard/ListCardDash";
import MenuCardUtama from "../../components/Molecule/MenuCard/MenuCardUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutDashboardBlue from "../../components/Organism/Layout/LayoutDashboardBlue";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

export default function dashboardadmin() {
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
          <div className="container-fluid pb-4 pt-0 mt-0">
            <div className="row mx-3 my-3 bg-white rounded">
              <div className="col-12 mx-2 my-2">
                <div className="row justify-content-center mt-3">
                  <div className="col-10 border-bottom">
                    <h3 className="text-center">
                      {" "}
                      Sistem Informasi Kinerja Program Studi{" "}
                    </h3>
                  </div>
                </div>
                <div className="row mt-4 ">
                  <div className="col-6">
                    <div className="row d-flex justify-content-around">
                      <Carddashboard judul={`Kriteria Sumber Daya Manusia`}>
                        <ListCardDash
                          judul={"Profil Dosen"}
                          keterangan={`mengelola data profil dosen`}
                          halaman={"/profildosen/tabelprofil"}
                          icon={`bi bi-card-text`}
                        />
                        <ListCardDash
                          judul={"Luaran Lainnya"}
                          keterangan={`kelola data Luaran Dosen`}
                          halaman={"#"}
                          icon={`bi bi-calendar3-range`}
                        />
                      </Carddashboard>

                      <Carddashboard judul={`Kriteria Pendidikan`}>
                        <ListCardDash
                          judul={"Capaian Kurikulum"}
                          keterangan={`input`}
                          halaman={"/publikasidos/export/export_publikasidos"}
                          icon={`bi bi-card-text`}
                        />
                        <ListCardDash
                          judul={"Data Integrasi"}
                          keterangan={`kelola data Luaran Dosen`}
                          halaman={"#"}
                          icon={`bi bi-calendar3-range`}
                        />
                        <ListCardDash
                          judul={"Kepuasan Mahasiswa"}
                          keterangan={`kelola data Luaran Dosen`}
                          halaman={"#"}
                          icon={`bi bi-calendar3-range`}
                        />
                      </Carddashboard>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="row d-flex justify-content-around">
                      <Carddashboard judul={`Kriteria Penelitian`}>
                        <ListCardDash
                          judul={"Capaian Kurikulum"}
                          keterangan={`input`}
                          halaman={"/publikasidos/export/export_publikasidos"}
                          icon={`bi bi-card-text`}
                        />
                        <ListCardDash
                          judul={"Data Integrasi"}
                          keterangan={`kelola data Luaran Dosen`}
                          halaman={"#"}
                          icon={`bi bi-calendar3-range`}
                        />
                        <ListCardDash
                          judul={"Kepuasan Mahasiswa"}
                          keterangan={`kelola data Luaran Dosen`}
                          halaman={"#"}
                          icon={`bi bi-calendar3-range`}
                        />
                      </Carddashboard>
                      <Carddashboard
                        judul={`Kriteria Pengabdian Kepada Masyarakat`}
                      >
                        <ListCardDash
                          judul={"Profil Dosen"}
                          keterangan={`mengelola data profil dosen`}
                          halaman={"/publikasidos/export/export_publikasidos"}
                          icon={`bi bi-card-text`}
                        />
                      </Carddashboard>
                    </div>
                  </div>
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
