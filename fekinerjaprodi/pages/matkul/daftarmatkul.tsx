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


export default function daftarmatkul() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [matkul, setmatkul] = useState([]);
  const MySwal = withReactContent(Swal);

  const [dataRole, setRole] = useState("");

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Matkul",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_matkul } = response.data;
        setmatkul(all_matkul);

        console.log(all_matkul);
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
        if (level_akses !== 2) {
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

  const tambahmatkul = () => {
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
        router.push(`/matkul/inputmatkul`);
      }
    });
  };

  const editmatkul = (id) => {
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
        router.push(`/matkul/edit/${id}`);
      }
    });
  };

  const deletematkul= (id) => {
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
          url: `http://127.0.0.1:8000/api/Matkul_Delete/${id}`,
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
      const req = await axios.get(`http://127.0.0.1:8000/api/Matkul/`)
      const res = await req.data.all_matkul
      setmatkul(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/Matkul_search/${e.target.value}`
      )
      const res = await req.data.searchmatkul
      setmatkul(res)
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
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Tabel Mata Kuliah</h6>
                    </div>
                    <div className="row justify-content-end">
                  <div className="col-3 d-flex flex-row-reverse pe-2">
                    <input
                      className="form-control d-flex flex-row-reverse"
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
                      <div className="col-5">
                      <div className="col-5">
                      <td className="align-middle">
                        <button
                          onClick={() => tambahmatkul()}
                          className="btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0"
                        >
                          Tambah Data
                        </button>
                      </td>
                    </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="card-body p-3">
                  <div className="table-responsive p-0">
                    <table id="tabelmatkul" className="table align-items-center mb-0 table table-striped table-hover">
                      <thead>
                        <tr>
                        <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            NO
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Kode Mata Kuliah
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Nama Mata Kuliah
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            SKS
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Program Studi
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {matkul.map((matakuliah, number) => {
                          return (
                            <tr key={`matakuliah` + matakuliah.id}>

                              <td className="ps-2">
                                <p className="mb-0 text-sm">{number + 1}</p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {matakuliah.kode_matkul}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {matakuliah.nama_matkul}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {matakuliah.sks}
                                </p>
                              </td>

                              <td className="align-middle text-sm ps-2">
                                <p className="text-xs font-weight-bold mb-0">
                                  {matakuliah.prodi.prodi + ` ` + matakuliah.prodi.nama_prodi}
                                </p>
                              </td>
                              


                              <td className="align-middle pe-3 text-end">
                                <button 
                                  onClick={() => editmatkul(matakuliah.id)}
                                  className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() => deletematkul(matakuliah.id)}
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