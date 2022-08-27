import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function daftarpkm() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [pkm, setpkm] = useState([]);
  const MySwal = withReactContent(Swal);

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
        const { role } = response.data.user;
        setRole(role);
        // kalo ga admin dipindah ke halaman lain
        if (level_akses < 2) {
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

  const pilihdosen = (id) => {
    MySwal.fire({
      title: "Pilih Dosen",
      text: "Apakah anda yakin? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/PkM/pilihdosen/${id}`);
      }
    });
  };

  const pilihmhs = (id) => {
    MySwal.fire({
      title: "Pilih Mahasiswa",
      text: "Apakah anda yakin? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/PkM/pilih_mhs/${id}`);
      }
    });
  };

  const hapusdosen = (id) => {
    MySwal.fire({
      title: "Hapus Dosen",
      text: "Apakah anda yakin? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/PkM/hapusdosen/${id}`);
      }
    });
  };

  const hapusmhs = (id) => {
    MySwal.fire({
      title: "Hapus Mahasiswa",
      text: "Apakah anda yakin? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/PkM/hapusmhs/${id}`);
      }
    });
  };

  const tambahpkm = () => {
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
        router.push(`/PkM/inputpkm`);
      }
    });
  };

  const exportpkm = () => {
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
        if (dataRole=='admin') {
          router.push(`/pkmdosen/export/pkmdexport`);
        }else{
          router.push(`/PkM/export/exportpkm`);
        }
        
      }
    });
  };

  const editpkm = (id) => {
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
        router.push(`/PkM/edit/${id}`);
      }
    });
  };

  const deletepkm = (id) => {
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
          url: `http://127.0.0.1:8000/api/PKM_Delete/${id}`,
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
      const req = await axios.get(`http://127.0.0.1:8000/api/PKM/`)
      const res = await req.data.all_pkm
      setpkm(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/PKM_search/${e.target.value}`
      )
      const res = await req.data.searchpkm
      setpkm(res)
    }
  }

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Tabel Pengabdian Kepada Masyarakat (PKM)</h6>
                </div>
                <div className="row justify-content-end">
                  <div className="col-3 d-flex flex-row-reverse pe-2">
                    <input
                      className="form-control d-flex flex-row-reverse me-3"
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
                  <div className="col-5 mx-3">
                    <div className="col-5">
                      <td className="align-middle">
                        <button
                          onClick={() => tambahpkm()}
                          className="btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0"
                        >
                          Tambah Data
                        </button>
                      </td>
                    </div>
                  </div>
                  <div className="col-4 d-flex flex-row-reverse">
                    <td className="align-middle">
                      <button
                        onClick={() => exportpkm()}
                        className="btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0"
                      >
                        Export Data
                      </button>
                    </td>
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
                            Nama Dosen
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Nama Mahasiswa
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
                            Dana Luar Negri
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {pkm.map((pkm, number) => {
                          return (
                            <tr key={`pkm` + pkm.id}>

                              <td className="ps-2">
                                <p className="mb-0 text-sm">{number + 1}</p>
                              </td>

                              <td>
                                {pkm.anggota_dosens.map(
                                  (anggota_dosens) => {
                                    return (
                                      <p className="text-xs font-weight-bold mb-0 ps-2 pe-3 " key='anggota.id'>
                                        {anggota_dosens.NamaDosen}
                                      </p>
                                    );
                                  })}
                              </td>

                              <td>
                                {pkm.anggota_mahasiswas.map((anggota_mahasiswas) => {
                                  return (
                                    <p className="text-xs font-weight-bold mb-0 ps-2 pe-3 " key='anggota.id'>
                                      {anggota_mahasiswas.nama}
                                    </p>
                                  );
                                })}
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
                                <tr>
                                  <button
                                    onClick={() => editpkm(pkm.id)}
                                    className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 mt-2 me-5"
                                  >
                                    Edit
                                  </button>&emsp;&emsp;&nbsp;

                                  <button
                                    onClick={() => deletepkm(pkm.id)}
                                    className="btn btn-sm btn-danger border-0 shadow-sm ps-3 pe-3 mb-2 mt-2"
                                  >
                                    Hapus
                                  </button>
                                </tr>

                                <tr>
                                  <button
                                    onClick={() => pilihdosen(pkm.id)}
                                    className="btn btn-sm btn-outline-info border-0 shadow-sm ps-3 pe-3 mb-2 mt-2 me-5"
                                  >
                                    Pilih Dosen
                                  </button>

                                  <button
                                    onClick={() => hapusdosen(pkm.id)}
                                    className="btn btn-sm btn-outline-secondary border-0 shadow-sm ps-3 pe-3 mb-2 mt-2"
                                  >
                                    Hapus Dosen
                                  </button>
                                </tr>

                                <tr>
                                <button
                                    onClick={() => pilihmhs(pkm.id)}
                                    className="btn btn-sm btn-outline-dark  border-0 shadow-sm ps-3 pe-3 mb-2 mt-2 me-2"
                                  >
                                    Pilih Mahasiswa
                                  </button>

                                  <button
                                    onClick={() => hapusmhs(pkm.id)}
                                    className="btn btn-sm btn-outline-warning  border-0 shadow-sm mx-2 ps-3 pe-3 mb-2 mt-2"
                                  >
                                    Hapus Mahasiswa
                                  </button>
                                </tr>
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