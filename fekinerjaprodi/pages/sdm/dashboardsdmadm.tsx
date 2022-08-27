import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardKelolaSimple from "../../components/Molecule/MenuCard/CardKelolaSimple";
import CardPendidikanSimple from "../../components/Molecule/MenuCard/CardpendidikanSimple";
import MenuCardUtama from "../../components/Molecule/MenuCard/MenuCardUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutDashboard";
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
          return router.push("/");
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true);
        pengambilData();
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
            {/* <div className="row justify-content-center">
              <div className="col-10 border-top border-bottom mb-4">
                <h3 className="text-center text-white">
                  {" "}
                  Kriteria Sumber Daya Manusia{" "}
                </h3>
              </div>
            </div> */}
            <div className="row min-vh-75">
              {/* 1 */}
              <div className="col-4">
                <div className="row">
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Profil Dosen`}
                          icon={`bi bi-person-bounding-box`}
                          halaman={`/profildosen/tabelprofil`}
                          lebar={`col-12`}
                          keterangan={"List Profil Dosen Tersimpan"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`EWMP`}
                          icon={`bi bi-input-cursor`}
                          halaman={`/ewmp/tabelewmp`}
                          lebar={`col-12`}
                          keterangan={"Equivalen Waktu Mengajar Penuh Dosen"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Pengalaman Mengajar`}
                          icon={`bi bi-collection`}
                          halaman={`/mengajar/tabelmengajar`}
                          lebar={`col-12`}
                          keterangan={"Data Pengalaman mengajar Dosen"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Pembimbing Utama TA`}
                          icon={`bi bi-bounding-box`}
                          halaman={`/bimbingan/export/exportbimbingan`}
                          lebar={`col-12`}
                          keterangan={"Export Data perhitungan bimbingan Dosen"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="col-4">
                <div className="row">
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Rekognisi DTPS`}
                          icon={`bi bi-bookmark-check`}
                          halaman={`/rekognisi/tabelrekognisi`}
                          lebar={`col-12`}
                          keterangan={
                            "Mengelola data rekognisi DTPS"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Penelitian DTPS`}
                          icon={`bi bi-search`}
                          halaman={`/penelitiandosen/export/pendexport`}
                          lebar={`col-12`}
                          keterangan={
                            "Export perhitungan jumlah penelitian yang di hasilkan oleh Dosen"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`PkM DTPS`}
                          icon={`bi bi-hammer`}
                          halaman={`/pkmdos/export/pkmdexport`}
                          lebar={`col-12`}
                          keterangan={
                            "Export perhitungan jumlah Pengabdian kepada Masyarakat oleh Dosen"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Produk/Jasa`}
                          icon={`bi bi-person-heart`}
                          halaman={`/produk/export/exportproduk`}
                          lebar={`col-12`}
                          keterangan={
                            "Export Data Produk/Jasa Dosen yang Diadopsi Masyarakat"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="col-4">
                <div className="row">
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Publikasi`}
                          icon={`bi bi-pip`}
                          halaman={`/publikasidos/export/export_publikasidos`}
                          lebar={`col-12`}
                          keterangan={
                            "Export data Jurnal,Seminar, dan Pagelaran yang melibatkan partisipasi Dosen"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Karya Ilmiah Disitasi`}
                          icon={`bi bi-journal-check`}
                          halaman={`/bukujurnal/export/exportjurnalsitasi`}
                          lebar={`col-12`}
                          keterangan={"Export Data Jurnal yang berisi sitasi"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Luaran Lain`}
                          icon={`bi bi-layout-wtf`}
                          halaman={`/luaranlaindos/export`}
                          lebar={`col-12`}
                          keterangan={
                            "Export data Luaran Lain dari Penelitian Maupun PkM Dosen"
                          }
                        />
                      </div>
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
