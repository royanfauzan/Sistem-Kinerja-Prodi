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
    `http://127.0.0.1:8000/api/show_ipk/${context.query.id_ipk}`
  );
  const res = await req.data.all_ipk;

  return {
    props: {
      ipk: res, // <-- assign response
    },
  };
}

export default function editprestasi(props) {
  const router = useRouter();
  const { ipk } = props;
  const [dataIPK, setIPK] = useState(ipk);

  console.log(ipk);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataIPKs, setPrestasis] = useState([]);
  const [selectIPK, setselectIPK] = useState(ipk.prodi_id);
  const [dataRole, setRole] = useState("");

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
        setPrestasis(Prodi);
        console.log(dataIPKs);
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

  const handleChangeIPK = (e) => {
    setselectIPK(e.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("prodi_id", event.target.prodi.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("jmlh_lulusan", event.target.jmlh_lulusan.value);
    formData.append("ipk_min", event.target.min.value);
    formData.append("ipk_max", event.target.max.value);
    formData.append("ipk_avg", event.target.avg.value);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/update_ipk/${dataIPK.id}` + `?_method=PUT`,
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
        toast.success("Login Sukses!!");
        // console.log(token);
        console.log(profil);
        router.push("../../ipk/daftaripk");
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
                      <p className="text-uppercase text-sm mb-3">
                        <h6>IPK Lulusan</h6>
                      </p>
                      <div className="row">
                        <div className="col-md-12">
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
                              id="prodi"
                              value={selectIPK}
                              onChange={handleChangeIPK}
                            >
                              <option>Pilih Prodi</option>
                              {dataIPKs.map((userprodi) => {
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
                              defaultValue={dataIPK.tahun}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="jmlh_lulusan"
                              className="form-control-label"
                            >
                              Jumlah Lulusan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Jumlah Lulusan"
                              id="jmlh_lulusan"
                              defaultValue={dataIPK.jmlh_lulusan}
                              required
                            />
                          </div>
                        </div>

                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold" />
                        <p className="text-uppercase text-sm">
                          Nilai IPK Mahasiswa
                        </p>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="min" className="form-control-label">
                              IPK Minimal
                            </label>
                            <input
                              className="form-control"
                              type="varchar"
                              placeholder="IPK Minimal"
                              id="min"
                              defaultValue={dataIPK.ipk_min}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="max" className="form-control-label">
                              IPK Maksimal
                            </label>
                            <input
                              className="form-control"
                              type="varchar"
                              placeholder="IPK Maksimal"
                              id="max"
                              defaultValue={dataIPK.ipk_max}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="avg" className="form-control-label">
                              IPK Rata - rata
                            </label>
                            <input
                              className="form-control"
                              type="varchar"
                              placeholder="IPK Rata - rata"
                              id="avg"
                              defaultValue={dataIPK.ipk_avg}
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
