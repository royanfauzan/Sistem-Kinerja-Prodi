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
  const [fileBukti, setfileBuktis] = useState<File>([]);
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
    formData.append("tahun_masuk", event.target.tahun.value);
    formData.append("jmlh_mhs", event.target.jumlah_mhs.value);
    formData.append("lulus_thn_1", event.target.satu.value);
    formData.append("lulus_thn_2", event.target.dua.value);
    formData.append("lulus_thn_3", event.target.tiga.value);
    formData.append("lulus_thn_4", event.target.empat.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/masastudi",
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { all_masastudi } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(all_masastudi);
        router.push("../masastudi/daftarmasastudi");
      })
      .catch(function (error) {
        //handle error
        toast.dismiss();
        if (error.response.status == 400) {
          toast.error("Gagal Menyimpan Data!!");
        } else {
          toast.error("Gagal Menyimpan Data");
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
                        Masa Studi Lulusan
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="prodi"
                              className="form-control-label"
                            >
                              Prodi
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="prodi"
                            >
                              <option>Pilih Prodi</option>
                              {userDosens.map((userprodi) => {
                                {
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
                                }
                              })}
                            </select>
                          </div>
                        </div>

                        {/* PRESTASI */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tahun"
                              className="form-control-label"
                            >
                              Tahun Masuk
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tahun Masuk"
                              id="tahun"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="jumlah_mhs"
                              className="form-control-label"
                            >
                              Jumlah Mahasiswa
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah Mahasiswa"
                              id="jumlah_mhs"
                              required
                            />
                          </div>
                        </div>

                        {/* PRESTASI */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jumlah Lulusan
                        </p>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="satu"
                              className="form-control-label"
                            >
                              Jumlah Lulus Tahun 1
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah Lulus Tahun 1"
                              id="satu"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dua" className="form-control-label">
                              Jumlah Lulus Tahun 2
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah Lulus Tahun 2"
                              id="dua"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tiga"
                              className="form-control-label"
                            >
                              Jumlah Lulus Tahun 3
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah Lulus Tahun 3"
                              id="tiga"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="empat"
                              className="form-control-label"
                            >
                              Jumlah Lulus Tahun 4
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah Lulus Tahun 4"
                              id="empat"
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
