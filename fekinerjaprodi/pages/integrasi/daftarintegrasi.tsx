import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";

export default function daftarintgrs() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [integrasi, setintegrasi] = useState([]);

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Integrasi",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_integrasi } = response.data;
        setintegrasi(all_integrasi);

        console.log(all_integrasi);
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

  const deleteintegrasi = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/Integrasi_Delete/${id}`,
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
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="col-4 ms-3 mt-3">
                  <h6>Tabel Mata Kuliah</h6>
                </div>
                <div className="row justify-content-between mb-4">
                  <div className="col-4">
                    <div className="align-middle">
                      <Link href={`/integrasi/inputintegrasi/`}>
                        <button className=" btn btn-primary border-0 shadow-sm ms-3 ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                          Tambah Data
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-4 d-flex flex-row-reverse">
                    <div className="align-middle">
                      <Link href={`/matkul/export/exportmatkul/`}>
                        <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                          Export Tabel
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="table-responsive p-0">
                    <table  className="table align-items-center mb-0 table table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            NO
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Profil Dosen
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Penelitian
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            PkM
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Mata Kuliah
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Bentuk Integrasi
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Tahun
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            File Bukti
                          </th>


                          <th className="text-dark opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {integrasi.map((intgrs, number) => {
                          return (
                            <tr key={`intgrs` + intgrs.id}>
                              
                              <td className="ps-3 pe-3">
                                <h6 className="mb-0 text-sm">{number + 1}</h6>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {intgrs.profil_dosen.NamaDosen + ' ' + intgrs.profil_dosen.NIK}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {intgrs.penelitian.tema_sesuai_roadmap + ' ' + intgrs.penelitian.judul}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {intgrs.pkm.tema_sesuai_roadmap + ' ' + intgrs.pkm.judul_kegiatan}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {intgrs.matkul.nama_matkul + ' ' + intgrs.matkul.sks}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {intgrs.bentuk_integrasi}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm ">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {intgrs.tahun}
                                </p>
                              </td>
                              <td  className="align-middle text-sm">
                                <span className="text-dark text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {intgrs.file_bukti}
                                  </p>
                                </span>
                              </td>

                              <td className="align-middle pe-3 text-end">
                                <Link href={`/integrasi/edit/${intgrs.id}`}>
                                  <button className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deleteintegrasi(intgrs.id)}
                                  className="btn btn-sm btn-danger border-0 shadow-sm ps-3 pe-3 mb-2 mt-2"
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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