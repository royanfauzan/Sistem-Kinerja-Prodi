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
    `http://127.0.0.1:8000/api/show_seminar/${context.query.id_seminar}`
  );
  const res = await req.data.all_seminar;

  return {
    props: {
      seminar: res, // <-- assign response
    },
  };
}

export default function editseminar(props) {
  const router = useRouter();
  const { seminar } = props;
  const [dataSeminar, setSeminar] = useState(seminar);

  console.log(seminar);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataSeminars, setSeminars] = useState([]);
  const [selectSeminar, setSelectSeminar] = useState(seminar.mahasiswa_id);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Mahasiswa",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_mhs } = response.data;
        setSeminars(all_mhs);
        console.log(dataSeminars);
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

  const handleChangeSeminar = (e) => {
    setSelectSeminar(e.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("mahasiswa_id", event.target.mahasiswa.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("judul_kegiatan", event.target.judul.value);
    formData.append("penyelenggara", event.target.penyelenggara.value);
    formData.append("kategori_seminar", event.target.kategori.value);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_seminar/${dataSeminar.id}` +
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
        router.push("../../seminar/daftarseminar");
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
                        Seminar Mahasiswa
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="mahasiswa"
                              className="form-control-label"
                            >
                              Nama Mahasiswa
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="mahasiswa"
                              value={selectSeminar}
                              onChange={handleChangeSeminar}
                            >
                              <option>Pilih Mahasiswa</option>
                              {dataSeminars.map((usermahasiswa) => {
                                {
                                  return (
                                    <option
                                      value={usermahasiswa.id}
                                      key={usermahasiswa.id}
                                    >
                                      {usermahasiswa.nim}
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
                              defaultValue={dataSeminar.tahun}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="judul"
                              className="form-control-label"
                            >
                              Judul Kegiatan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Judul Kegiatan"
                              id="judul"
                              defaultValue={dataSeminar.judul_kegiatan}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="penyelenggara"
                              className="form-control-label"
                            >
                              Penyelenggara
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Penyelenggara"
                              id="penyelenggara"
                              defaultValue={dataSeminar.penyelenggara}
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
                              Kategori Seminar
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="K Seminarategori"
                              id="kategori"
                              defaultValue={dataSeminar.kategori_seminar}
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
