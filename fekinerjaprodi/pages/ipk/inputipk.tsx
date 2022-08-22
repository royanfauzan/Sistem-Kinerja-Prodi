import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function inputipk() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);
  const [dataRole, setRole] = useState('');

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Prodi",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { Prodi } = response.data;
        setuserDosens(Prodi);
        console.log(Prodi);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  };

  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
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

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("prodi_id", event.target.prodi.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("jmlh_lulusan", event.target.jmlh_lulusan.value);
    formData.append("ipk_min", event.target.min.value);
    formData.append("ipk_max", event.target.max.value);
    formData.append("ipk_avg", event.target.avg.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/ipk",
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data Berhasil Di Input",
        });

        router.push("../ipk/daftaripk");
      })

      .catch(function (error) {
        //handle error
        setError(error.response.data.error);
        console.log(error.response.data.error);
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Gagal Di Input",
        });
        console.log(error.response);
      });
  };

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-8">
                <form id="inputDetilDosen" onSubmit={submitForm}>
                  <div className="card">
                    <div className="card-header pb-0">
                      <div className="d-flex align-items-center">
                        <p className="mb-0">Input Data</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="text-uppercase text-sm">IPK Mahasiswa</p>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="prodi"
                              className={dataError.prodi_id ? "is-invalid" : ""}
                            >
                              Prodi
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="prodi"
                            >
                              <option value="">Pilih Prodi</option>
                              {userDosens.map((userprodi) => {
                                return (
                                  <option
                                    value={userprodi.id}
                                    key={userprodi.id}
                                  >
                                    {userprodi.prodi +
                                      ` ` +
                                      userprodi.nama_prodi}
                                  </option>
                                );
                              })}
                            </select>
                            {dataError.prodi_id ? (
                              <div className="invalid-feedback">
                                {dataError.prodi_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tahun"
                              className={dataError.tahun ? "is-invalid" : ""}
                            >
                              Tahun
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tahun"
                              id="tahun"
                            />
                            {dataError.tahun ? (
                              <div className="invalid-feedback">
                                {dataError.tahun}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="jmlh_lulusan"
                              className={
                                dataError.jmlh_lulusan ? "is-invalid" : ""
                              }
                            >
                              Jumlah Lulusan
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah Lulusan"
                              id="jmlh_lulusan"
                            />
                            {dataError.jmlh_lulusan ? (
                              <div className="invalid-feedback">
                                {dataError.jmlh_lulusan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold" />
                        <p className="text-uppercase text-sm">
                          Nilai IPK Mahasiswa 
                        </p>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="min"
                              className={
                                dataError.ipk_min ? "is-invalid" : ""
                              }
                            >
                              IPK Minimal
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="IPK Minimal"
                              id="min"
                            />
                            {dataError.ipk_min ? (
                              <div className="invalid-feedback">
                                {dataError.ipk_min}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="max" className={
                                dataError.ipk_max ? "is-invalid" : ""
                              }>
                              IPK Maksimal
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="IPK Maksimal"
                              id="max"
                            />{dataError.ipk_max ? (
                              <div className="invalid-feedback">
                                {dataError.ipk_max}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="avg" className={
                                dataError.ipk_avg ? "is-invalid" : ""
                              }>
                              IPK Rata - rata
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="IPK Rata - rata"
                              id="avg"
                            />
                            {dataError.ipk_avg ? (
                              <div className="invalid-feedback">
                                {dataError.ipk_avg}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4">
                <CardUtama />
              </div>
            </div>
            <FooterUtama />
          </div>
        </LayoutForm>
      )}
    </>
  );
}
