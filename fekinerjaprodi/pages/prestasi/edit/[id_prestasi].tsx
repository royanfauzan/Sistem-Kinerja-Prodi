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
    `http://127.0.0.1:8000/api/show_prestasi/${context.query.id_prestasi}`
  );
  const res = await req.data.all_prestasi;

  return {
    props: {
      prestasi: res, // <-- assign response
    },
  };
}

export default function editprestasi(props) {
  const router = useRouter();
  const { prestasi } = props;
  const [dataPrestasi, setPrestasi] = useState(prestasi);

  console.log(prestasi);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataPrestasis, setPrestasis] = useState([]);
  const [selectTingkat, setselectTingkat] = useState(prestasi.tingkat);
  const [selectKategori, setselectKategori] = useState(prestasi.kategori);
  const [selectPrestasi, setSelectPrestasi] = useState(prestasi.prodi_id);
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
        console.log(dataPrestasis);
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

  const handleChangePrestasi = (e) => {
    setSelectPrestasi(e.target.value);
  };

  const handleChangeKategori = (e) => {
    setselectKategori(e.target.value);
  };

  const handleChangeTingkat = (e) => {
    setselectTingkat(e.target.value);
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

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_prestasi/${dataPrestasi.id}` +
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
        toast.success("Login Sukses!!");
        // console.log(token);
        console.log(profil);
        router.push("../../prestasi/daftarprestasi");
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
                              id="prodi"
                              value={selectPrestasi}
                              onChange={handleChangePrestasi}
                            >
                              <option>Pilih Prodi</option>
                              {dataPrestasis.map((userprodi) => {
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
                              placeholder="Jumlah Lulusan"
                              id="tahun"
                              defaultValue={dataPrestasi.tahun}
                              required
                            />
                          </div>
                        </div>

                        {/* Garis */}
                        <hr className="horizontal dark mt-4 text-bold" />
                        <p className="text-uppercase text-sm">
                          Prestasi: Akademik dan Non Akademik
                        </p>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="nm_kegiatan"
                              className="form-control-label"
                            >
                              Nama Kegiatan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tahun"
                              id="nm_kegiatan"
                              defaultValue={dataPrestasi.nm_kegiatan}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tingkat"
                              className="form-control-label"
                            >
                              Tingkat
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="tingkat"
                              value={selectTingkat}
                              onChange={handleChangeTingkat}
                              required
                            >
                              <option>Tingkat Prestasi</option>
                              <option value="Lokal"> Lokal</option>
                              <option value="Nasional"> Nasional</option>
                              <option value="Internasional">
                                {" "}
                                Internasional
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="dicapai"
                              className="form-control-label"
                            >
                              Prestasi Dicapai
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Jumlah Terlacak"
                              id="dicapai"
                              defaultValue={dataPrestasi.prestasi_dicapai}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kategori"
                              className="form-control-label"
                            >
                              Kategori
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="kategori"
                              value={selectKategori}
                              onChange={handleChangeKategori}
                              required
                            >
                              <option>Pilih Kategori</option>
                              <option value="Akademik"> Akademik</option>
                              <option value="Non Akademik">
                                {" "}
                                Non Akademik
                              </option>
                            </select>
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
