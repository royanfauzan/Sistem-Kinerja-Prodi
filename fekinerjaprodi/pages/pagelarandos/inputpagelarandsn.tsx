import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

interface Udosen {
  id: number;
  NIDK: string;
  role: string;
  level_akses: number;
  profil_dosen: object;
  created_at: string;
  updated_at: string;
}

export default function inputpagelarandsn() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);
  // const [dataProdis, setdataProdis] = useState([]);
  const [userDosen, setuserDosen] = useState();
  const [UsrSekarang, setUsrSekarang] = useState();
  const [filebukti, setfilebuktis] = useState<File>([]);

  const [dataError, setError] = useState([]);

  const [dataRole, setRole] = useState("");

  const [selectedId, setSelectedId] = useState();

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async (nidk) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/get_profildosen/${nidk}`,
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");

        const { profilDosen } = response.data;
        console.log("INI DOSEN YG LOGIN");
        console.log(profilDosen);
        setuserDosen(profilDosen);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });

    // axios({
    //   method: "get",
    //   url: "http://127.0.0.1:8000/api/Prodi/",
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     console.log("Sukses");
    //     const { Prodi } = response.data;
    //     setdataProdis(Prodi);
    //     console.log(Prodi);
    //   })
    //   .catch(function (err) {
    //     console.log("gagal");
    //     console.log(err.response);
    //   });
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
        const { NIDK } = response.data.user;
        const userSekarang = response.data.user;
        const { role } = response.data.user;
        setRole(role);
        setUsrSekarang(userSekarang);
        console.log(UsrSekarang);
        pengambilData(NIDK);

        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 2) {
          return router.push("/rekognisi/export/exportbimbingan");
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin

        setStadmin(true);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
        return router.push("/dashboard/dashboardadmin");
      });
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("profil_dosen_id", event.target.profil_dosen_id.value);
    formData.append("judul", event.target.judul.value);
    formData.append("penyelenggara", event.target.penyelenggara.value);
    formData.append("ruang_lingkup", event.target.ruang_lingkup.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("file_bukti", filebukti);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/pagelarandoss",
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { profil } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Simpan Sukses!!");
        // console.log(token);
        console.log(profil);
        router.push("/pagelarandos/tabelpagelarandsn");
      })
      .catch(function (error) {
        toast.dismiss();
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            router.push("/pagelarandos/tabelpagelarandsn");
          }, 500);
        } else {
          setError(error.response.data.error);
          if (error.response.status == 400) {
            toast.error("Periksa Kelengkapan Data!!");
          } else {
            toast.error("Periksa Kelengkapan Data");
          }
        }

        console.log("tidak success");
        console.log(error.response);
      });
  };

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);
  };

  const clickSelectId = (e) => {
    const value = e.target.value;
    let dosz;
    userDosens.forEach((dos) => {
      if (e.target.value == dos.NIDK) {
        setSelectedId(dos);
        dosz = dos;
      }
    });
    console.log(e.target.value);
    console.log(dosz);
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
                        <p className="mb-0">Data pagelaran</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Tambah Data
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <p className="text-uppercase text-sm">Data Pagelaran</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="profil_dosen_id"
                              className={
                                "form-control-label " +
                                dataError.profil_dosen_id
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Nama Dosen
                            </label>

                            {userDosen && (
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                defaultValue={userDosen.id}
                                id="profil_dosen_id"
                              >
                                <option value={userDosen.id} key={userDosen.id}>
                                  {userDosen.NamaDosen}
                                </option>
                              </select>
                            )}

                            {dataError.profil_dosen_id ? (
                              <div className="invalid-feedback">
                                {dataError.profil_dosen_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {/* <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="profil_dosen_id"
                              className={
                                "form-control-label " +
                                dataError.profil_dosen_id
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Pilih DTPS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Pilih Dosen"
                              id="profil_dosen_id"
                              list="datalistDosen"
                              defaultValue=""
                              onChange={clickSelectId}
                            />
                            <datalist id="datalistDosen">
                              {userDosens.map((userdosen) => {
                                return (
                                  <option
                                    value={userdosen.NIDK}
                                    key={userdosen.id}
                                  >
                                    {userdosen.NamaDosen}
                                  </option>
                                );
                              })}
                            </datalist>

                            {dataError.profil_dosen_id ? (
                              <div className="invalid-feedback">
                                {dataError.profil_dosen_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div> */}
                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">
                        Pagelaran: Detail Pagelaran
                      </p>
                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group">
                            <label
                              htmlFor="ruang_lingkup"
                              className={
                                "form-control-label " +
                                dataError.ruang_lingkup
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Ruang Lingkup 
                            </label>

                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={`Wilayah`}
                              id="ruang_lingkup"
                            >
                              <option value={`Wilayah`}>
                                Wilayah/Lokal/Perguruan Tinggi
                              </option>
                              <option value={`Nasional`}>Nasional</option>
                              <option value={`Nnternasional`}>
                                Internasional
                              </option>
                            </select>

                            {dataError.ruang_lingkup ? (
                              <div className="invalid-feedback">
                                {dataError.ruang_lingkup}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">
                        Pagelaran: Data Pagelaran
                      </p>
                      <div className="row">
                        <div className="col-8">
                          <div className="form-group">
                            <label
                              htmlFor="judul"
                              className={
                                "form-control-label " + dataError.judul
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Judul Pagelaran
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="judul"
                              id="judul"
                            ></textarea>
                            {dataError.judul ? (
                              <div className="invalid-feedback">
                                {dataError.judul}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label
                              htmlFor="JMSC"
                              className={
                                "form-control-label " + dataError.penyelenggara
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Penyelenggara Pagelaran
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="JiPANI"
                              id="penyelenggara"
                            />
                            {dataError.penyelenggara ? (
                              <div className="invalid-feedback">
                                {dataError.penyelenggara}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label
                              htmlFor="tahun"
                              className={
                                "form-control-label " + dataError.tahun
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Tahun
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="2020"
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
                        <div className="col-md-11">
                          <div className="form-group">
                            <label
                              htmlFor="file_bukti"
                              className={
                                dataError.file_bukti ? "is-invalid" : ""
                              }
                            >
                              File Bukti
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              onChange={handleChangeFile}
                              id="file_bukti"
                            />
                            {dataError.file_bukti ? (
                              <div className="invalid-feedback">
                                {dataError.file_bukti}
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
          <Toaster />
        </LayoutForm>
      )}
    </>
  );
}
