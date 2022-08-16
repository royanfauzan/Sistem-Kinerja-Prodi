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

export default function daftarpenelitian() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [penelitian, setpenelitian] = useState([]);
  const MySwal = withReactContent(Swal);
  const [dataRole, setRole] = useState("");

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Penelitian",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_penelitian } = response.data;
        setpenelitian(all_penelitian);

        console.log(all_penelitian);
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

  const deletepenelitian = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/Penelitian_Delete/${id}`,
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
      const req = await axios.get(`http://127.0.0.1:8000/api/Penelitian/`)
      const res = await req.data.all_penelitian
      setpenelitian(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/Penelitian_search/${e.target.value}`
      )
      const res = await req.data.searchpenelitian
      setpenelitian(res)
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
                  <h6>Tabel Penelitian</h6>
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
                  <div className="col-4">
                    <div className="align-middle">
                      <Link href={`/penelitian/inputpenelitian/`}>
                        <button className=" btn btn-primary border-0 shadow-sm ms-3 ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                          Tambah Data
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-4 d-flex flex-row-reverse">
                    <div className="align-middle">
                      <Link href={`/penelitian/export/exportpenelitian/`}>
                        <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                          Export Tabel
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0 table table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            NO
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Nama Dosen
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Nama Mahasiswa
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Tema Sesuai Roadmap
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Judul Kegiatan
                          </th>

                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Tahun
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Sumber Dana PT Mandiri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Dana PT Mandiri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Sumber Dalam Negri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Dana Dalam Negri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Sumber Luar Negri
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                            Dana Dalam Negri
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {penelitian.map((penelitian, number) => {
                          return (
                            <tr key={`penelitian` + penelitian.id}>

                              <td className="ps-3 pe-3">
                                <p className="mb-0 text-sm">{number + 1}</p>
                              </td>

                              <td>
                                {penelitian.anggota_dosens.map(
                                  (anggota_dosens) => {
                                    return (
                                      <p className="text-xs font-weight-bold mb-0 ps-2 pe-3 " key='anggota.id'>
                                        {anggota_dosens.NamaDosen}
                                      </p>
                                    );
                                  })}
                              </td>

                              <td>
                                {penelitian.anggota_mahasiswas.map((anggota_mahasiswas) => {
                                  return (
                                    <p className="text-xs font-weight-bold mb-0 ps-2 pe-3 " key='anggota.id'>
                                      {anggota_mahasiswas.nama}
                                    </p>
                                  );
                                })}
                              </td>

                              <td >
                                <p className="text-xs font-weight-bold mb-0 ps-2 pe-3">
                                  {penelitian.tema_sesuai_roadmap}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 ps-2 pe-3">
                                  {penelitian.judul}
                                </p>
                              </td>



                              <td>
                                <p className="text-xs font-weight-bold mb-0 ps-2 pe-3">
                                  {penelitian.tahun}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 ps-2 pe-3">
                                  {penelitian.sumber_dana_PT_mandiri}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 ps-2 pe-3">
                                  {penelitian.dana_PT_mandiri}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 ps-2 pe-3">
                                  {penelitian.sumber_dalam_negri}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 ps-2 pe-3">
                                  {penelitian.dana_dalam_negri}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 ps-2 pe-3">
                                  {penelitian.sumber_luar_negri}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0 ps-2 pe-3">
                                  {penelitian.dana_luar_negri}
                                </p>
                              </td>

                              <td className="align-middle pe-3 justify-content-evenly">
                                <tr>
                                  <Link href={`/penelitian/edit/${penelitian.id}`}>
                                    <button className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                      Edit Penelitian
                                    </button>
                                  </Link>

                                  <button
                                    onClick={() => deletepenelitian(penelitian.id)}
                                    className="btn btn-sm btn-danger border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2"
                                  >
                                    Hapus Pnelitian
                                  </button>

                                  <Link href={`/penelitian/pilih_dosen/${penelitian.id}`}>
                                    <button className="btn btn-sm btn-info border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                      Pilih Dosen
                                    </button>
                                  </Link>
                                </tr>

                                <tr>
                                  <Link href={`/penelitian/pilih_mahasiswa/${penelitian.id}`}>
                                    <button className="btn btn-sm btn-dark border-0 shadow-sm  ps-3 pe-3 mb-3 me-3 mt-3">
                                      Pilih mahasiswa
                                    </button>
                                  </Link>

                                  <Link href={`/penelitian/hapusmhs/${penelitian.id}`}>
                                    <button className="btn btn-sm btn-secondary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                      Hapus mahasiswa
                                    </button>
                                  </Link>

                                  <Link href={`/penelitian/hapusdosen/${penelitian.id}`}>
                                    <button className="btn btn-sm btn-warning border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                      Hapus Dosen
                                    </button>
                                  </Link>

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