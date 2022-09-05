import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

export default function daftarpresentase() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [profilDosen, setprofilDosen] = useState([]);
  const [dataRole, setRole] = useState("");

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/presentase",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_presentase } = response.data;
        setprofilDosen(all_presentase);

        console.log(all_presentase);
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

  const deletepresentase = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/delete_presentase/${id}`,
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
      const req = await axios.get(`http://127.0.0.1:8000/api/presentase/`);
      const res = await req.data.all_presentase;
      setprofilDosen(res);
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/presentase/${e.target.value}`
      );
      const res = await req.data.searchpresentase;
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
                <div className="card-header pb-0 px-3">
                  <div className="row">
                    <div className="col-4">
                      <h6>Authors table</h6>
                    </div>
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
                        <Link href={`/presentase/inputpresentase/`}>
                          <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                            Tambah Data
                          </button>
                        </Link>
                      </td>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      <td className="align-middle">
                        <Link href={`/presentase/export/export_presentase`}>
                          <button className=" btn btn-success border-0 shadow-sm ps-3 ps-3 me-2 mt-3 mb-0">
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
                            Tahun Kepuasan
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Sangat Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Cukup
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Kurang
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Tindak Etika
                          </th>

                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Sangat Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Cukup
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Kurang
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Tindak Keahlian Bidang
                          </th>

                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Sangat Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Cukup
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Kurang
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Tindak Bahasa Asing
                          </th>

                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Sangat Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Cukup
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Kurang
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Tindak Penggunaan TI
                          </th>

                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Sangat Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Cukup
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Kurang
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Tindak Komunikasi
                          </th>

                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Sangat Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Cukup
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Kurang
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Tindak Kerjasama
                          </th>

                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Sangat Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                          Baik
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Cukup
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Kurang
                          </th>
                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2">
                            Tindak Pengembangan Diri
                          </th>

                          <th className=" text-uppercase text-dark text-xs fw-bolder opacity-9 ps-2 pe-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {profilDosen.map((prsntse, number) => {
                          return (
                            <tr key={`prsntse` + prsntse.id}>
                              <td>
                                <h6 className="mb-0 text-sm ps-2">
                                  {number + 1}
                                </h6>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.kepuasan.tahun}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.etika_4}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.etika_3}
                                </p>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.etika_2}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.etika_1}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.tindak_etika}
                                  </p>
                                </span>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.keahlian_bidang_4}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.keahlian_bidang_3}
                                </p>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.keahlian_bidang_2}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.keahlian_bidang_1}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.tindak_bidang}
                                  </p>
                                </span>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.bhs_asing_4}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.bhs_asing_3}
                                </p>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.bhs_asing_2}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.bhs_asing_1}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.tindak_bhs}
                                  </p>
                                </span>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.penggunaan_ti_4}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.penggunaan_ti_3}
                                </p>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.penggunaan_ti_2}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.penggunaan_ti_1}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.tindak_ti}
                                  </p>
                                </span>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.komunikasi_4}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.komunikasi_3}
                                </p>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.komunikasi_2}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.komunikasi_1}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.tindak_komunikasi}
                                  </p>
                                </span>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.kerjasama_4}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.kerjasama_3}
                                </p>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.kerjasama_2}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.kerjasama_1}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.tindak_kerjasama}
                                  </p>
                                </span>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.pengembangan_diri_4}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prsntse.pengembangan_diri_3}
                                </p>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.pengembangan_diri_2}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.pengembangan_diri_1}
                                  </p>
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {prsntse.tindak_pengembangan}
                                  </p>
                                </span>
                              </td>

                              <td className="align-middle pe-3 me-3">
                                <Link href={`/presentase/edit/${prsntse.id}`}>
                                  <button className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deletepresentase(prsntse.id)}
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
