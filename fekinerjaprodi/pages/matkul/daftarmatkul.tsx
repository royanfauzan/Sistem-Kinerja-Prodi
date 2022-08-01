import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
export default function daftarmatkul() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [matkul, setmatkul] = useState([]);

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

  const deletematkul = (id) => {
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
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Tabel Mata Kuliah</h6>
                    </div>
                    <div className="row justify-content-between mb-4">
                      <div className="col-4">
                        <div className="align-middle">
                          <Link href={`/matkul/inputmatkul/`}>
                            <button className=" btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
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
                            Nama Mata Kuliah
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            SKS
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {matkul.map((matakuliah, number) => {
                          return (
                            <tr key={`matakuliah` + matakuliah.id}>

                              <td className="ps-2">
                                <h6 className="mb-0 text-sm">{number + 1}</h6>
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


                              <td className="align-middle pe-3 text-end">
                                <Link href={`/matkul/edit/${matakuliah.id}`}>
                                  <button className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

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