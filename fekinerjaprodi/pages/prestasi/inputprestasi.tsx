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

export default function inputprestasi() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);
  const [dataError, setError] = useState([]);
  const [fileBukti, setfileBuktis] = useState<File>([]);
  const MySwal = withReactContent(Swal);
  const [dataRole, setRole] = useState("");

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
        setuserDosens(Prodi);
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

  const handleChangeFile = (e) => {
    setfileBuktis(e.target.files[0]);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("prodi_id", event.target.prodi.value);
    formData.append("nm_kegiatan", event.target.nm_kegiatan.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("tingkat", event.target.tingkat.value);
    formData.append("prestasi_dicapai", event.target.dicapai.value);
    formData.append("kategori", event.target.kategori.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/prestasi",
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

        router.push("../prestasi/daftarprestasi");
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
                        Prestasi Mahasiswa
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="prodi"
                              className={dataError.prodi_id ? "is-invalid" : ""}
                            >
                              Prodi
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="prodi"
                            >
                              <option value="">Pilih Prodi</option>
                              {userDosens.map((userprodi) => {
                                return (
                                  <option
                                    value={userprodi.id}
                                    key={userprodi.id}
                                  >
                                    {userprodi.prodi +
                                      ` ` +
                                      userprodi.nama_prodi}
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

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="nm_kegiatan"
                              className={
                                dataError.nm_kegiatan ? "is-invalid" : ""
                              }
                            >
                              Nama Kegiatan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nama Kegiatan"
                              id="nm_kegiatan"
                            />
                            {dataError.nm_kegiatan ? (
                              <div className="invalid-feedback">
                                {dataError.nm_kegiatan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tahun"
                              className={dataError.tahun ? "is-invalid" : ""}
                            >
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
                            <label
                              htmlFor="tingkat"
                              className={dataError.tingkat ? "is-invalid" : ""}
                            >
                              Tingkat
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="tingkat"
                            >
                              <option value="">Pilih Tingkatan</option>
                              <option value="Internasional">
                                Internasional
                              </option>
                              <option value="Nasional">Nasional</option>
                              <option value="Lokal">Lokal</option>
                            </select>
                            {dataError.tingkat ? (
                              <div className="invalid-feedback">
                                {dataError.tingkat}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="dicapai"
                              className={
                                dataError.prestasi_dicapai ? "is-invalid" : ""
                              }
                            >
                              Prestasi Dicapai
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Prestasi Dicapai"
                              id="dicapai"
                            />
                            {dataError.prestasi_dicapai ? (
                              <div className="invalid-feedback">
                                {dataError.prestasi_dicapai}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kategori"
                              className={dataError.kategori ? "is-invalid" : ""}
                            >
                              Kategori
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="kategori"
                            >
                              <option value="">Pilih kategori</option>
                              <option value="Nasional">Akademik</option>
                              <option value="Lokal">Non Akademik</option>
                            </select>
                            {dataError.kategori ? (
                              <div className="invalid-feedback">
                                {dataError.kategori}
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
