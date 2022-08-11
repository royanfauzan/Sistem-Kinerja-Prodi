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

export default function daftarmhs() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [mahasiswa, setmahasiswa] = useState([]);
  const MySwal = withReactContent(Swal)

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Mahasiswa",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_mhs } = response.data;
        setmahasiswa(all_mhs);

        console.log(all_mhs);
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

  const deletemhs = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/Mahasiswa_Delete/${id}`,
    })
      .then(function (response) {
        router.reload();
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  };

  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/Mahasiswa/`)
      const res = await req.data.all_mhs
      setmahasiswa(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/Mahasiswa_search/${e.target.value}`
      )
      const res = await req.data.searchmahasiswa
      setmahasiswa(res)
    }
  }

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0 mb-3">
                  <h6>Tabel Daftar Mahasiswa</h6>
                </div>
                <div className="row justify-content-between mb-4">
                <div className="col-4">
                    <div className="align-middle">
                      <Link href={`/mahasiswa/inputmhs/`}>
                        <button className=" btn btn-primary border-0 shadow-sm ms-3 ps-3 pe-3 ps-3 me-3 mb-0">
                          Tambah Data
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-3 d-flex flex-row-reverse me-3">
                    <input
                      className="form-control d-flex flex-row-reverse me-2"
                      type="search"
                      placeholder="search.."
                      defaultValue=""
                      id="search"
                      onChange={searchdata}
                    />
                  </div>
                  
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0 table table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">
                            NO
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            NIM Mahasiswa
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Nama Mahasiswa
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {mahasiswa.map((kurikulum, number) => {
                          return (
                            <tr key={`kurikulum` + kurikulum.id}>

                              <td className="ps-2">
                                <p className="mb-0 text-sm ms-3 ">{number + 1}</p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {kurikulum.nim}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {kurikulum.nama}
                                </p>
                              </td>

                              <td className="align-middle pe-3 text-end">
                                <Link href={`/mahasiswa/edit/${kurikulum.id}`}>
                                  <button className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deletemhs(kurikulum.id)}
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