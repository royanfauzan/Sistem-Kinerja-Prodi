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
    `http://127.0.0.1:8000/api/show_mahasiswa_asing/${context.query.id_mhsAsing}`
  );
  const res = await req.data.tampil_mahasiswa_asing;

  return {
    props: {
      mahasiswaAsing: res, // <-- assign response
    },
  };
}

export default function editMahasiswaAsing(props) {
  const router = useRouter();
  const { mahasiswaAsing } = props;
  const [dataMahasiswaAsing, setdataMahasiswaAsing] = useState(mahasiswaAsing);
  console.log(dataMahasiswaAsing);
  const [dataProdi, setdataProdi] = useState([]);
  const [selectProdi, setSelectProdi] = useState(
    mahasiswaAsing.Program_Studi_Prodi_Id
  );

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
        setdataProdi(Prodi);
        console.log(dataProdi);
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

  const handleChangeProdi = (e) => {
    setSelectProdi(e.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("Tahun_Akademik", event.target.tahun_akademik.value);
    formData.append("Program_Studi", event.target.mahasiswa_aktif.value);
    formData.append("Mahasiswa_Aktif_Fulltime",event.target.mahasiswa_fulltime.value);
    formData.append("Mahasiswa_Aktif", event.target.mahasiswa_aktif.value);
    formData.append("Mahasiswa_Aktif_Parttime",event.target.mahasiswa_parttime.value );
    formData.append("Program_Studi_Prodi_Id", event.target.prodi.value);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_mahasiswa_asing/${dataMahasiswaAsing.id}`,
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
        router.push("/");
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
                        <p className="mb-0">Input Data Mahasiswa Asing</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="text-uppercase text-sm"> Mahasiswa Asing</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="prodi"
                              className="form-control-label"
                            >
                              Nama Prodi
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={selectProdi}
                              onChange={handleChangeProdi}
                              id="prodi"
                            >
                              <option>Pilih Prodi</option>
                              {dataProdi.map((dataProdi) => {
                                return (
                                  <option
                                    value={dataProdi.id}
                                    key={dataProdi.id}
                                  >
                                    {dataProdi.nama_prodi}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tahun_akademik"
                              className="form-control-label"
                            >
                              Tahun Akademik
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Tahun Akademik"
                              id="tahun_akademik"
                              defaultValue={dataMahasiswaAsing.Tahun_Akademik}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="mahasiswa_aktif"
                              className="form-control-label"
                            >
                              Mahasiswa Aktif
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mahasiswa Aktif"
                              id="mahasiswa_aktif"
                              defaultValue={dataMahasiswaAsing.Mahasiswa_Aktif}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="mahasiswa_fulltime"
                              className="form-control-label"
                            >
                              Mahasiswa Aktif Fulltime
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mahasiswa Aktif Fulltime"
                              id="mahasiswa_fulltime"
                              defaultValue={dataMahasiswaAsing.Mahasiswa_Aktif_Fulltime}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="mahasiswa_parttime"
                              className="form-control-label"
                            >
                              Mahasiswa Aktif Part Time
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mahasiswa Aktif PartTime"
                              id="mahasiswa_parttime"
                              defaultValue={dataMahasiswaAsing.Mahasiswa_Aktif_Parttime}
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
