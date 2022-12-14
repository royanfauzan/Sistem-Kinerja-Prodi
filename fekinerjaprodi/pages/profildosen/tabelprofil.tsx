import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function tabelprofil() {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
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

  const deleteProfil = (id,nama) => {
    MySwal.fire({
      title: `Yakin akan menghapus profile ${nama}?`,
      text: "Data berkaitan dengan profil ini akan dihapus secara Permanen!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
    }).then((result) => {
      // <--
      if (result.isConfirmed) {
        // <-- if confirmed
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/delete_profildosen/${id}`,
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
  const editKjs = (id) => {
    router.push(`/profildosen/edit/${id}`);
  };
  const tambahKjs = () => {
    router.push(`/profildosen/inputprofil`);
  };
  const exportKjs = () => {
    MySwal.fire({
      title: "EXport",
      text: "Are you sure? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/kerjasama/export_kerjasama/export_kjs`);
      }
    });
  };
  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/search_profil/`);
      const res = await req.data.profilDosens;
      setprofilDosen(res);
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/search_profil/${e.target.value}`
      );
      const res = await req.data.profilDosens;
      setprofilDosen(res);
    }
  };
  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className=" container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="card-header pb-0 px-3">
                    <div className="row">
                      <div className="col-4">
                        <h4>Tabel Profil Dosen</h4>
                      </div>
                    </div>

                    <div className="row justify-content-between mb-4">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-7">
                            <div className="form-group">
                              <input
                                className="form-control d-flex flex-row-reverse me-2 mt-3 mb-0"
                                type="search"
                                placeholder="Search.."
                                aria-label="Search"
                                defaultValue=""
                                id="search"
                                onChange={searchdata}
                              />
                            </div>
                          </div>
                          <div className="col-5 d-flex justify-content-start">
                            <button className=" btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-0 me-3 mt-3 ">
                              Tampil Data
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col-4 d-flex flex-row-reverse">
                            
                          </div>

                          <div className="col-8 d-flex justify-content-end">
                          <Link href={`/profildosen/inputprofil/`}>
                              <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                                Tambah Data
                              </button>
                            </Link>
                            <Link
                              href={`/dtps/export`}
                            >
                              <button className=" btn btn-outline-success shadow-sm ps-3 ps-3 me-2 mt-3 mb-0">
                                Cek Laporan
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0 mx-4">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            NIDK/NIDN
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Nama Dosen
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Status Dosen
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Jabatan Akademik
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            NIK
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Email
                          </th>
                          <th className="text-uppercase text-dark text-xs text-center font-weight-bolder opacity-9 ps-2">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {profilDosen.map((pDsn) => {
                          return (
                            <tr
                              className="text-center"
                              key={`tkerjasama` + pDsn.id}
                            >
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {pDsn.NIDK}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {pDsn.NamaDosen}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {pDsn.StatusDosen}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {pDsn.JabatanAkademik}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {pDsn.NIK}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {pDsn.Email}
                                </p>
                              </td>

                              <td className="align-middle pe-3 text-end">
                                <Link href={`/profildosen/edit/${pDsn.id}`}>
                                  <button className="btn btn-sm btn-warning border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <Link href={`/profildosen/lihatprofil/${pDsn.NIDK}`}>
                                  <button className="btn btn-sm btn-outline-success border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Selengkapnya
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deleteProfil(pDsn.id,pDsn.NamaDosen)}
                                  className="btn btn-sm btn-outline-danger shadow-sm ps-3 pe-3 mb-2 mt-2"
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
