import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Link from "next/link";

export default function pkm() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [tampilPKM, settampilPKM] = useState([]);
  const [anggota_dosens, setdataDosen] = useState([]);
  const [anggota_mahasiswas, setdataMahasiswa] = useState([]);
  const [dataRole, setRole] = useState("");

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/PKM",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_pkm } = response.data;
        settampilPKM(all_pkm);

        console.log(all_pkm);
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
              <div className="card mb-4">
              <style jsx>{`
                  table,
                  td,
                  th {
                    border: 1px solid !important ;
                    text-align: center;
                  }

                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                  
                `}</style>
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Export Pengabdian Kepada Masyarakat (PKM)</h6>
                    </div>
                    <div className="row justify-content-between mb-4">
                      <div className="col-4">
                        <div className="align-middle">
                          <Link href={`/PkM/daftarpkm/`}>
                            <button className=" btn btn-primary border-0 shadow-sm pe-3 ps-3 me-3 mt-3 mb-0">
                              Daftar Tabel
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-row-reverse">
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button btn btn-success mt-3"
                          table="tabelpkm"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Export Excel" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-body p-3">
                  <div className="table-responsive p-0"></div>
                  <table id="tabelpkm" border="1">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama Dosen</th>
                        <th>Tema PKM Sesuai Roadmap</th>
                        <th>Nama Mahasiswa</th>
                        <th>Judul Kegiatan</th>
                        <th>Tahun <br/>(YYYY)</th>
                      </tr>
                    </thead>

                    <tbody>
                      {tampilPKM.map((tPKM, number) => {
                        return (
                          <tr key={`tPKM` + tPKM.id}>
                            <th>
                              <p className="mb-0 text-sm">{number + 1}</p>
                            </th>


                            <th>
                              {tPKM.anggota_dosens.map((anggota_dosens) => {
                                return (
                                  <p className="mb-0 text-sm text-center" key='anggota.id'>
                                    {anggota_dosens.NamaDosen}
                                  </p>
                                );
                              })}
                            </th>

                            <th className="align-middle ">
                              <p className="mb-0 text-sm text-center">
                                {tPKM.tema_sesuai_roadmap}
                              </p>
                            </th>

                            <th>
                              {tPKM.anggota_mahasiswas.map((anggota_mahasiswas) => {
                                return (
                                  <p className="mb-0 text-sm text-center" key='anggota.id'>
                                    {anggota_mahasiswas.nama}
                                  </p>
                                );
                              })}
                            </th>

                            <th>
                              <p className="mb-0 text-sm text-center">
                                {tPKM.judul_kegiatan}
                              </p>
                            </th>

                            <th className="mb-0 text-sm text-center">
                              <p className="mb-0 text-sm">
                                {tPKM.tahun}
                              </p>
                            </th>


                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
