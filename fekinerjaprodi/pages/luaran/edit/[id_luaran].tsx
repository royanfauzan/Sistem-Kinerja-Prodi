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
    `http://127.0.0.1:8000/api/show_luaran/${context.query.id_luaran}`
  );
  const res = await req.data.all_luaran;

  return {
    props: {
      luaran: res, // <-- assign response
    },
  };
}

export default function editluaran(props) {
  const router = useRouter();
  const { luaran } = props;
  const [dataLuaran, setLuaran] = useState(luaran);
  const [dataError, setError] = useState([]);
  const [selectKategori, setselectKategori] = useState(luaran.jenis_luaran);

  console.log(luaran);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataLuarans, setLuarans] = useState([]);
  const [dataRole, setRole] = useState("");

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

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("judul", event.target.judul.value);
    formData.append("keterangan", event.target.keterangan.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("jenis_luaran", event.target.jenis.value);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_luaran/${dataLuaran.id}` +
        `?_method=PUT`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { all_luaran } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(all_luaran);
        router.push("../../luaran/daftarluaran");
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

  const handleChangeKategori = (e) => {
    setselectKategori(e.target.value);
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
                              className="form-control-label"
                            >
                              judul
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="judul"
                              id="judul"
                              defaultValue={dataLuaran.judul}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-4 ms-3">
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
                              defaultValue={dataLuaran.tahun}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-7">
                          <div className="form-group">
                            <label
                              htmlFor="keterangan"
                              className="form-control-label"
                            >
                              Keterangan
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="Keterangan"
                              id="keterangan"
                              defaultValue={dataLuaran.keterangan}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-5">
                          <div className="form-group">
                            <label
                              htmlFor="tahun"
                              className="form-control-label"
                            ></label>
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
                              value={selectKategori}
                              onChange={handleChangeKategori}
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
