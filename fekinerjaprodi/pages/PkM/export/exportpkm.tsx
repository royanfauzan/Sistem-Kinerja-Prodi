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

  // const deletePenerimaan = (id) => {
  //   axios({
  //     method: "post",
  //     url: `http://127.0.0.1:8000/api/delete_penerimaan_mahasiswa/${id}`,
  //   })
  //     .then(function (response) {
  //       router.reload();
  //     })
  //     .catch(function (err) {
  //       console.log("gagal");
  //       console.log(err.response);
  //     });
  // };

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                    <h6>Export Pengabdian Kepada Masyarakat (PKM)</h6>
                    </div>
                    <div className="row justify-content-between mb-4">
                    <div className="col-4">
                      <div className="align-middle">
                        <Link href={`/PkM/daftarpkm/`}>
                          <button className=" btn btn-primary border-0 shadow-sm ps-3 ps-3 me-3 mt-3 mb-0">
                            Daftar Tabel
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      <div className="align-middle">
                        <Link href={`/PkM/export/exportpkm`}>
                          <button className=" btn btn-success border-0 shadow-sm ps-3 mt-3 mb-0">
                            Export Excel
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
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
                <div className="card-body p-3">
                  <div className="table-responsive p-0"></div>
                  <table id="tabelpkm" border="1">
                    <thead>
                      <tr>
                        <th rowspan="2">No</th>
                        <th rowspan="2">Nama Dosen</th>
                        <th rowspan="2">Tema PKM Sesuai Roadmap</th>
                        <th rowspan="2">Nama Mahasiswa</th>
                        <th rowspan="2">Judul Kegiatan</th>
                        <th rowspan="2">Tahun (YYYY)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tampilPKM.map((tPKM, number) => {
                        return (
                          <tr key={`tPKM` + tPKM.id}>
                            <td>
                              <h6 className="mb-0 text-sm">{number + 1}</h6>
                            </td>

                            <td>
                              <h6 className="mb-0 text-sm">
                                {tPKM.profil_dosen.NamaDosen}
                              </h6>
                            </td>

                            <td className="align-middle ">
                              <h6 className="mb-0 text-sm">
                                {tPKM.tema_sesuai_roadmap}
                              </h6>
                            </td>

                            <td>
                              <h6 className="mb-0 text-sm">
                                {tPKM.nama}
                              </h6>
                            </td>

                            <td>
                              <h6 className="mb-0 text-sm">
                                {tPKM.judul_kegiatan}
                              </h6>
                            </td>

                            <td className="align-middle ">
                              <h6 className="mb-0 text-sm">
                                {tPKM.tahun}
                              </h6>
                            </td>


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
