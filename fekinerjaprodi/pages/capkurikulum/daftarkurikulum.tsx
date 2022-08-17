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

export default function daftarkurikulum() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [capkurikulum, setcapkurikulum] = useState([]);
  const MySwal = withReactContent(Swal);
  
  const [dataRole, setRole] = useState('');

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/CapaianKurikulum",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_capkurikulum } = response.data;
        setcapkurikulum(all_capkurikulum);

        console.log(all_capkurikulum);
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
        const {role} = response.data.user;
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

  const tambahcapkurikulum = () => {
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
        router.push(`/capkurikulum/capkurikulum`);
      }
    });
  };

  const exportcapkurikulum = () => {
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
        router.push(`/capkurikulum/export/exportcapkurikulum`);
      }
    });
  };

  const editcapkurikulum = (id) => {
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
        router.push(`/capkurikulum/edit/${id}`);
      }
    });
  };


  const deletecapkurikulum = (id) => {
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
          url: `http://127.0.0.1:8000/api/CapaianKurikulum_Delete/${id}`,
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

  const searchdata= async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/CapaianKurikulum/`)
      const res = await req.data.all_capkurikulum
      setcapkurikulum(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/CapaianKurikulum_search/${e.target.value}`
      )
      const res = await req.data.searchcapkurikulum
      setcapkurikulum(res)
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
                  <h6>Tabel Daftar Kurikulum</h6>
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
                <div className="col-4 ms-3">
                      <td className="align-middle">
                        <button
                          onClick={() => tambahcapkurikulum()}
                          className="btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0"
                        >
                          Tambah Data
                        </button>
                      </td>
                    </div>
                    
                    <div className="col-4 d-flex flex-row-reverse">
                      <td className="align-middle">
                        <button
                          onClick={() => exportcapkurikulum()}
                          className="btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0"
                        >
                          Export Data
                        </button>
                      </td>
                    </div>
                </div>
                <div className="card-body p-3">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            NO
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Prodi
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Mata Kuliah
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Semester
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Tahun
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Mata Kuliah Kompotensi
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Kuliah Responsi Tutorial
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Seminar
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Praktikum
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Konversi Kredit Jam
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Sikap
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Pengetahuan
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Ketrampilan Umum
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Ketrampilan Khusus
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Dokumen Rencana Pembelajaran
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Unit Penyelenggara
                          </th>
                          
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {capkurikulum.map((kurikulum, number) => {
                          return (
                            <tr key={`kurikulum` + kurikulum.id}>

                              <td className="ps-3">
                                <p className="mb-0 text-sm ">{number + 1}</p>
                              </td>

                              <td className="align-middle text-sm" >
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {kurikulum.prodi.prodi + ' ' + kurikulum.prodi.nama_prodi}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {kurikulum.matkul.nama_matkul}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {kurikulum.semester}
                                </p>
                              </td>

                              <td className="align-middle  text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {kurikulum.tahun}
                                </p>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.mata_kuliah_kompetensi}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.kuliah_responsi_tutorial}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.seminar}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.praktikum}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.konversi_kredit_jam}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.sikap}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.pengetahuan}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.ketrampilan_umum}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.ketrampilan_khusus}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.dok_ren_pembelajaran}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle  text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0 pe-3">
                                    {kurikulum.unit_penyelenggara}
                                  </p>
                                </span>
                              </td>

                              <td className="align-middle pe-3 text-end">

                                <button
                                  onClick={() => editcapkurikulum(kurikulum.id)}
                                  className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() => deletecapkurikulum(kurikulum.id)}
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