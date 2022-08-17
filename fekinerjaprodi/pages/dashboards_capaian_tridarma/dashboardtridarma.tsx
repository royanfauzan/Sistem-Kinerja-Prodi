import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import MenuCardUtama from "../../components/Molecule/MenuCard/MenuCardUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutDashboard";
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
            <div className="col-12">
              <div className="card mb-4 px-3 pb-3 bg-light">
                <div className="row">
                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Data Mahasiswa</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/mahasiswa/daftarmhs"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Input Program Studi</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a href="/prodi/inputprodi" className="btn btn-primary">
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Data IPK Mahasiswa</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a href="/ipk/daftaripk" className="btn btn-primary">
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Data Prestasi Mahasiswa</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/prestasi/daftarprestasi"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">
                          Data Waktu Tunggu Lulusan
                        </h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/waktutunggu/daftarwaktu"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">
                          Data Kesesuaian Bidang Kerja
                        </h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/bidang/daftarbidang"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">
                          Data Tempat Kerja Lulusan
                        </h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/tempat/daftartempat"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">
                          Data Kepuasan Pengguna Lulusan
                        </h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/kepuasan_LLS/daftar_kepuasan_lls"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Data Luaran Lainnya</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/luaran/daftarluaran"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Data Jurnal Mahasiswa</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a href="/buku/daftarbuku" className="btn btn-primary">
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Data Pagelaran Mahasiswa</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/pagelaran/daftarpagelaran"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Data Seminar</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/seminar/daftarseminar"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Data Masa Studi Lulusan</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/masastudi/daftarmasastudi"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Data Produk</h6>
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                        <a
                          href="/produkMHS/daftarprodukmhs"
                          className="btn btn-primary"
                        >
                          Kelola Data
                        </a>
                      </div>
                    </div>
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
