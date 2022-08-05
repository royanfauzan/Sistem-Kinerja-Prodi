import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function daftarprestasi() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [profilDosen, setprofilDosen] = useState([]);

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
      url: `http://127.0.0.1:8000/api/delete_buku/${id}`,
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
                  <div className="col-4">
                    <h6>Authors table</h6>
                  </div>
                  <div className="row justify-content-between mb-4">
                    <div className="col-4">
                      <td className="align-middle">
                        <Link href={`/buku/inputbuku/`}>
                          <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                            Tambah Data
                          </button>
                        </Link>
                      </td>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      <td className="align-middle">
                        <Link
                          href={`/buku/exportbuku/export_buku`}
                        >
                          <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-5 mt-3 mb-0">
                            Export Excel
                          </button>
                        </Link>
                      </td>
                    </div>
                  </div>
                </div>

                <div className="card-body p-3">
                  <div className="table-responsive p-0">
                    <table
                      className="table align-items-center mb-0 table table-striped table-hover"
                      id="tableprint"
                    >
                      <thead>
                        <tr>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            NO
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Judul
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Kategori Jurnal
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Nama Jurnal
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Keterangan
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Volume
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            tahun
                          </th> 
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Nomor
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Halaman
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Sitasi
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2 pe-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {profilDosen.map((bku, number) => {
                          return (
                            <tr key={`bku` + bku.id}>
                              <td>
                                <h6 className="mb-0 text-sm ps-2">
                                  {number + 1}
                                </h6>
                              </td>

                              <td className="align-middle  text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {bku.judul}
                                </p>
                              </td>

                              <td className="align-middle  text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {bku.kategori_jurnal}
                                </p>
                              </td>

                              <td className="align-middle ">
                                <p className="text-xs font-weight-bold mb-0">
                                  {bku.nm_jurnal}
                                </p>
                              </td>

                              <td className="align-middle ">
                                <p className="text-xs font-weight-bold mb-0">
                                  {bku.keterangan}
                                </p>
                              </td>

                              <td className="align-middle ">
                                <p className="text-xs font-weight-bold mb-0">
                                  {bku.volume}
                                </p>
                              </td>

                              <td className="align-middle ">
                                <p className="text-xs font-weight-bold mb-0">
                                  {bku.tahun}
                                </p>
                              </td>

                              <td className="align-middle ">
                                <p className="text-xs font-weight-bold mb-0">
                                  {bku.nomor}
                                </p>
                              </td>

                              <td className="align-middle ">
                                <p className="text-xs font-weight-bold mb-0">
                                  {bku.halaman}
                                </p>
                              </td>

                              <td className="align-middle ">
                                <p className="text-xs font-weight-bold mb-0">
                                  {bku.sitasi}
                                </p>
                              </td>

                              <td className="align-middle pe-0">
                                <Link href={`/buku/edit/${bku.id}`}>
                                  <button className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deletebuku(bku.id)}
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
