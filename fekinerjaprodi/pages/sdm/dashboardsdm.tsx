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
        if (level_akses !== 2) {
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
                          halaman={`/profildosen/myprofil`}
                          keterangan={"Data Pengalaman mengajar Dosen"}
                          lebar={`col-12`}
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
                          halaman={`/ewmp/tabelewmpdsn`}
                          keterangan={"Equivalen Waktu Mengajar Penuh Dosen"}
                          lebar={`col-12`}
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
                          halaman={`/mengajar/tabelmengajardsn`}
                          keterangan={"Data Pengalaman mengajar Dosen"}
                          lebar={`col-12`}
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
                          halaman={`/bimbingan/tabelbimbingandsn`}
                          keterangan={"Data Riwayat mahasiswa bimbingan Dosen"}
                          lebar={`col-12`}
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
                          judul={`Seminar`}
                          icon={`bi bi-pip`}
                          halaman={`/seminardos/tabelseminardsn`}
                          keterangan={
                            "Seminar yang melibatkan partisipasi Dosen"
                          }
                          lebar={`col-12`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Rekognisi`}
                          icon={`bi bi-pip`}
                          halaman={`/rekognisi/tabelrekognisidsn`}
                          keterangan={
                            "Data Rekognisi Dosen tetap program studi"
                          }
                          lebar={`col-12`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Pagelaran`}
                          icon={`bi bi-magic`}
                          halaman={`/pagelarandos/tabelpagelarandsn`}
                          keterangan={
                            "Pagelaran yang melibatkan partisipasi Dosen"
                          }
                          lebar={`col-12`}
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
                          halaman={`/produk/tabelprodukdsn`}
                          keterangan={
                            "Data Produk/Jasa Dosen yang Diadopsi Masyarakat"
                          }
                          lebar={`col-12`}
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
                          judul={`Karya Ilmiah (Jurnal)`}
                          icon={`bi bi-journal-check`}
                          halaman={`/bukujurnal/tabeljurnaldsn`}
                          keterangan={
                            "Data Jurnal yang melibatkan partisipasi oleh Dosen"
                          }
                          lebar={`col-12`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="card mb-4 px-3 pb-3 bg-light">
                      <div className="row">
                        <CardKelolaSimple
                          judul={`Tulisan Media`}
                          icon={`bi bi-input-cursor`}
                          halaman={`/tulisandos/tabeltulisandsn`}
                          keterangan={
                            "Tulisan yang di publish di media massa oleh Dosen"
                          }
                          lebar={`col-12`}
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
                          halaman={`/luaranlaindos/tabelluarandsn`}
                          keterangan={
                            "Luaran Lain dari Penelitian Maupun PkM Dosen"
                          }
                          lebar={`col-12`}
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
