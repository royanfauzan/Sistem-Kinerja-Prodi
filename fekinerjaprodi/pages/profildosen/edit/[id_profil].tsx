import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";

// Untuk Ngambil Data Berdasarkan ID
export async function getServerSideProps(context) {
  //http request
  const req = await axios.get(
    `http://127.0.0.1:8000/api/tampil_profildosen/${context.query.id_profil}`
  );
  const res = await req.data.profil_dosen;

  return {
    props: {
        profil_dosen: res, // <-- assign response
    },
  };
}

export default function update_dataprofil(props) {
  const { profil_dosen } = props;
  console.log(profil_dosen);

  const router = useRouter();

  const [dataProfilDosen, setProfilDosen] = useState(profil_dosen);
  const [dataError, setError] = useState([]);

  const [dataRole, setRole] = useState("");

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {};

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

  //HAPUS DATA

  // Insert Update Data
  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("NIDK", event.target.NIDK.value);
    formData.append("NIK", event.target.NIK.value);
    formData.append("NamaDosen", event.target.NamaDosen.value);
    formData.append("Agama", event.target.Agama.value);
    formData.append("TempatLahir", event.target.TempatLahir.value);
    formData.append("TanggalLahir", event.target.TanggalLahir.value);
    formData.append("StatusPerkawinan", event.target.StatusPerkawinan.value);
    formData.append("JenisKelamin", event.target.JenisKelamin.value);
    formData.append("StatusDosen", event.target.StatusDosen.value);

    formData.append("Golongan", event.target.Golongan.value);
    formData.append("Pangkat", event.target.Pangkat.value);
    formData.append("JabatanAkademik", event.target.JabatanAkademik.value);
    formData.append("Alamat", event.target.Alamat.value);
    formData.append("NoTelepon", event.target.NoTelepon.value);
    formData.append("Email", event.target.Email.value);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_profildosen/${profil_dosen.id}?_method=PUT`,
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
        router.push("/profildosen/tabelprofil");
      })
      .catch(function (error) {
        toast.dismiss();
        if(error.response.data.message){
          toast.error(error.response.data.message);
          setTimeout(()=>{router.push("/profildosen/tabelprofil");},500);
        }else{
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
                        <p className="mb-0">Input Profil Dosen</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Update Data
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="text-uppercase text-sm">Profil Dosen</p>
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
                              className="form-control-plaintext"
                              type="text"
                              placeholder="NIDK dosen"
                              id="NIDK"
                              defaultValue={profil_dosen.NIDK}
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
                              className="form-control"
                              type="text"
                              placeholder="NIK dosen"
                              id="NIK"
                              defaultValue={profil_dosen.NIK}
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
                                "form-control-label " + dataError.NamaDosen
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              NamaDosen
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="NamaDosen dosen"
                              id="NamaDosen"
                              defaultValue={profil_dosen.NamaDosen}
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
                              className="form-control"
                              type="text"
                              placeholder="Agama"
                              id="Agama"
                              defaultValue={profil_dosen.Agama}
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
                                "form-control-label " + dataError.TempatLahir
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Tempat Lahir
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tabanan"
                              id="TempatLahir"
                              defaultValue={profil_dosen.TempatLahir}
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
                                "form-control-label " + dataError.TanggalLahir
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Tanggal Lahir
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              placeholder="Pilih Tanggal"
                              id="TanggalLahir"
                              defaultValue={profil_dosen.TanggalLahir}
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
                                "form-control-label " + dataError.JenisKelamin
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Jenis Kelamin
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={profil_dosen.JenisKelamin}
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
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={profil_dosen.StatusPerkawinan}
                              id="StatusPerkawinan"
                            >
                              <option value="Belum Kawin">Belum Kawin</option>
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
                                "form-control-label " + dataError.StatusDosen
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Status Dosen
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={profil_dosen.StatusDosen}
                              id="StatusDosen"
                            >
                              <option value="Dosen Tetap">Dosen Tetap</option>
                              <option value="Dosen Tidak Tetap">
                                Dosen Tidak Tetap
                              </option>
                              <option value="Dosen Industri">
                                Dosen Industri
                              </option>
                            </select>
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
                              className="form-control"
                              type="text"
                              placeholder="Golongan"
                              id="Golongan"
                              defaultValue={profil_dosen.Golongan}
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
                              className="form-control"
                              type="text"
                              placeholder="Pangkat"
                              id="Pangkat"
                              defaultValue={profil_dosen.Pangkat}
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
                              className="form-control"
                              type="text"
                              placeholder="Jabatan Akademik"
                              id="JabatanAkademik"
                              defaultValue={profil_dosen.JabatanAkademik}
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
                              className="form-control"
                              type="text"
                              placeholder="Email"
                              id="Email"
                              defaultValue={profil_dosen.Email}
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
                                "form-control-label " + dataError.NoTelepon
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Nomor Telpon
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="085******"
                              id="NoTelepon"
                              defaultValue={profil_dosen.NoTelepon}
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
                              className="form-control"
                              type="text"
                              placeholder="Alamat"
                              id="Alamat"
                              defaultValue={profil_dosen.Alamat}
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
