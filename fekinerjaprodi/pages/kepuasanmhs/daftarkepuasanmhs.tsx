import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from 'next/link';
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function daftarkepuasanmhs() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [kepuasanmhs, setkepuasanmhs] = useState([]);
  const MySwal = withReactContent(Swal)

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/KepuasanMHS",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_mhs } = response.data;
        setkepuasanmhs(all_mhs);

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

  const deletekepuasanmhs = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/KepuasanMHS_Delete/${id}`,
    })
      .then(function (response) {
        router.reload();
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  };

  const searchdata= async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/KepuasanMHS/`)
      const res = await req.data.all_mhs
      setkepuasanmhs(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/KepuasanMHS_search/${e.target.value}`
      )
      const res = await req.data.searchkepuasanmhs
      setkepuasanmhs(res)
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
                <style jsx>{`
                  table,
                  td,
                  th {
                    border: 1px solid !important ;
                    text-align: center;
                  }

                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                `}</style>
                <div className="card-header">
                  <h6>Tabel Kepuasan Mahasiswa</h6>
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
                    <div className="align-middle">
                      <Link href={`/kepuasanmhs/inputkepuasanmhs/`}>
                        <button className=" btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                          Tambah Data
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-4 d-flex flex-row-reverse">
                    <div className="align-middle">
                      <Link href={`/kepuasanmhs/export/exportkepuasanmhs/`}>
                        <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                          Export Tabel
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0 table-hover" border="1">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4" rowspan="2">NO</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4" rowspan="2">Prodi</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4" rowspan="2">Tahun</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4" colspan="5">Keandalan</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4" colspan="5">Daya Tanggap</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4" colspan="5">Kepastian</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4" colspan="5">Empati</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4" colspan="5">Tangible</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4" rowspan="2">Aksi</th>
                        </tr>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Sangat Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Cukup</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Kurang</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Tindakan yang dilakukan</th>

                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Sangat Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Cukup</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Kurang</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Tindakan yang dilakukan</th>

                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Sangat Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Cukup</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Kurang</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Tindakan yang dilakukan</th>

                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Sangat Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Cukup</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Kurang</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Tindakan yang dilakukan</th>

                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Sangat Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Baik</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Cukup</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Kurang</th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-4">Tindakan yang dilakukan</th>

                        </tr>
                      </thead>

                      <tbody>
                        {kepuasanmhs.map((kpsnmhs, number) => {
                          return (
                            <tr>
                              <td className="ps-3 pe-3">
                                <p className="mb-0 text-sm ">{number + 1}</p>
                              </td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.prodi.prodi + ' ' + kpsnmhs.prodi.nama_prodi}
                              </p></td>

                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tahun}
                              </p></td>

                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.keandalan_4}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.keandalan_3}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.keandalan_2}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.keandalan_1}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_keandalan}
                              </p></td>

                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.dayatanggap_4}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.dayatanggap_3}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.dayatanggap_2}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.dayatanggap_1}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_dayatanggap}
                              </p></td>

                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.kepastian_4}</p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.kepastian_3}</p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.kepastian_2}</p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.kepastian_1}</p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_kepastian}</p></td>

                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.empati_4}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.empati_3}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.empati_2}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.empati_1}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_empati}
                              </p></td>

                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tangible_4}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tangible_3}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tangible_2}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tangible_1}
                              </p></td>
                              <td><p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_tangible}
                              </p></td>

                              <td className="align-middle pe-3">
                                <Link href={`/kepuasanmhs/edit/${kpsnmhs.id}`}>
                                  <button className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deletekepuasanmhs(kpsnmhs.id)}
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