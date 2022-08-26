import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";

// Untuk Ngambil Data Berdasarkan ID
export async function getServerSideProps(context) {
  //http request
  const req = await axios.get(
    `http://127.0.0.1:8000/api/show_waktutunggu/${context.query.id_waktu}`
  );
  const res = await req.data.all_waktu;

  return {
    props: {
      waktu: res, // <-- assign response
    },
  };
}

export default function editwaktu(props) {
  const router = useRouter();
  const { waktu } = props;
  const [dataWaktu, setWaktu] = useState(waktu);
  const [dataRole, setRole] = useState('');

  console.log(waktu);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataWaktus, setWaktus] = useState([]);
  const [selectWaktu, setSelectWaktu] = useState(waktu.kepuasan_id);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/kepuasan",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_prodi } = response.data;
        setWaktus(all_prodi);
        console.log(dataWaktus);
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

  const handleChangeWaktu = (e) => {
    setSelectWaktu(e.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("kepuasan_id", event.target.kepuasan.value);
    formData.append("jmlh_lls_dipesan", event.target.dipesan.value);
    formData.append("jmlh_tunggu_lls_3bln", event.target.tiga.value);
    formData.append("jmlh_tunggu_lls_6bln", event.target.enam.value);
    formData.append("jmlh_tunggu_lls_lebih_6bln", event.target.enamlebih.value);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_waktutunggu/${dataWaktu.id}` +
        `?_method=PUT`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { all_waktu } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(all_waktu);
        router.push("../../waktutunggu/daftarwaktu");
        console.log(response.data);
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
                        Prestasi Mahasiswa
                      </p>
                      <div className="row">
                        <div className="col-md-10">
                          <div className="form-group">
                            <label
                              htmlFor="kepuasan"
                              className="form-control-label"
                            >
                              Tahun Kepuasan Lulusan
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="kepuasan"
                              value={selectWaktu}
                              onChange={handleChangeWaktu}
                            >
                              <option>Pilih Tahun Lulusan</option>
                              {dataWaktus.map((userkepuasan) => {
                                {
                                  return (
                                    <option
                                      value={userkepuasan.id}
                                      key={userkepuasan.id}
                                    >
                                      {userkepuasan.tahun}
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
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jumlah Lulusan Dipesan
                        </p>
                        <div className="col-md-10">
                          <div className="form-group">
                            <label
                              htmlFor="dipesan"
                              className="form-control-label"
                            >
                              Jumlah Lulusan Dipesan
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah Lulusan Dipesan"
                              id="dipesan"
                              defaultValue={dataWaktu.jmlh_lls_dipesan}
                              required
                            />
                          </div>
                        </div>

                         {/* PRESTASI */}
                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold text-bold" />
                        <p className="text-uppercase text-dark mb-0 text-sm mb-3">
                          Jumlah Lulusan Sesuai Waktu Tunggu
                        </p>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tiga"
                              className="form-control-label"
                            >
                              Jumlah tunggu lulusan 3 bulan
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah tunggu lulusan 3 bulan"
                              id="tiga"
                              defaultValue={dataWaktu.jmlh_tunggu_lls_3bln}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="enam"
                              className="form-control-label"
                            >
                              Jumlah tunggu lulusan 6 bulan
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah tunggu lulusan 6 bulan"
                              id="enam"
                              defaultValue={dataWaktu.jmlh_tunggu_lls_6bln}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="enamlebih"
                              className="form-control-label"
                            >
                              Jumlah tunggu lulusan lebih 6 bulan
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Jumlah tunggu lulusan lebih 6 bulan"
                              id="enamlebih"
                              defaultValue={dataWaktu.jmlh_tunggu_lls_lebih_6bln}
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
