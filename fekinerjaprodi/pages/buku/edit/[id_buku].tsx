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
    `http://127.0.0.1:8000/api/show_buku/${context.query.id_buku}`
  );
  const res = await req.data.all_buku;

  return {
    props: {
      buku: res, // <-- assign response
    },
  };
}

export default function editbuku(props) {
  const router = useRouter();
  const { buku } = props;
  const [dataBuku, setBuku] = useState(buku);

  console.log(buku);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [selectTingkat, setselectTingkat] = useState(buku.kategori_jurnal);
  const url = "http://127.0.0.1:8000/";
  const [dataurl, setUrl] = useState(url);
  const [dataBukus, setBukus] = useState([]);

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
    formData.append("kategori_jurnal", event.target.kategori.value);
    formData.append("nm_jurnal", event.target.nama.value);
    formData.append("keterangan", event.target.keterangan.value);
    formData.append("volume", event.target.volume.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("nomor", event.target.nomor.value);
    formData.append("halaman", event.target.halaman.value);
    formData.append("sitasi", event.target.sitasi.value);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_buku/${dataBuku.id}` + `?_method=PUT`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { all_buku } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(all_buku);
        router.push("../../buku/daftarbuku");
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

  const handleChangeTingkat = (e) => {
    setselectTingkat(e.target.value);
   
  };

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);
  };

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm>
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
                              defaultValue={dataBuku.judul}
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
                              Kategori Jurnal
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="kategori"
                              value={selectTingkat}
                              onChange={handleChangeTingkat}
                              required
                            >
                              <option value="">Pilih Kategori Jurnal</option>
                              <option value="Jurnal Penelitian Tidak Terakreditasi">
                                Jurnal Penelitian Tidak Terakreditasi
                              </option>
                              <option value="Jurnal penelitian nasional terakreditasi">
                                Jurnal penelitian nasional terakreditasi
                              </option>
                              <option value="Jurnal penelitian internasional">
                                Jurnal penelitian internasional
                              </option>
                              <option value="Jurnal penelitian internasional bereputasi">
                                Jurnal penelitian internasional bereputasi
                              </option>
                            </select>
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
                              defaultValue={dataBuku.nm_jurnal}
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
                              defaultValue={dataBuku.keterangan}
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
                              defaultValue={dataBuku.volume}
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
                              defaultValue={dataBuku.tahun}
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
                              defaultValue={dataBuku.nomor}
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
                              defaultValue={dataBuku.halaman}
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
                              defaultValue={dataBuku.sitasi}
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
