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

export default function inputmengajardsn() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);
  const [dataMatkuls, setdataMatkuls] = useState([]);
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

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Matkul/",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_matkul } = response.data;
        setdataMatkuls(all_matkul);
        console.log(all_matkul);
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
        const { NIDK } = response.data.user;
        const userSekarang = response.data.user;
        const { role } = response.data.user;
        setRole(role);
        setUsrSekarang(userSekarang);
        console.log(UsrSekarang);
        pengambilData(NIDK);

        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 2) {
          return router.push("/rekognisi/tabelrekognisidsn");
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin

        setStadmin(true);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
        return router.push("/rekognisi/tabelrekognisi");
      });
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");
    const kesesuaian = event.target.kesesuaian.checked ? "V" : " ";

    let formData = new FormData();
    formData.append("profil_dosen_id", event.target.profil_dosen_id.value);
    formData.append("matkul_id", event.target.matkul_id.value);
    formData.append("kesesuaian", kesesuaian);
    formData.append("semester", event.target.semester.value);
    formData.append("tahun_akademik", event.target.tahun_akademik.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/mengajardosens",
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
        router.push("/mengajar/tabelmengajar");
      })
      .catch(function (error) {
        toast.dismiss();
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            router.push("/mengajar/tabelmengajar");
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
                        <p className="mb-0">Input Pengalaman Mengajar Dosen</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Tambah Data
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <p className="text-uppercase text-sm">Data Mengajar</p>
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
                        Mengajar: Detail Mengajar
                      </p>
                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group">
                            <label
                              htmlFor="matkul_id"
                              className={
                                "form-control-label " + dataError.matkul_id
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Mata Kuliah
                            </label>

                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="matkul_id"
                            >
                              {dataMatkuls.map((matkul) => {
                                return (
                                  <option
                                    value={matkul.id}
                                    key={`mtk-${matkul.id}`}
                                  >
                                    {`${matkul.kode_matkul} | ${matkul.nama_matkul} | ${matkul.prodi.nama_prodi}`}
                                  </option>
                                );
                              })}
                            </select>

                            {dataError.matkul_id ? (
                              <div className="invalid-feedback">
                                {dataError.matkul_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="row h-100 align-items-center">
                            <div className="col pt-2 form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="V"
                                id="kesesuaian"
                                defaultChecked={true}
                              />
                              {dataError.kesesuaian ? (
                                <div className="invalid-feedback">
                                  {dataError.kesesuaian}
                                </div>
                              ) : (
                                ""
                              )}
                              <label
                                className={
                                  "form-check-label " + dataError.kesesuaian
                                    ? "is-invalid"
                                    : ""
                                }
                                htmlFor="kesesuaian"
                              >
                                Kesesuaian
                              </label>
                            </div>
                          </div>
                        </div>
                      
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="semester"
                              className={
                                "form-control-label " + dataError.semester
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Semester
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="Ganjil"
                              id="semester"
                            >
                              <option value="Ganjil">Ganjil</option>
                              <option value="Genap">Genap</option>
                            </select>
                            {dataError.semester ? (
                              <div className="invalid-feedback">
                                {dataError.semester}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label
                              htmlFor="tahun_akademik"
                              className={
                                "form-control-label " + dataError.tahun_akademik
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Tahun Akademik
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="tahun_akademik"
                              id="tahun_akademik"
                            />
                            {dataError.tahun_akademik ? (
                              <div className="invalid-feedback">
                                {dataError.tahun_akademik}
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
