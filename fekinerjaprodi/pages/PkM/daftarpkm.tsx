import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";

export default function daftarpkm() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [pkm, setpkm] = useState([]);

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
        setpkm(all_pkm);

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

  const deletepkm = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/PKM_Delete/${id}`,
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
                <div className="card-header pb-0">
                  <h6>Tabel Pengabdian Kepada Masyarakat (PKM)</h6>
                </div>
                <div className="row justify-content-between mb-4">
                  <div className="col-4 mx-3">
                    <div className="align-middle">
                      <Link href={`/PkM/inputpkm/`}>
                        <button className=" btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                          Tambah Data
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-4 d-flex flex-row-reverse">
                    <div className="align-middle">
                      <Link href={`/PkM/export/exportpkm/`}>
                        <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                          Export Tabel
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0 table table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            NO
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Tema Sesuai Roadmap
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Judul Kegiatan
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Lokasi
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Tahun
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Sumber Dana PT Mandiri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Dana PT Mandiri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Sumber Dalam Negri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Dana Dalam Negri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Sumber Luar Negri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Dana Dalam Negri
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {pkm.map((pkm, number) => {
                          return (
                            <tr key={`pkm` + pkm.id}>

                              <td className="ps-2">
                                <h6 className="mb-0 text-sm">{number + 1}</h6>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.tema_sesuai_roadmap}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.judul_kegiatan}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.lokasi}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.tahun}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.sumber_dana_PT_mandiri}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.dana_PT_Mandiri}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.sumber_dalam_negri}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.dana_dalam_negri}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.sumber_luar_negri}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {pkm.dana_luar_negri}
                                </p>
                              </td>

                              <td className="align-middle pe-3">
                                <Link href={`/PkM/edit/${pkm.id}`}>
                                  <button className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deletepkm(pkm.id)}
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