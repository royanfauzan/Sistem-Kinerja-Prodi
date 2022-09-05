import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function daftarprestasi() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [profilDosen, setprofilDosen] = useState([]);
  const [dataRole, setRole] = useState("");

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/buku",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_buku } = response.data;
        setprofilDosen(all_buku);

        console.log(all_buku);
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

  const deletebuku = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/deletemahasiswa_buku/${id}`,
    })
      .then(function (response) {
        router.reload();
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  };

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
                    border: 2px solid !important;
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
                      <h6>Authors table</h6>
                    </div>

                    <div className="row justify-content-between mb-4">
                      <div className="col-4">
                        <Link href={`/buku/daftarbuku/`}>
                          <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                            Daftar Tabel
                          </button>
                        </Link>
                      </div>
                      <div className="col-4 d-flex flex-row-reverse">
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button btn btn-success mt-3"
                          table="tableprint"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Export Excel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-3">
                    {
                      <table
                        border="2"
                        className="table align-items-center mb-0"
                        id="tableprint"
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th >Nama Mahasiswa</th>
                            <th>Judul Artikel yang Disitasi (Jurnal, Volume, Tahun, Nomor, Halaman) </th>
                            <th>Jumlah Sitasi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profilDosen.map((kpsn, number) => {
                            return (
                              <tr key={`kpsn` + kpsn.id}>
                                <th>
                                  <p className="mb-0 text-sm font-weight-bold">{number + 1}</p>
                                </th>

                                <td>
                                {kpsn.anggota_mahasiswas.map(
                                  (anggota_mahasiswas) => {
                                    return (
                                      <p
                                        className="mb-0 text-sm"
                                        key="anggota.id"
                                      >
                                        {anggota_mahasiswas.nama}
                                      </p>
                                    );
                                  }
                                )}
                              </td>

                                <th className="align-middle  text-sm">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {kpsn.nm_jurnal +
                                    ", " +
                                    kpsn.volume +
                                    ", " +
                                    kpsn.tahun +
                                    ", " +
                                    kpsn.nomor +
                                    ", " +
                                    kpsn.halaman}
                                  </p>
                                </th>

                                <th className="align-middle  text-sm">
                                  <p className="text-xs text-center font-weight-bold mb-0">
                                    {kpsn.sitasi}
                                  </p>
                                </th>
                                
                              </tr>
                              
                            );
                          })}
                        </tbody>
                      </table>
                    }
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
