import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"



export default function capkurikulum() {
  const router = useRouter();

  const [userProdis, setuserProdis] = useState([]);
  const [userMatkuls, setuserMatkuls] = useState([]);
  const [dataError, setError] = useState([])
  const MySwal = withReactContent(Swal)


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
        setuserProdis(Prodi);
        console.log(Prodi);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });


    // pake ngambil data untuk halaman input

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Matkul",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_matkul } = response.data;
        setuserMatkuls(all_matkul);
        console.log(all_matkul);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });

  }



  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
  useEffect(() => {
    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem('token');
    if (!lgToken) {
      router.push('/login')
    }

    // perjalanan validasi token 
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_user",
      headers: { "Authorization": `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log('Sukses');
        const { level_akses } = response.data.user;
        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
          return router.push('/');
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true);
        pengambilData();
      })
      .catch(function (err) {
        console.log('gagal');
        console.log(err.response);
        return router.push('/');
      })
  }, []);



  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("prodi_ID", event.target.prodi.value);
    formData.append("matkul_ID", event.target.matkul.value);
    formData.append("semester", event.target.semester.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("mata_kuliah_kompetensi", event.target.matkul_kompetensi.value);
    formData.append("kuliah_responsi_tutorial", event.target.kuliah_responsi_tutorial.value);
    formData.append("seminar", event.target.seminar.value);
    formData.append("praktikum", event.target.praktikum.value);
    formData.append("konversi_kredit_jam", event.target.konv_kredit_jam.value);
    formData.append("sikap", event.target.sikap.value);
    formData.append("pengetahuan", event.target.pengetahuan.value);
    formData.append("ketrampilan_umum", event.target.ketrampilan_umum.value);
    formData.append("ketrampilan_khusus", event.target.ketrampilan_khusus.value);
    formData.append("dok_ren_pembelajaran", event.target.dok_ren_pembelajaran.value);
    formData.append("unit_penyelenggara", event.target.unit_penyelenggara.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/CapaianKurikulum",
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
        })

        router.push("/capkurikulum/daftarkurikulum")
      })
      .catch(function (error) {
        //handle error
        setError(error.response.data.error)
        console.log(error.response.data.error)
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Gagal Di Input",
        })
        console.log(error.response)
      })
  };

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-8">
                <form id="inputDetailDosen" onSubmit={submitForm}>
                  <div className="card">
                    <div className="card-header pb-0">
                      <div className="d-flex align-items-center">
                        <h6 className="mb-0">Input Data Capaian Kurikulum</h6>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                      <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="prodi"
                              className={dataError.prodi_ID ? "is-invalid" : ""}
                            >
                              Program Studi
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="prodi"
                            >
                              <option value="">Pilih Program Studi</option>
                              {userProdis.map((dataProdi) => {
                                return (
                                  <option
                                    value={dataProdi.id}
                                    key={dataProdi.id}
                                  >
                                    {dataProdi.prodi + ' ' + dataProdi.nama_prodi}
                                  </option>
                                )
                              })}
                            </select>
                            {dataError.prodi_ID ? (
                              <div className="invalid-feedback">
                                {dataError.prodi_ID}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="matkul"
                              className={dataError.matkul_ID ? "is-invalid" : ""}
                            >
                              Mata Kuliah
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="matkul"
                            >
                              <option value="">Pilih Mata Kuliah</option>
                              {userMatkuls.map((dataMatkul) => {
                                return (
                                  <option
                                    value={dataMatkul.id}
                                    key={dataMatkul.id}
                                  >
                                    {dataMatkul.nama_matkul + ' ' + dataMatkul.sks}
                                  </option>
                                )
                              })}
                            </select>
                            {dataError.matkul_ID ? (
                              <div className="invalid-feedback">
                                {dataError.matkul_ID}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>


                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="semester"
                              className={
                                dataError.semester ? "is-invalid" : ""
                              }>
                              Semester
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Semester"
                              id="semester"
                            />
                            {dataError.semester ? (
                              <div className="invalid-feedback">
                                {dataError.semester}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tahun"
                              className={
                                dataError.tahun ? "is-invalid" : ""
                              }>
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
                            <label htmlFor="matkul_kompetensi"
                              className={
                                dataError.mata_kuliah_kompetensi ? "is-invalid" : ""
                              }>
                              Mata Kuliah Kompetensi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mata Kuliah Kompetensi"
                              id="matkul_kompetensi"
                            />
                            {dataError.mata_kuliah_kompetensi ? (
                              <div className="invalid-feedback">
                                {dataError.mata_kuliah_kompetensi}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="kuliah_responsi_tutorial"
                              className={
                                dataError.kuliah_responsi_tutorial ? "is-invalid" : ""
                              }>
                              Kuliah Responsi Tutorial
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Kuliah Responsi Tutorial"
                              id="kuliah_responsi_tutorial"
                            />
                            {dataError.kuliah_responsi_tutorial ? (
                              <div className="invalid-feedback">
                                {dataError.kuliah_responsi_tutorial}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="seminar"
                              className={
                                dataError.seminar ? "is-invalid" : ""
                              }>
                              Seminar
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Seminar"
                              id="seminar"
                            />
                            {dataError.seminar ? (
                              <div className="invalid-feedback">
                                {dataError.seminar}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="praktikum"
                              className={
                                dataError.praktikum ? "is-invalid" : ""
                              }>
                              Praktikum
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Praktikum"
                              id="praktikum"
                            />
                            {dataError.praktikum ? (
                              <div className="invalid-feedback">
                                {dataError.praktikum}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="konv_kredit_jam"
                              className={
                                dataError.konversi_kredit_jam ? "is-invalid" : ""
                              }>
                              Konversi Kredit Jam
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Konversi Kredit Jam"
                              id="konv_kredit_jam"
                            />
                            {dataError.konversi_kredit_jam ? (
                              <div className="invalid-feedback">
                                {dataError.konversi_kredit_jam}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="sikap"
                              className={
                                dataError.sikap ? "is-invalid" : ""
                              }>
                              Sikap
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Sikap"
                              id="sikap"
                            />
                            {dataError.sikap ? (
                              <div className="invalid-feedback">
                                {dataError.sikap}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="pengetahuan"
                              className={
                                dataError.pengetahuan ? "is-invalid" : ""
                              }>
                              Pengetahuan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Pengetahuan"
                              id="pengetahuan"
                            />
                            {dataError.pengetahuan ? (
                              <div className="invalid-feedback">
                                {dataError.pengetahuan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="ketrampilan_umum"
                              className={
                                dataError.ketrampilan_umum ? "is-invalid" : ""
                              }>
                              Ketrampilan Umum
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Ketrampilan Umum"
                              id="ketrampilan_umum"
                            />
                            {dataError.ketrampilan_umum ? (
                              <div className="invalid-feedback">
                                {dataError.ketrampilan_umum}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="khusus"
                              className={
                                dataError.ketrampilan_khusus ? "is-invalid" : ""
                              }>
                              Ketrampilan Khusus
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Ketrampilan Khusus"
                              id="ketrampilan_khusus"
                            />
                            {dataError.ketrampilan_khusus ? (
                              <div className="invalid-feedback">
                                {dataError.ketrampilan_khusus}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dok_ren_pembelajaran"
                              className={
                                dataError.dok_ren_pembelajaran ? "is-invalid" : ""
                              }>
                              Dokumen Rencana Pembelajaran
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Dokumen Rencana Pembelajaran"
                              id="dok_ren_pembelajaran"
                            />
                            {dataError.dok_ren_pembelajaran ? (
                              <div className="invalid-feedback">
                                {dataError.dok_ren_pembelajaran}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="unit_penyelenggara"
                              className={
                                dataError.unit_penyelenggara ? "is-invalid" : ""
                              }>
                              Unit Penyelenggara
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Unit Penyelenggara"
                              id="unit_penyelenggara"
                            />
                            {dataError.unit_penyelenggara ? (
                              <div className="invalid-feedback">
                                {dataError.unit_penyelenggara}
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
