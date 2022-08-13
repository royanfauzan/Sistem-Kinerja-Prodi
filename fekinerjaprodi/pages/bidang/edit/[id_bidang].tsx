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
    `http://127.0.0.1:8000/api/show_kesesuaian/${context.query.id_bidang}`
  );
  const res = await req.data.all_kesesuaian;

  return {
    props: {
      kesesuaian: res, // <-- assign response
    },
  };
}

export default function editkesesuaian(props) {
  const router = useRouter();
  const { kesesuaian } = props;
  const [dataKesesuaians, setKesesuaian] = useState(kesesuaian);

  console.log(kesesuaian);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataKesesuaian, setKesesuaians] = useState([]);
  const [selectKesesuaian, setSelectKesesuaian] = useState(
    kesesuaian.kepuasan_id
  );
  const [dataRole, setRole] = useState("");

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
        setKesesuaians(all_prodi);
        console.log(dataKesesuaians);
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

  const handleChangeKesesuaian = (e) => {
    setSelectKesesuaian(e.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("kepuasan_id", event.target.kepuasan.value);
    formData.append("rendah", event.target.rendah.value);
    formData.append("sedang", event.target.sedang.value);
    formData.append("tinggi", event.target.tinggi.value);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_kesesuaian/${dataKesesuaians.id}` +
        `?_method=PUT`,
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
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(profil);
        router.push("../../bidang/daftarbidang");
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
                        Kesesuaian Bidang Kerja
                      </p>
                      <div className="row">
                        <div className="col-md-6">
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
                            >
                              <option>Pilih Tahun Lulusan</option>
                              {dataKesesuaian.map((userkepuasan) => {
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
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="rendah"
                              className="form-control-label"
                            >
                              Tingkat Kepuasan Rendah
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nama Kegiatan"
                              id="rendah"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="sedang"
                              className="form-control-label"
                            >
                              Tingkat Kespuasan Sedang
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="sedang"
                              id="sedang"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tinggi"
                              className="form-control-label"
                            >
                              Tingkat Kespuasan Tinggi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="tinggi"
                              id="tinggi"
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
