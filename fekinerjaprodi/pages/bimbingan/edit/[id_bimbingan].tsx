import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";

export async function getServerSideProps(context) {
  //http request
  const req = await axios.get(
    `http://127.0.0.1:8000/api/tampil_bimbingan/${context.query.id_bimbingan}`
  );
  const res = await req.data.databimbingan;

  return {
    props: {
        databimbingan: res, // <-- assign response
    },
  };
}

export default function editbimbingandsn(props) {
  const router = useRouter();
  const {databimbingan}=props;
  const apiurl = "http://127.0.0.1:8000/"

  const [userDosens, setuserDosens] = useState([]);
  const [dataProdis, setdataProdis] = useState([]);
  const [userDosen, setuserDosen] = useState();
  const [dataBimbingan, setdataBimbingan] = useState(databimbingan);
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
      url: "http://127.0.0.1:8000/api/Prodi/",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { Prodi } = response.data;
        setdataProdis(Prodi);
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
    formData.append("judul_ta", event.target.judul_ta.value);
    formData.append("nama_mhs", event.target.nama_mhs.value);
    formData.append("nim_mhs", event.target.nim_mhs.value);
    formData.append("prodi_id", event.target.prodi_id.value);
    formData.append("tahun_akademik", event.target.tahun_akademik.value);
    formData.append("fileBukti", filebukti);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_bimbingan/${dataBimbingan.id}?_method=PUT`,
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
        router.push("/bimbingan/tabelbimbingandsn");
      })
      .catch(function (error) {
        toast.dismiss();
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            router.push("/bimbingan/tabelbimbingandsn");
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
                        <p className="mb-0">Pembimbing Utama Tugas akhir</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Update Data
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <p className="text-uppercase text-sm">Data Bimbingan</p>
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
                        BImbingan: Data Mahasiswa
                      </p>
                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group">
                            <label
                              htmlFor="prodi_id"
                              className={
                                "form-control-label " + dataError.prodi_id
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Program Studi
                            </label>

                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={dataBimbingan.prodi_id}
                              id="prodi_id"
                            >
                              {dataProdis.map((prodi) => {
                                return (
                                  <option
                                    value={prodi.id}
                                    key={`mtk-${prodi.id}`}
                                  >
                                    {`${prodi.prodi}  ${prodi.nama_prodi}`}
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

                        <div className="col-4">
                          <div className="form-group">
                            <label
                              htmlFor="nim_mhs"
                              className={
                                "form-control-label " + dataError.nim_mhs
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              NIM Mahasiswa
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="191532****"
                              defaultValue={dataBimbingan.mahasiswa.nim}
                              id="nim_mhs"
                            />
                            {dataError.nim_mhs ? (
                              <div className="invalid-feedback">
                                {dataError.nim_mhs}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label
                              htmlFor="nama_mhs"
                              className={
                                "form-control-label " + dataError.nama_mhs
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Nama Mahasiswa
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Kadek Utama "
                              defaultValue={dataBimbingan.mahasiswa.nama}
                              id="nama_mhs"
                            />
                            {dataError.nama_mhs ? (
                              <div className="invalid-feedback">
                                {dataError.nama_mhs}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">
                        Bimbingan: Data Tugas Akhir
                      </p>
                      <div className="row">
                        <div className="col-8">
                          <div className="form-group">
                            <label
                              htmlFor="judul_ta"
                              className={
                                "form-control-label " + dataError.judul_ta
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Judul Tugas Akhir
                            </label>
                            <textarea
                              className="form-control"
                              defaultValue={dataBimbingan.judul_ta}
                              placeholder="judul_ta"
                              id="judul_ta"
                            ></textarea>
                            {dataError.judul_ta ? (
                              <div className="invalid-feedback">
                                {dataError.judul_ta}
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
                              placeholder="2021/2022"
                              defaultValue={dataBimbingan.tahun_akademik}
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
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">Bukti Laporan</p>
                      <div className="row">
                        <div className="row">
                          <div className="col-md-11">
                            <div className="form-group">
                              <label
                                htmlFor="fileBukti"
                                className={
                                  dataError.fileBukti ? "is-invalid" : ""
                                }
                              >
                                File Bukti : <span><a href={`${apiurl+dataBimbingan.fileBukti}`}>{dataBimbingan.fileBukti.split("/").slice(-1)[0] }</a></span>
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                onChange={handleChangeFile}
                                id="fileBukti"
                              />
                              {dataError.fileBukti ? (
                                <div className="invalid-feedback">
                                  {dataError.fileBukti}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
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
