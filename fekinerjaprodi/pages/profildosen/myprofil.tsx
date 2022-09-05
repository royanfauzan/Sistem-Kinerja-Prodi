import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardSertif from "../../components/Molecule/MenuCard/CardSertif";
import ListCardSertif from "../../components/Molecule/MenuCard/ListCardSertif";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutDashboardBlue from "../../components/Organism/Layout/LayoutDashboardBlue";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

export default function myprofil() {
  const router = useRouter();
  const apiurl = "http://127.0.0.1:8000/";

  const [userDosens, setuserDosens] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [readOnly, setreadOnly] = useState("-plaintext");
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
      url: `http://127.0.0.1:8000/api/profillengkap/${nidk}`,
    })
      .then(function (response) {
        console.log(nidk)
        console.log('NIDK')
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
        console.log(NIDK)
        console.log('NIDKKK')
        const userSekarang = response.data.user;
        const { role } = response.data.user;
        setRole(role);
        setUsrSekarang(userSekarang);
        console.log(UsrSekarang);
        pengambilData(NIDK);

        // kalo ga admin dipindah ke halaman lain
        if (level_akses != 2) {
          return router.push("/sdm/dashboardSdmAdmin");
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

    let formData = new FormData();
    formData.append("NIDK", userDosen.NIDK);
    formData.append("NIK", event.target.NIK.value);
    formData.append("NamaDosen", event.target.NamaDosen.value);
    formData.append("Agama", event.target.Agama.value);
    formData.append("TempatLahir", event.target.TempatLahir.value);
    formData.append("TanggalLahir", event.target.TanggalLahir.value);
    formData.append("StatusPerkawinan", event.target.StatusPerkawinan.value);
    formData.append("JenisKelamin", event.target.JenisKelamin.value);
    formData.append("StatusDosen", userDosen.StatusDosen);
    formData.append("bidangKeahlian", userDosen.detaildosen.bidangKeahlian);
    formData.append("kesesuaian", userDosen.detaildosen.kesesuaian);
    formData.append("perusahaan", event.target.perusahaan.value);

    formData.append("Golongan", event.target.Golongan.value);
    formData.append("Pangkat", event.target.Pangkat.value);
    formData.append("JabatanAkademik", event.target.JabatanAkademik.value);
    formData.append("Alamat", event.target.Alamat.value);
    formData.append("NoTelepon", event.target.NoTelepon.value);
    formData.append("Email", event.target.Email.value);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_profildosen/${userDosen.id}?_method=PUT`,
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
        toast.success("Simpan Sukses Sugses!!");
        // console.log(token);
        console.log(profil);
        router.reload();
      })
      .catch(function (error) {
        toast.dismiss();
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            router.reload();
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

  const handleChangeMode = (e) => {
    e.preventDefault();
    if (!editMode) {
      setreadOnly("");
    } else {
      setreadOnly("-plaintext");
    }
    seteditMode(!editMode);
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
        <LayoutDashboardBlue rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-12 ">
                <div className="row bg-white rounded-3">
                  <div className="col-7">
                    <form id="inputDetilDosen" onSubmit={submitForm}>
                      <div className="card my-3">
                        <div className="card-header pb-0">
                          <div className="d-flex align-items-center">
                            <p className="mb-0">Profil Dosen</p>
                            <button
                              className={`btn btn-outline-warning btn-sm ms-auto ${
                                editMode ? "d-none" : ""
                              }`}
                              type="button"
                              onClick={handleChangeMode}
                            >
                              Edit Data
                            </button>
                            <button
                              className={`btn btn-outline-primary btn-sm ms-auto me-n3 py-1 ${
                                !editMode ? "d-none" : ""
                              }`}
                              type="button"
                              onClick={handleChangeMode}
                            >
                              Batal
                            </button>
                            <button
                              className={`btn btn-primary btn-sm ms-0 ${
                                !editMode ? "d-none" : ""
                              }`}
                              type="submit"
                            >
                              Simpan Update
                            </button>
                          </div>
                        </div>
                        {userDosen && (
                          <div className="card-body">
                            <p className="text-uppercase text-sm">My Profil</p>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="NIDK"
                                    className={
                                      "form-control-label " + dataError.NIDK
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    NIDK
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className="form-control-plaintext"
                                    type="text"
                                    placeholder="-"
                                    id="NIDK"
                                    defaultValue={userDosen.NIDK}
                                  />
                                  {dataError.NIDK ? (
                                    <div className="invalid-feedback">
                                      {dataError.NIDK}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="NIK"
                                    className={
                                      "form-control-label " + dataError.NIK
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    NIK
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="NIK"
                                    defaultValue={userDosen.NIK}
                                  />
                                  {dataError.NIK ? (
                                    <div className="invalid-feedback">
                                      {dataError.NIK}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="NamaDosen"
                                    className={
                                      "form-control-label " +
                                      dataError.NamaDosen
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    NamaDosen
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="NamaDosen"
                                    defaultValue={userDosen.NamaDosen}
                                  />
                                  {dataError.NamaDosen ? (
                                    <div className="invalid-feedback">
                                      {dataError.NamaDosen}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="Agama"
                                    className={
                                      "form-control-label " + dataError.Agama
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Agama
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="Agama"
                                    defaultValue={userDosen.Agama}
                                  />
                                  {dataError.Agama ? (
                                    <div className="invalid-feedback">
                                      {dataError.Agama}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="TempatLahir"
                                    className={
                                      "form-control-label " +
                                      dataError.TempatLahir
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Tempat Lahir
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="TempatLahir"
                                    defaultValue={userDosen.TempatLahir}
                                  />
                                  {dataError.TempatLahir ? (
                                    <div className="invalid-feedback">
                                      {dataError.TempatLahir}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="TanggalLahir"
                                    className={
                                      "form-control-label " +
                                      dataError.TanggalLahir
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Tanggal Lahir
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="date"
                                    placeholder="-"
                                    id="TanggalLahir"
                                    defaultValue={userDosen.TanggalLahir}
                                  />
                                  {dataError.TanggalLahir ? (
                                    <div className="invalid-feedback">
                                      {dataError.TanggalLahir}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="JenisKelamin"
                                    className={
                                      "form-control-label " +
                                      dataError.JenisKelamin
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Jenis Kelamin
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly} ${
                                      editMode ? "d-none" : ""
                                    }`}
                                    type="text"
                                    defaultValue={userDosen.JenisKelamin}
                                  />
                                  <select
                                    className={`form-select ${
                                      !editMode ? "d-none" : ""
                                    }`}
                                    aria-label="Default select example"
                                    defaultValue={userDosen.JenisKelamin}
                                    id="JenisKelamin"
                                  >
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                  </select>
                                  {dataError.JenisKelamin ? (
                                    <div className="invalid-feedback">
                                      {dataError.JenisKelamin}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="StatusPerkawinan"
                                    className={
                                      "form-control-label " +
                                      dataError.StatusPerkawinan
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Status Perkawinan
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly} ${
                                      editMode ? "d-none" : ""
                                    }`}
                                    type="text"
                                    defaultValue={userDosen.StatusPerkawinan}
                                  />
                                  <select
                                    className={`form-select ${
                                      !editMode ? "d-none" : ""
                                    }`}
                                    aria-label="Default select example"
                                    defaultValue={userDosen.StatusPerkawinan}
                                    id="StatusPerkawinan"
                                  >
                                    <option value="Belum Kawin">
                                      Belum Kawin
                                    </option>
                                    <option value="Kawin">Kawin</option>
                                  </select>
                                  {dataError.StatusPerkawinan ? (
                                    <div className="invalid-feedback">
                                      {dataError.NamaDosen}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <hr className="horizontal dark" />
                            <p className="text-uppercase text-sm">
                              Informasi Akademik
                            </p>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="StatusDosen"
                                    className={
                                      "form-control-label " +
                                      dataError.StatusDosen
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Status Dosen
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly} ${
                                      editMode ? "d-none" : ""
                                    }`}
                                    type="text"
                                    defaultValue={userDosen.StatusDosen}
                                    id="StatusDosen"
                                  />

                                  {dataError.StatusDosen ? (
                                    <div className="invalid-feedback">
                                      {dataError.NamaDosen}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="bidangKeahlian"
                                    className={
                                      "form-control-label " +
                                      dataError.bidangKeahlian
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Bidang keahlian
                                  </label>

                                  <input
                                    disabled
                                    className="form-control-plaintext"
                                    type="text"
                                    placeholder="Bidang Keahlian"
                                    defaultValue={
                                      userDosen.detaildosen
                                        ? userDosen.detaildosen.bidangKeahlian
                                        : ""
                                    }
                                    id="bidangKeahlian"
                                  />
                                  {dataError.bidangKeahlian ? (
                                    <div className="invalid-feedback">
                                      {dataError.bidangKeahlian}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row h-100 align-items-center">
                                  <div className="col pt-2 form-check">
                                    <input
                                      disabled
                                      className="form-check-input"
                                      type="checkbox"
                                      value="V"
                                      id="kesesuaian"
                                      defaultChecked={
                                        userDosen.detaildosen
                                          ? userDosen.detaildosen.kesesuaian ==
                                            "V"
                                          : true
                                      }
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
                                        "form-check-label " +
                                        dataError.kesesuaian
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
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label
                                    htmlFor="Golongan"
                                    className={
                                      "form-control-label " + dataError.Golongan
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Golongan
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="Golongan"
                                    defaultValue={userDosen.Golongan}
                                  />
                                  {dataError.Golongan ? (
                                    <div className="invalid-feedback">
                                      {dataError.Golongan}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label
                                    htmlFor="Pangkat"
                                    className={
                                      "form-control-label " + dataError.Pangkat
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Pangkat
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="Pangkat"
                                    defaultValue={userDosen.Pangkat}
                                  />
                                  {dataError.Pangkat ? (
                                    <div className="invalid-feedback">
                                      {dataError.Pangkat}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label
                                    htmlFor="JabatanAkademik"
                                    className={
                                      "form-control-label " +
                                      dataError.JabatanAkademik
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Jabatan Akademik
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="JabatanAkademik"
                                    defaultValue={userDosen.JabatanAkademik}
                                  />
                                  {dataError.JabatanAkademik ? (
                                    <div className="invalid-feedback">
                                      {dataError.JabatanAkademik}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <hr className="horizontal dark" />
                            <p className="text-uppercase text-sm">
                              Detail Tambahan
                            </p>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="perusahaan"
                                    className={
                                      "form-control-label " +
                                      dataError.perusahaan
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Perusahan(Khusus dosen Industri)
                                  </label>
                                  <input
                                    disabled={
                                      userDosen.StatusDosen != "Dosen Industri"
                                    }
                                    className="form-control"
                                    type="text"
                                    placeholder="-"
                                    id="perusahaan"
                                    defaultValue={
                                      userDosen.detaildosen
                                        ? userDosen.detaildosen.perusahaan
                                        : ""
                                    }
                                  />
                                  {dataError.perusahaan ? (
                                    <div className="invalid-feedback">
                                      {dataError.perusahaan}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <hr className="horizontal dark" />
                            <p className="text-uppercase text-sm">Kontak</p>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="Email"
                                    className={
                                      "form-control-label " + dataError.Email
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Email
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="Email"
                                    defaultValue={userDosen.Email}
                                  />
                                  {dataError.Email ? (
                                    <div className="invalid-feedback">
                                      {dataError.Email}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="NoTelepon"
                                    className={
                                      "form-control-label " +
                                      dataError.NoTelepon
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Nomor Telpon
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="NoTelepon"
                                    defaultValue={userDosen.NoTelepon}
                                  />
                                  {dataError.NoTelepon ? (
                                    <div className="invalid-feedback">
                                      {dataError.NoTelepon}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label
                                    htmlFor="Alamat"
                                    className={
                                      "form-control-label " + dataError.Alamat
                                        ? "is-invalid"
                                        : ""
                                    }
                                  >
                                    Alamat
                                  </label>
                                  <input
                                    disabled={!editMode}
                                    className={`form-control${readOnly}`}
                                    type="text"
                                    placeholder="-"
                                    id="Alamat"
                                    defaultValue={userDosen.Alamat}
                                  />
                                  {dataError.Alamat ? (
                                    <div className="invalid-feedback">
                                      {dataError.Alamat}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="col-5">
                    <div className="row m-0 p-0">
                      <div className="col-12 m-0 p-0">
                        <CardSertif judul={"Sertifikat Pendidikan"}>
                          {userDosen &&
                            (userDosen.detaildosen ? (
                              userDosen.detaildosen.noSertifPendidik ? (
                                <ListCardSertif
                                  judul={userDosen.detaildosen.noSertifPendidik}
                                  halamanEdit={`/profildetail/sertifikatpendidik/${userDosen.detaildosen.id}`}
                                  halaman={
                                    apiurl + userDosen.detaildosen.fileBukti
                                  }
                                  icon={`bi bi-patch-check`}
                                />
                              ) : (
                                <div className="row">
                                  <Link
                                    href={`/profildetail/sertifikatpendidik/${userDosen.detaildosen.id}`}
                                  >
                                    <button className="btn btn-sm btn-outline-info border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                      Tambah Sertifikat Pendidik
                                    </button>
                                  </Link>
                                </div>
                              )
                            ) : (
                              <div className="row">
                                <p>Data Bidang belum terisi</p>
                              </div>
                            ))}
                        </CardSertif>
                      </div>
                      <div className="col-12 m-0 p-0">
                        <CardSertif judul={"Sertifikat Kompetensi"}>
                          {userDosen &&
                            (userDosen.serkoms.length ? (
                              userDosen.serkoms.map((serkom, indx) => {
                                return (
                                  <ListCardSertif
                                    key={serkom.id + "" + indx}
                                    judul={serkom.nomor_sertifikat}
                                    halamanEdit={`/profildetail/editserkom/${serkom.id}`}
                                    halaman={apiurl + serkom.file_bukti}
                                    icon={`bi bi-patch-check`}
                                  />
                                );
                              })
                            ) : (
                              <></>
                            ))}
                          <div className="row">
                            <Link
                              href={`/profildetail/inputserkomdsn`}
                            >
                              <button className="btn btn-sm btn-outline-info border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                Tambah Sertifikat Kompetensi
                              </button>
                            </Link>
                          </div>
                        </CardSertif>
                      </div>
                      <div className="col-12 m-0 p-0">
                        <CardSertif judul={"Riwayat Pendidikan"}>
                          {userDosen &&
                            (userDosen.pendidikans.length ? (
                              userDosen.pendidikans.map((pendidikan, indx) => {
                                return (
                                  <ListCardSertif
                                    key={pendidikan.id + "" + indx}
                                    judul={`${pendidikan.program_pendidikan} ${pendidikan.jurusan}`}
                                    halamanEdit={`/profildetail/editpendidikan/${pendidikan.id}`}
                                    halaman={apiurl + pendidikan.file_bukti}
                                    icon={`bi bi-patch-check`}
                                  />
                                );
                              })
                            ) : (
                              <></>
                            ))}
                          <div className="row">
                            <Link
                              href={`/profildetail/inputpendidikandsn`}
                            >
                              <button className="btn btn-sm btn-outline-info border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                Tambah Data Pendidikan
                              </button>
                            </Link>
                          </div>
                        </CardSertif>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FooterUtama />
          </div>
          <Toaster />
        </LayoutDashboardBlue>
      )}
    </>
  );
}
