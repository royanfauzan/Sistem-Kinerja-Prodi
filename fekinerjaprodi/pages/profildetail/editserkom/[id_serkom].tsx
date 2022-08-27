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
    `http://127.0.0.1:8000/api/tampil_serkom/${context.query.id_serkom}`
  );
  const res = await req.data.dataserkom;

  return {
    props: {
      dataserkom: res, // <-- assign response
    },
  };
}

export default function inputserkom(props) {
  const apiurl = "http://127.0.0.1:8000/";
  const { dataserkom } = props;

  const router = useRouter();

  const [dataSerkomDosen, setSerkomDosen] = useState(dataserkom);
  const [dataError, setError] = useState([]);
  const [filebukti, setfilebuktis] = useState<File>([]);

  const [dataRole, setRole] = useState("");

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input

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
        // if (level_akses !== 3) {
        //   return router.push("/profildosen/myprofil");
        // }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin

        setStadmin(true);
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
    formData.append("profil_dosen_id", dataSerkomDosen.profil_dosen_id);
    formData.append("nama_skema", event.target.nama_skema.value);
    formData.append("nomor_sertifikat", event.target.nomor_sertifikat.value);
    formData.append("tanggal_sertif", event.target.tanggal_sertif.value);
    formData.append(
      "lembaga_sertifikasi",
      event.target.lembaga_sertifikasi.value
    );
    formData.append("dikeluarkan_oleh", event.target.dikeluarkan_oleh.value);
    formData.append("file_bukti", filebukti);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_serkom/${dataSerkomDosen.id}?_method=PUT`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { detailDosen } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Simpan Sukses!!");
        // console.log(token);
        console.log(detailDosen);
        if (dataRole == "dosen") {
          router.push("/profildosen/myprofil");
        } else {
          router.push("/profildosen/tabelprofil");
        }
      })
      .catch(function (error) {
        toast.dismiss();
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            if (dataRole == "dosen") {
              router.push("/profildosen/myprofil");
            } else {
              router.push("/profildosen/tabelprofil");
            }
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
                        <p className="mb-0">Sertifikat Kompetensi</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Update Data
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">
                        Detail Sertifikat Kompetensi
                      </p>
                      <div className="row">
                        <div className="col-10">
                          <div className="form-group">
                            <label
                              htmlFor="identitas"
                              className={
                                "form-control-label " + dataError.jurusan
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Nama Dosen
                            </label>
                            <input
                              className="form-control-plaintext"
                              type="text"
                              placeholder="Teknik Elektro"
                              id="identitas"
                              defaultValue={`${dataSerkomDosen.profil_dosen.NamaDosen}`}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="nomor_sertifikat"
                              className={
                                "form-control-label " +
                                dataError.nomor_sertifikat
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Nomor Sertifikat
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Serdos(781******)"
                              id="nomor_sertifikat"
                              defaultValue={dataSerkomDosen.nomor_sertifikat}
                            />
                            {dataError.nomor_sertifikat ? (
                              <div className="invalid-feedback">
                                {dataError.nomor_sertifikat}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <label
                              htmlFor="nama_skema"
                              className={
                                "form-control-label " + dataError.nama_skema
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Nama Skema
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Skema sertifikasi"
                              id="nama_skema"
                              defaultValue={dataSerkomDosen.nama_skema}
                            />
                            {dataError.nama_skema ? (
                              <div className="invalid-feedback">
                                {dataError.nama_skema}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label
                              htmlFor="tanggal_sertif"
                              className={
                                "form-control-label " + dataError.tanggal_sertif
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Tanggal Terbit
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              placeholder="Skema sertifikasi"
                              id="tanggal_sertif"
                              defaultValue={dataSerkomDosen.tanggal_sertif}
                            />
                            {dataError.tanggal_sertif ? (
                              <div className="invalid-feedback">
                                {dataError.tanggal_sertif}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="fileBukti"
                              className={
                                dataError.file_bukti ? "is-invalid" : ""
                              }
                            >
                              File Bukti :{" "}
                              {dataSerkomDosen.file_bukti ? (
                                <span>
                                  <a
                                    href={`${
                                      apiurl + dataSerkomDosen.file_bukti
                                    }`}
                                  >
                                    {
                                      dataSerkomDosen.file_bukti
                                        .split("/")
                                        .slice(-1)[0]
                                    }
                                  </a>
                                </span>
                              ) : (
                                <span> </span>
                              )}
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
                        <hr className="horizontal dark" />
                        <p className="text-uppercase text-sm">
                          Detail Tambahan
                        </p>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="lembaga_sertifikasi"
                                className={
                                  "form-control-label " +
                                  dataError.lembaga_sertifikasi
                                    ? "is-invalid"
                                    : ""
                                }
                              >
                                Lembaga Sertifikasi
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Skema sertifikasi"
                                id="lembaga_sertifikasi"
                                defaultValue={
                                  dataSerkomDosen.lembaga_sertifikasi
                                }
                              />
                              {dataError.lembaga_sertifikasi ? (
                                <div className="invalid-feedback">
                                  {dataError.lembaga_sertifikasi}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="dikeluarkan_oleh"
                                className={
                                  "form-control-label " +
                                  dataError.dikeluarkan_oleh
                                    ? "is-invalid"
                                    : ""
                                }
                              >
                                Lembaga Penerbit Sertifikat
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Skema sertifikasi"
                                id="dikeluarkan_oleh"
                                defaultValue={dataSerkomDosen.dikeluarkan_oleh}
                              />
                              {dataError.dikeluarkan_oleh ? (
                                <div className="invalid-feedback">
                                  {dataError.dikeluarkan_oleh}
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
