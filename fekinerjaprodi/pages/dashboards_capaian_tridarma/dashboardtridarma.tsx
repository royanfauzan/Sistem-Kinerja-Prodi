import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtamatridrama";
import CardKelolaSimple from "../../components/Molecule/MenuCard/CardKelolaSimple";
import CardKelolaSimpletridarma from "../../components/Molecule/MenuCard/CardKelolaSimpletridarma";
import MenuCardUtama from "../../components/Molecule/MenuCard/MenuCardUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutDashboardBlue";
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
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="row ms-3 me-2">
            <p className="text-uppercase mt-4 text-white fs-3 ms-2 text-bold">
                DASHBOARD LUARAN DAN CAPAIAN TRIDARMA
              </p>
              {/* IPK MAHASISWA */}
              <hr className="horizontal light mt-5 text-bold text-bold" />
              <p className="text-uppercase text-white text-lg ms-2 text-bold">
                DATA IPK MAHASISWA
              </p>
              <div className="col-5">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Data Mahasiswa`}
                      icon={`bi bi-person`}
                      halaman={`/mahasiswa/daftarmhs`}
                      keterangan={"Data Mahasiswa yang dikelola oleh admin"}
                    />
                  </div>
                </div>
              </div>

              <div className="col-5">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Data IPK Mahasiswa`}
                      icon={`bi bi-pen`}
                      halaman={`/ipk/daftaripk`}
                      keterangan={"Data IPK Mahasiswa yang dikelola oleh admin"}
                    />
                  </div>
                </div>
              </div>

              {/* PRESTASI */}
              {/* Garis */}
              <hr className="horizontal light mt-5 text-bold text-bold" />
              <p className="text-uppercase text-white text-lg ms-2 text-bold">
                Prestasi Akademik dan Non Akademik
              </p>
              <div className="col-5">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Data Program Studi`}
                      icon={`bi bi-book`}
                      halaman={`/prodi/inputprodi`}
                      keterangan={"Data Program Studi yang dikelola oleh admin"}
                    />
                  </div>
                </div>
              </div>

              <div className="col-5">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Data Prestasi`}
                      icon={`bi bi-trophy`}
                      halaman={`/prestasi/daftarprestasi`}
                      keterangan={
                        "Data Prestasi Akademik dan Non akademik yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              {/* MASA STUDI LULUSAN */}
              {/* Garis */}
              <hr className="horizontal light mt-5 text-bold" />
              <p className="text-uppercase text-white text-lg ms-2 text-bold">
                MASA STUDI LULUSAN
              </p>
              <div className="col-6">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Masa Studi Lulusan`}
                      icon={`bi bi-calendar-date`}
                      halaman={`/masastudi/daftarmasastudi`}
                      keterangan={
                        "Data Masa Studi Lulusan yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              {/* HASIL SURVAI */}
              {/* Garis */}
              <hr className="horizontal light mt-5 text-bold" />
              <p className="text-uppercase text-white text-lg ms-2 text-bold">
                HASIL SURVAI DAN PENGGUNA LULUSAN
              </p>
              <div className="col-5">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Waktu Tunggu Lulusan`}
                      icon={`bi bi-hourglass`}
                      halaman={`/waktutunggu/daftarwaktu`}
                      keterangan={
                        "Data Waktu Tunggu Lulusan dan Non akademik yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-5">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Kesesuaian Bidang Kerja`}
                      icon={`bi bi-box`}
                      halaman={`/bidang/daftarbidang`}
                      keterangan={
                        "Data Kesesuaian Bidang Kerja yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-5">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Tempat Kerja lulusan`}
                      icon={`bi bi-building`}
                      halaman={`/tempat/daftartempat`}
                      keterangan={
                        "Data Tempat Kerja Lulusan yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-5">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Kepuasan Lulusan`}
                      icon={`bi bi-graph-up-arrow`}
                      halaman={`/kepuasan_LLS/daftar_kepuasan_lls`}
                      keterangan={
                        "Data Kepuasan Lulusan yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-5">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Presentase Kepuasan`}
                      icon={`bi bi-clipboard2-data`}
                      halaman={`/presentase/daftarpresentase`}
                      keterangan={
                        "Data Presentase Kepuasan yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              {/* HASIL SURVAI */}
              {/* Garis */}
              <hr className="horizontal light mt-5 text-bold" />
              <p className="text-uppercase text-white text-lg ms-2 text-bold">
                PUBLIKASI, KARYA ILMIAH DAN LUARAN PENELITIAN LAINNYA
              </p>
              <div className="col-4">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Data Luaran Lainnya`}
                      icon={`bi bi-journal-plus`}
                      halaman={`/luaran/daftarluaran`}
                      keterangan={
                        "Data Luaran Lainnya yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Tulisan Mahasiswa`}
                      icon={`bi bi-pencil-square`}
                      halaman={`/tulisan/daftartulisan`}
                      keterangan={
                        "Data Tulisan Mahasiswa yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Jurnal Mahasiswa`}
                      icon={`bi bi-journals `}
                      halaman={`/buku/daftarbuku`}
                      keterangan={
                        "Data Jurnal Mahasiswa yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Pagelaran Mahasiswa`}
                      icon={`bi bi-balloon`}
                      halaman={`/pagelaran/daftarpagelaran`}
                      keterangan={
                        "Data Pagelaran Mahasiswa yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Seminar Mahasiswa`}
                      icon={`bi bi-people`}
                      halaman={`/seminar/daftarseminar`}
                      keterangan={
                        "Data Seminar Mahasiswa yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card mb-4 px-3 pb-3 bg-light">
                  <div className="row">
                    <CardKelolaSimpletridarma
                      judul={`Produk Mahasiswa`}
                      icon={`bi bi-cup-hot`}
                      halaman={`/produkMHS/daftarprodukmhs`}
                      keterangan={
                        "Data Produk Mahasiswa yang dikelola oleh admin"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <FooterUtama />
          </div>
        </LayoutForm>
      )}
    </>
  );
}
