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
    `http://127.0.0.1:8000/api/tampil_detail/${context.query.id_detaildosen}`
  );
  const res = await req.data.datadetail;

  return {
    props: {
      datadetail: res, // <-- assign response
    },
  };
}

export default function update_dataprofil(props) {
  const { datadetail } = props;

  const apiurl = "http://127.0.0.1:8000/";

  const router = useRouter();

  const [dataDetailDosen, setDetailDosen] = useState(datadetail);
  const [dataError, setError] = useState([]);
  const [filebukti, setfilebuktis] = useState<File>([]);

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
        // if (level_akses !== 2) {
        //   return router.push("/profildosen/daftarprofil");
        // }
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
    formData.append("profil_dosen_id", dataDetailDosen.profil_dosen_id);
    formData.append("kesesuaian", dataDetailDosen.kesesuaian);
    formData.append("bidangKeahlian", dataDetailDosen.bidangKeahlian);
    formData.append("noSertifPendidik", event.target.noSertifPendidik.value);
    formData.append("perusahaan", event.target.perusahaan.value);
    formData.append("fileBukti", filebukti);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_detail/${dataDetailDosen.id}?_method=PUT`,
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
        if (dataRole=='dosen') {
          router.push("/profildosen/myprofil");
        }else{
          router.push("/profildosen/tabelprofil");
        }

      })
      .catch(function (error) {
        toast.dismiss();
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            if (dataRole=='dosen') {
              router.push("/profildosen/myprofil");
            }else{
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
                        <p className="mb-0">Sertifikat Pendidik Professional</p>
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
                        Detail Sertifikat Pendidik
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="noSertifPendidik"
                              className={
                                "form-control-label " +
                                dataError.noSertifPendidik
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
                              id="noSertifPendidik"
                              defaultValue={dataDetailDosen.noSertifPendidik}
                            />
                            {dataError.noSertifPendidik ? (
                              <div className="invalid-feedback">
                                {dataError.noSertifPendidik}
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
                                dataError.fileBukti ? "is-invalid" : ""
                              }
                            >
                              File Bukti :{" "}
                              {dataDetailDosen.fileBukti ? (
                                <span>
                                  <a
                                    href={`${
                                      apiurl + dataDetailDosen.fileBukti
                                    }`}
                                  >
                                    {
                                      dataDetailDosen.fileBukti
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
                              disabled={dataDetailDosen.profil_dosen.StatusDosen!='Dosen Industri'}
                                className="form-control"
                                type="text"
                                placeholder="PT Pilar"
                                id="perusahaan"
                                defaultValue={dataDetailDosen.perusahaan}
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
