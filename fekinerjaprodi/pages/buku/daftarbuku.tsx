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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function daftarprestasi() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [profilDosen, setprofilDosen] = useState([]);
  const [dataRole, setRole] = useState("");
  const MySwal = withReactContent(Swal);

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

  const editipk = (id) => {
    MySwal.fire({
      title: "Edit Data",
      text: "Apakah kalian yakin? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Iya !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/buku/edit/${id}`);
      }
    });
  };

  const tambahipk = () => {
    MySwal.fire({
      title: "Tambah Data",
      text: "Apakah anda yakin? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/buku/inputbuku`);
      }
    });
  };

  const exportKjs = () => {
    MySwal.fire({
      title: "Export Data",
      text: "Apakah anda yakin? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Iya !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/buku/exportbuku/export_buku`);
      }
    });
  };

  const deleteipk = (id) => {
    MySwal.fire({
      title: "Apakah anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, hapus ini!",
    }).then((result) => {
      // <--
      if (result.isConfirmed) {
        // <-- if confirmed
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
      }
    });
  };

  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/buku/`);
      const res = await req.data.all_buku;
      setprofilDosen(res);
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/cari_buku/${e.target.value}`
      );
      const res = await req.data.searchbuku;
      setprofilDosen(res);
    }
  };


  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="col-4">
                    <h6>Authors table</h6>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-2 d-flex flex-row-reverse pe-2">
                      <input
                        className="form-control d-flex flex-row-reverse me-2"
                        type="search"
                        placeholder="Search.."
                        aria-label="Search"
                        defaultValue=""
                        id="search"
                        onChange={searchdata}
                      />
                    </div>
                  </div>

                  <div className="row justify-content-between mb-4">
                    <div className="col-4">
                      <td className="align-middle">
                        <button
                          onClick={() => tambahipk()}
                          className="btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0"
                        >
                          Tambah Data
                        </button>
                      </td>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      <td className="align-middle">
                        <button
                          onClick={() => exportKjs()}
                          className="btn btn-success border-0 shadow-sm ps-3 ps-3 me-2 mt-3 mb-0"
                        >
                          Export
                        </button>
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
                            Mahasiswa
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

                              <td>
                                {bku.anggota_mahasiswas.map(
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
                              <button
                                  onClick={() => editipk(bku.id)}
                                  className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 mt-2 me-2"
                                >
                                  EDIT
                                </button>

                                <Link href={`/buku/pilih/${bku.id}`}>
                                  <button className="btn btn-sm btn-success border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Pilih mahasiswa
                                  </button>
                                </Link>

                                <Link href={`/buku/hapus/${bku.id}`}>
                                  <button className="btn btn-sm btn-warning border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Hapus mahasiswa
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deleteipk(bku.id)}
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
