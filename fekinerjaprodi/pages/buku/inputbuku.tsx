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

export default function inputpagelaran() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);
  const [filebukti, setfilebuktis] = useState<File>([]);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);
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

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    // let formData = new FormData();
    let formData = new FormData();
    formData.append("judul", event.target.judul.value);
    formData.append("kategori_jurnal", event.target.kategori.value);
    formData.append("nm_jurnal", event.target.nama.value);
    formData.append("keterangan", event.target.keterangan.value);
    formData.append("volume", event.target.volume.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("nomor", event.target.nomor.value);
    formData.append("halaman", event.target.halaman.value);
    formData.append("sitasi", event.target.sitasi.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/buku",
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

        router.push("../buku/daftarbuku");
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
                        Pagelaran Mahasiswa
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="judul"
                              className="form-control-label"
                            >
                              Judul
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Judul"
                              id="judul"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kategori"
                              className={
                                dataError.kategori_jurnal ? "is-invalid" : ""
                              }
                            >
                              Kategori Jurnal
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="kategori"
                            >
                              <option value="">Pilih Kategori Jurnal</option>
                              <option value="tidak terakreditasi">
                                Jurnal Penelitian Tidak Terakreditasi
                              </option>
                              <option value="nasional terakreditasi">
                                Jurnal penelitian nasional terakreditasi
                              </option>
                              <option value="internasional">
                                Jurnal penelitian internasional
                              </option>
                              <option value="internasional bereputasi">
                                Jurnal penelitian internasional bereputasi
                              </option>
                            </select>
                            {dataError.kategori_jurnal ? (
                              <div className="invalid-feedback">
                                {dataError.kategori_jurnal}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="nama"
                              className="form-control-label"
                            >
                              Nama Jurnal
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nama Jurnal"
                              id="nama"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="keterangan"
                              className="form-control-label"
                            >
                              Keterangan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Keterangan"
                              id="keterangan"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="volume"
                              className="form-control-label"
                            >
                              Volume
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Volume"
                              id="volume"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tahun"
                              className="form-control-label"
                            >
                              Tahun
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tahun"
                              id="tahun"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="nomor"
                              className="form-control-label"
                            >
                              Nomor
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nomor"
                              id="nomor"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="halaman"
                              className="form-control-label"
                            >
                              Halaman
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Halaman"
                              id="halaman"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="sitasi"
                              className="form-control-label"
                            >
                              Sitasi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Sitasi"
                              id="sitasi"
                              required
                            />
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
