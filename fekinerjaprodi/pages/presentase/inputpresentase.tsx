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

export default function inputpresentase() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);
  const [dataRole, setRole] = useState("");

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/kepuasan",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_prodi } = response.data;
        setuserDosens(all_prodi);
        console.log(all_prodi);
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
    formData.append("kepuasan_id", event.target.kepuasan.value);

    formData.append("etika_4", event.target.etika_4.value);
    formData.append("etika_3", event.target.etika_3.value);
    formData.append("etika_2", event.target.etika_2.value);
    formData.append("etika_1", event.target.etika_1.value);
    formData.append("tindak_etika", event.target.tindak_etika.value);

    formData.append("keahlian_bidang_4", event.target.keahlian_bidang_4.value);
    formData.append("keahlian_bidang_3", event.target.keahlian_bidang_3.value);
    formData.append("keahlian_bidang_2", event.target.keahlian_bidang_2.value);
    formData.append("keahlian_bidang_1", event.target.keahlian_bidang_1.value);
    formData.append("tindak_bidang", event.target.tindak_bidang.value);

    formData.append("bhs_asing_4", event.target.bhs_asing_4.value);
    formData.append("bhs_asing_3", event.target.bhs_asing_3.value);
    formData.append("bhs_asing_2", event.target.bhs_asing_2.value);
    formData.append("bhs_asing_1", event.target.bhs_asing_1.value);
    formData.append("tindak_bhs", event.target.tindak_bhs.value);

    formData.append("penggunaan_ti_4", event.target.penggunaan_ti_4.value);
    formData.append("penggunaan_ti_3", event.target.penggunaan_ti_3.value);
    formData.append("penggunaan_ti_2", event.target.penggunaan_ti_2.value);
    formData.append("penggunaan_ti_1", event.target.penggunaan_ti_1.value);
    formData.append("tindak_ti", event.target.tindak_ti.value);

    formData.append("komunikasi_4", event.target.komunikasi_4.value);
    formData.append("komunikasi_3", event.target.komunikasi_3.value);
    formData.append("komunikasi_2", event.target.komunikasi_2.value);
    formData.append("komunikasi_1", event.target.komunikasi_1.value);
    formData.append("tindak_komunikasi", event.target.tindak_komunikasi.value);

    formData.append("kerjasama_4", event.target.kerjasama_4.value);
    formData.append("kerjasama_3", event.target.kerjasama_3.value);
    formData.append("kerjasama_2", event.target.kerjasama_2.value);
    formData.append("kerjasama_1", event.target.kerjasama_1.value);
    formData.append("tindak_kerjasama", event.target.tindak_kerjasama.value);

    formData.append(
      "pengembangan_diri_4",
      event.target.pengembangan_diri_4.value
    );
    formData.append(
      "pengembangan_diri_3",
      event.target.pengembangan_diri_3.value
    );
    formData.append(
      "pengembangan_diri_2",
      event.target.pengembangan_diri_2.value
    );
    formData.append(
      "pengembangan_diri_1",
      event.target.pengembangan_diri_1.value
    );
    formData.append(
      "tindak_pengembangan",
      event.target.tindak_pengembangan.value
    );

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/presentase",
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

        router.push("../presentase/daftarpresentase");
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
                      <p className="text-uppercase text-sm">
                        Presentase Kepuasan
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kepuasan"
                              className={
                                dataError.kepuasan_id ? "is-invalid" : ""
                              }
                            >
                              Tahun Kepuasan
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="kepuasan"
                            >
                              <option value="">Pilih Tahun Kepuasan</option>
                              {userDosens.map((userkepuasan) => {
                                return (
                                  <option
                                    value={userkepuasan.id}
                                    key={userkepuasan.id}
                                  >
                                    {userkepuasan.tahun}
                                  </option>
                                );
                              })}
                            </select>
                            {dataError.kepuasan_id ? (
                              <div className="invalid-feedback">
                                {dataError.kepuasan_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* PRESTASI */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jenis Kemampuan : Etika
                        </p>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="etika_4"
                              className={dataError.etika_4 ? "is-invalid" : ""}
                            >
                              Etika 4
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Etika 4"
                              id="etika_4"
                            />
                            {dataError.etika_4 ? (
                              <div className="invalid-feedback">
                                {dataError.etika_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="etika_3"
                              className={dataError.etika_3 ? "is-invalid" : ""}
                            >
                              Etika 3
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Etika 3"
                              id="etika_3"
                            />
                            {dataError.etika_3 ? (
                              <div className="invalid-feedback">
                                {dataError.etika_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="etika_2"
                              className={dataError.etika_2 ? "is-invalid" : ""}
                            >
                              Etika 2
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Etika 2"
                              id="etika_2"
                            />
                            {dataError.etika_2 ? (
                              <div className="invalid-feedback">
                                {dataError.etika_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="etika_1"
                              className={dataError.etika_1 ? "is-invalid" : ""}
                            >
                              Etika 1
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Etika 1"
                              id="etika_1"
                            />
                            {dataError.etika_1 ? (
                              <div className="invalid-feedback">
                                {dataError.etika_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-10">
                          <div className="form-group">
                            <label
                              htmlFor="tindak_etika"
                              className={
                                dataError.tindak_etika ? "is-invalid" : ""
                              }
                            >
                              Tindak Etika
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tindak Etika"
                              id="tindak_etika"
                            />
                            {dataError.tindak_etika ? (
                              <div className="invalid-feedback">
                                {dataError.tindak_etika}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* BIDANG */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jenis Kemampuan : Keahlian pada bidang ilmu (kompetensi utama)
                        </p>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="keahlian_bidang_4"
                              className={
                                dataError.keahlian_bidang_4 ? "is-invalid" : ""
                              }
                            >
                              Keahlian Bidang 4
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Keahlian Bidang 4"
                              id="keahlian_bidang_4"
                            />
                            {dataError.keahlian_bidang_4 ? (
                              <div className="invalid-feedback">
                                {dataError.keahlian_bidang_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="keahlian_bidang_3"
                              className={
                                dataError.keahlian_bidang_3 ? "is-invalid" : ""
                              }
                            >
                              Keahlian Bidang 3
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Keahlian Bidang 3"
                              id="keahlian_bidang_3"
                            />
                            {dataError.keahlian_bidang_3 ? (
                              <div className="invalid-feedback">
                                {dataError.keahlian_bidang_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="keahlian_bidang_2"
                              className={
                                dataError.keahlian_bidang_2 ? "is-invalid" : ""
                              }
                            >
                              Keahlian Bidang 2
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Keahlian Bidang 2"
                              id="keahlian_bidang_2"
                            />
                            {dataError.keahlian_bidang_2 ? (
                              <div className="invalid-feedback">
                                {dataError.keahlian_bidang_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="keahlian_bidang_1"
                              className={
                                dataError.keahlian_bidang_1 ? "is-invalid" : ""
                              }
                            >
                              Keahlian Bidang 1
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Keahlian Bidang 1"
                              id="keahlian_bidang_1"
                            />
                            {dataError.keahlian_bidang_1 ? (
                              <div className="invalid-feedback">
                                {dataError.keahlian_bidang_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-10">
                          <div className="form-group">
                            <label
                              htmlFor="tindak_bidang"
                              className={
                                dataError.tindak_bidang ? "is-invalid" : ""
                              }
                            >
                              Tindak Keahlian Bidang
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tindak Keahlian Bidang"
                              id="tindak_bidang"
                            />
                            {dataError.tindak_bidang ? (
                              <div className="invalid-feedback">
                                {dataError.tindak_bidang}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* PRESTASI */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jenis Kemampuan : Berbahasa asing
                        </p>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="bhs_asing_4"
                              className={
                                dataError.bhs_asing_4 ? "is-invalid" : ""
                              }
                            >
                              Bahasa Asing 4
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Bahasa Asing 4"
                              id="bhs_asing_4"
                            />
                            {dataError.bhs_asing_4 ? (
                              <div className="invalid-feedback">
                                {dataError.bhs_asing_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="bhs_asing_3"
                              className={
                                dataError.bhs_asing_3 ? "is-invalid" : ""
                              }
                            >
                              Bahasa Asing 3
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Bahasa Asing 3"
                              id="bhs_asing_3"
                            />
                            {dataError.bhs_asing_3 ? (
                              <div className="invalid-feedback">
                                {dataError.bhs_asing_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="bhs_asing_2"
                              className={
                                dataError.bhs_asing_2 ? "is-invalid" : ""
                              }
                            >
                              Bahasa Asing 2
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Bahasa Asing 2"
                              id="bhs_asing_2"
                            />
                            {dataError.bhs_asing_2 ? (
                              <div className="invalid-feedback">
                                {dataError.bhs_asing_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="bhs_asing_1"
                              className={
                                dataError.bhs_asing_1 ? "is-invalid" : ""
                              }
                            >
                              Bahasa Asing 1
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Bahasa Asing 1"
                              id="bhs_asing_1"
                            />
                            {dataError.bhs_asing_1 ? (
                              <div className="invalid-feedback">
                                {dataError.bhs_asing_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-10">
                          <div className="form-group">
                            <label
                              htmlFor="tindak_bhs"
                              className={
                                dataError.tindak_bhs ? "is-invalid" : ""
                              }
                            >
                              Tindak Bahasa Asing
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tindak Bahasa Asing"
                              id="tindak_bhs"
                            />
                            {dataError.tindak_bhs ? (
                              <div className="invalid-feedback">
                                {dataError.tindak_bhs}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* PRESTASI */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jenis Kemampuan : Penggunaan teknologi informasi
                        </p>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="penggunaan_ti_4"
                              className={
                                dataError.penggunaan_ti_4 ? "is-invalid" : ""
                              }
                            >
                              Penggunaan teknologi informasi 4
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Penggunaan teknologi informasi 4"
                              id="penggunaan_ti_4"
                            />
                            {dataError.penggunaan_ti_4 ? (
                              <div className="invalid-feedback">
                                {dataError.penggunaan_ti_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="penggunaan_ti_3"
                              className={
                                dataError.penggunaan_ti_3 ? "is-invalid" : ""
                              }
                            >
                              Penggunaan teknologi informasi 3
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Penggunaan teknologi informasi 3"
                              id="penggunaan_ti_3"
                            />
                            {dataError.penggunaan_ti_3 ? (
                              <div className="invalid-feedback">
                                {dataError.penggunaan_ti_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="penggunaan_ti_2"
                              className={
                                dataError.penggunaan_ti_2 ? "is-invalid" : ""
                              }
                            >
                              Penggunaan teknologi informasi 2
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Penggunaan teknologi informasi 2"
                              id="penggunaan_ti_2"
                            />
                            {dataError.penggunaan_ti_2 ? (
                              <div className="invalid-feedback">
                                {dataError.penggunaan_ti_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="penggunaan_ti_1"
                              className={
                                dataError.penggunaan_ti_1 ? "is-invalid" : ""
                              }
                            >
                              Penggunaan teknologi informasi 1
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Penggunaan teknologi informasi 1"
                              id="penggunaan_ti_1"
                            />
                            {dataError.penggunaan_ti_1 ? (
                              <div className="invalid-feedback">
                                {dataError.penggunaan_ti_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-10">
                          <div className="form-group">
                            <label
                              htmlFor="tindak_ti"
                              className={
                                dataError.tindak_ti ? "is-invalid" : ""
                              }
                            >
                              Tindak Penggunaan Teknologi Informasi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tindak Penggunaan Teknologi Informasi"
                              id="tindak_ti"
                            />
                            {dataError.tindak_ti ? (
                              <div className="invalid-feedback">
                                {dataError.tindak_ti}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* PRESTASI */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jenis Kemampuan : Berkomunikasi
                        </p>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="komunikasi_4"
                              className={
                                dataError.komunikasi_4 ? "is-invalid" : ""
                              }
                            >
                              Berkomunikasi 4
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Berkomunikasi 4"
                              id="komunikasi_4"
                            />
                            {dataError.komunikasi_4 ? (
                              <div className="invalid-feedback">
                                {dataError.komunikasi_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="komunikasi_3"
                              className={
                                dataError.komunikasi_3 ? "is-invalid" : ""
                              }
                            >
                              Berkomunikasi 3
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Berkomunikasi 3"
                              id="komunikasi_3"
                            />
                            {dataError.komunikasi_3 ? (
                              <div className="invalid-feedback">
                                {dataError.komunikasi_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="komunikasi_2"
                              className={
                                dataError.komunikasi_2 ? "is-invalid" : ""
                              }
                            >
                              Berkomunikasi 2
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Berkomunikasi 2"
                              id="komunikasi_2"
                            />
                            {dataError.komunikasi_2 ? (
                              <div className="invalid-feedback">
                                {dataError.komunikasi_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="komunikasi_1"
                              className={
                                dataError.komunikasi_1 ? "is-invalid" : ""
                              }
                            >
                              Berkomunikasi 1
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Berkomunikasi 1"
                              id="komunikasi_1"
                            />
                            {dataError.komunikasi_1 ? (
                              <div className="invalid-feedback">
                                {dataError.komunikasi_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-10">
                          <div className="form-group">
                            <label
                              htmlFor="tindak_komunikasi"
                              className={
                                dataError.tindak_komunikasi ? "is-invalid" : ""
                              }
                            >
                              Tindak Komunikasi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Tindak Komunikasi"
                              id="tindak_komunikasi"
                            />
                            {dataError.tindak_komunikasi ? (
                              <div className="invalid-feedback">
                                {dataError.tindak_komunikasi}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* PRESTASI */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jenis Kemampuan : Kerjasama
                        </p>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kerjasama_4"
                              className={
                                dataError.kerjasama_4 ? "is-invalid" : ""
                              }
                            >
                              Kerjasama 4
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Kerjasama 4"
                              id="kerjasama_4"
                            />
                            {dataError.kerjasama_4 ? (
                              <div className="invalid-feedback">
                                {dataError.kerjasama_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kerjasama_3"
                              className={
                                dataError.kerjasama_3 ? "is-invalid" : ""
                              }
                            >
                              Kerjasama 3
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Kerjasama 3"
                              id="kerjasama_3"
                            />
                            {dataError.kerjasama_3 ? (
                              <div className="invalid-feedback">
                                {dataError.kerjasama_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kerjasama_2"
                              className={
                                dataError.kerjasama_2 ? "is-invalid" : ""
                              }
                            >
                              Kerjasama 2
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Kerjasama 2"
                              id="kerjasama_2"
                            />
                            {dataError.kerjasama_2 ? (
                              <div className="invalid-feedback">
                                {dataError.kerjasama_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kerjasama_1"
                              className={
                                dataError.kerjasama_1 ? "is-invalid" : ""
                              }
                            >
                              Kerjasama 1
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Kerjasama 1"
                              id="kerjasama_1"
                            />
                            {dataError.kerjasama_1 ? (
                              <div className="invalid-feedback">
                                {dataError.kerjasama_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-10">
                          <div className="form-group">
                            <label
                              htmlFor="tindak_kerjasama"
                              className={
                                dataError.tindak_kerjasama ? "is-invalid" : ""
                              }
                            >
                              Tindak Kerjasama
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tindak Kerjasama"
                              id="tindak_kerjasama"
                            />
                            {dataError.tindak_kerjasama ? (
                              <div className="invalid-feedback">
                                {dataError.tindak_kerjasama}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* PRESTASI */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jenis Kemampuan : Pengembangan Diri
                        </p>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="pengembangan_diri_4"
                              className={
                                dataError.pengembangan_diri_4
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Pengembangan Diri 4
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Pengembangan Diri 4"
                              id="pengembangan_diri_4"
                            />
                            {dataError.pengembangan_diri_4 ? (
                              <div className="invalid-feedback">
                                {dataError.pengembangan_diri_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="pengembangan_diri_3"
                              className={
                                dataError.pengembangan_diri_3
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Pengembangan Diri 3
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Pengembangan Diri 3"
                              id="pengembangan_diri_3"
                            />
                            {dataError.pengembangan_diri_3 ? (
                              <div className="invalid-feedback">
                                {dataError.pengembangan_diri_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="pengembangan_diri_2"
                              className={
                                dataError.pengembangan_diri_2
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Pengembangan Diri 2
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Pengembangan Diri 2"
                              id="pengembangan_diri_2"
                            />
                            {dataError.pengembangan_diri_2 ? (
                              <div className="invalid-feedback">
                                {dataError.pengembangan_diri_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="pengembangan_diri_1"
                              className={
                                dataError.pengembangan_diri_1
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Pengembangan Diri 1
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Pengembangan Diri 1"
                              id="pengembangan_diri_1"
                            />
                            {dataError.pengembangan_diri_1 ? (
                              <div className="invalid-feedback">
                                {dataError.pengembangan_diri_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-10">
                          <div className="form-group">
                            <label
                              htmlFor="tindak_pengembangan"
                              className={
                                dataError.tindak_pengembangan
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Tindak Pengembangan Diri
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tindak Pengembangan Diri"
                              id="tindak_pengembangan"
                            />
                            {dataError.tindak_pengembangan ? (
                              <div className="invalid-feedback">
                                {dataError.tindak_pengembangan}
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
