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

export default function inputluaran() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);
  const [dataRole, setRole] = useState("");
  const MySwal = withReactContent(Swal);
  const [dataError, setError] = useState([]);

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

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    // let formData = new FormData();
    let formData = new FormData();
    formData.append("judul", event.target.judul.value);
    formData.append("keterangan", event.target.keterangan.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("jenis_luaran", event.target.jenis.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/luaran",
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

        router.push("../luaran/daftarluaran");
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
                      <p className="text-uppercase text-sm">Luaran Lainnya</p>
                      <div className="row">
                        <div className="col-md-7">
                          <div className="form-group">
                            <label
                              htmlFor="judul"
                              className={dataError.judul ? "is-invalid" : ""}
                            >
                              judul
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="Judul Luaran"
                              id="judul"
                            />
                            {dataError.judul ? (
                              <div className="invalid-feedback">
                                {dataError.judul}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-4 ms-3">
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

                        <div className="col-md-7">
                          <div className="form-group">
                            <label
                              htmlFor="keterangan"
                              className={
                                dataError.keterangan ? "is-invalid" : ""
                              }
                            >
                              Keterangan
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="Keterangan"
                              id="keterangan"
                            />
                            {dataError.keterangan ? (
                              <div className="invalid-feedback">
                                {dataError.keterangan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-5">
                          <div className="form-group">
                            <label>
                            </label>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="jenis"
                              className={
                                dataError.jenis_luaran ? "is-invalid" : ""
                              }
                            >
                              Jenis Luaran
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="jenis"
                            >
                              <option value="">Pilih Jenis Luaran</option>
                              <option value="Paten, Paten Sederhana">
                                Bagian-1 HKI (Paten, Paten Sederhana)
                              </option>
                              <option value="Hak Cipta, Desain Produk Industri,
                                dll.">
                                Bagian-2 HKI (Hak Cipta, Desain Produk Industri,
                                dll.)
                              </option>
                              <option value="Teknologi Tepat Guna, Produk, Karya
                                Seni, Rekayasa Sosial">
                                Bagian-3 Teknologi Tepat Guna, Produk, Karya
                                Seni, Rekayasa Sosial
                              </option>
                              <option value="Buku Ber-ISBN, Book Chapter">
                                Bagian-4 Buku Ber-ISBN, Book Chapter
                              </option>
                            </select>
                            {dataError.jenis_luaran ? (
                              <div className="invalid-feedback">
                                {dataError.jenis_luaran}
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
