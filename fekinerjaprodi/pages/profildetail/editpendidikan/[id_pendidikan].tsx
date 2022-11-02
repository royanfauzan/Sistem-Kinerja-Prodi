import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import CardSertif from "../../../components/Molecule/MenuCard/CardSertif";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Untuk Ngambil Data Berdasarkan ID

export async function getServerSideProps(context) {
  //http request
  const req = await axios.get(
    `http://127.0.0.1:8000/api/tampil_pendidikan/${context.query.id_pendidikan}`
  );
  const res = await req.data.datapendidikan;

  return {
    props: {
      datapendidikan: res, // <-- assign response
    },
  };
}

export default function inputpendidikan(props) {
  const apiurl = "http://127.0.0.1:8000/";
  const { datapendidikan } = props;
  const MySwal = withReactContent(Swal);

  const router = useRouter();

  const [dataPendidikanDosen, setPendidikanDosen] = useState(datapendidikan);
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
    formData.append("profil_dosen_id", dataPendidikanDosen.profil_dosen_id);
    formData.append(
      "program_pendidikan",
      event.target.program_pendidikan.value
    );
    formData.append("jurusan", event.target.jurusan.value);
    formData.append("prodi", event.target.prodi.value);
    formData.append("perguruan_tinggi", event.target.perguruan_tinggi.value);
    formData.append("tahun_lulus", event.target.tahun_lulus.value);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_pendidikan/${dataPendidikanDosen.id}?_method=PUT`,
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
              router.push(`/profildosen/lihatprofil/${dataPendidikanDosen.profil_dosen.NIDK}`);
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

  const deletePendidikan = (id,nama) => {
    MySwal.fire({
      title: `Yakin akan menghapus Pendidikan ${nama}?`,
      text: "Data ini akan dihapus secara Permanen!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
    }).then((result) => {
      // <--
      if (result.isConfirmed) {
        // <-- if confirmed
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/delete_pendidikan/${id}`,
        })
          .then(function (response) {
            if (dataRole == "dosen") {
              router.push("/profildosen/myprofil");
            } else {
              router.push(`/profildosen/lihatprofil/${dataPendidikanDosen.profil_dosen.NIDK}`);
            }
          })
          .catch(function (err) {
            console.log("gagal");
            console.log(err.response);
          });
      }
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
                              defaultValue={`${dataPendidikanDosen.profil_dosen.NamaDosen}`}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group">
                            <label
                              htmlFor="program_pendidikan"
                              className={
                                "form-control-label " +
                                dataError.program_pendidikan
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Program Pendidikan
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={
                                dataPendidikanDosen.program_pendidikan
                              }
                              id="program_pendidikan"
                            >
                              <option value={`S2`}>
                                S2(Magister/Magister Terapan)
                              </option>
                              <option value={`S3`}>
                                S3(Doktor/Doktor Terapan)
                              </option>
                            </select>
                            {dataError.program_pendidikan ? (
                              <div className="invalid-feedback">
                                {dataError.program_pendidikan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="jurusan"
                              className={
                                "form-control-label " + dataError.jurusan
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Jurusan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Teknik Elektro"
                              defaultValue={dataPendidikanDosen.jurusan}
                              id="jurusan"
                            />
                            {dataError.jurusan ? (
                              <div className="invalid-feedback">
                                {dataError.jurusan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label
                              htmlFor="prodi"
                              className={
                                "form-control-label " + dataError.prodi
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Program Studi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Sains Komputer"
                              defaultValue={dataPendidikanDosen.prodi}
                              id="prodi"
                            />
                            {dataError.prodi ? (
                              <div className="invalid-feedback">
                                {dataError.prodi}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="perguruan_tinggi"
                              className={
                                "form-control-label " +
                                dataError.perguruan_tinggi
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Perguruan Tinggi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="UNUD"
                              defaultValue={
                                dataPendidikanDosen.perguruan_tinggi
                              }
                              id="perguruan_tinggi"
                            />
                            {dataError.perguruan_tinggi ? (
                              <div className="invalid-feedback">
                                {dataError.perguruan_tinggi}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tahun_lulus"
                              className={
                                "form-control-label " + dataError.tahun_lulus
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Tahun Lulus
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="2008"
                              defaultValue={dataPendidikanDosen.tahun_lulus}
                              id="tahun_lulus"
                            />
                            {dataError.tahun_lulus ? (
                              <div className="invalid-feedback">
                                {dataError.tahun_lulus}
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
                <div className="row">
                  <div className="col-12">
                    <CardSertif judul={"HAPUS DATA"}>
                      <div className="col-12 mt-4">
                        <div className="row">
                          <button
                            className="btn btn-sm btn-outline-danger shadow-sm ps-3 pe-3 mb-2 me-3 mt-2"
                            type={`button`}
                            onClick={() => deletePendidikan(dataPendidikanDosen.id,dataPendidikanDosen.program_pendidikan)}
                          >
                            Hapus Data Pendidikan
                          </button>
                        </div>
                      </div>
                    </CardSertif>
                  </div>
                </div>
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
