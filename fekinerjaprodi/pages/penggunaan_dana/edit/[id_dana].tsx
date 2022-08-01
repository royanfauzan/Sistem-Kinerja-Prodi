import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";

//Untuk Ngambil Data Berdasarkan ID
export async function getServerSideProps(context) {
    //http request
    const req = await axios.get(
      `http://127.0.0.1:8000/api/show_penggunaan_dana/${context.query.id_dana}`
    );
    const res = await req.data.tampil_dana;
  
    return {
      props: {
        penggunaanDana: res, // <-- assign response
      },
    };
  }
  
export default function edit_penggunaan_dana(props) {
  const router = useRouter();

  const { penggunaanDana } = props;
  const [dataPenggunaanDana, setdataDana] = useState(penggunaanDana);
  console.log(dataPenggunaanDana);
  const [dataProdi, setdataProdi] = useState([]);
  const [selectProdi, setSelectProdi] = useState(
    penggunaanDana.Prodi_Id
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
    formData.append("Biaya_Dosen_Prodi", event.target.Biaya_Dosen_Prodi.value);
    formData.append("Biaya_Dosen_UPPS", event.target.Biaya_Dosen_UPPS.value);
    formData.append(
      "Biaya_Investasi_Prasarana_Prodi",
      event.target.Biaya_Investasi_Prasarana_Prodi.value
    );
    formData.append(
      "Biaya_Investasi_Prasarana_UPPS",
      event.target.Biaya_Investasi_Prasarana_UPPS.value
    );
    formData.append(
      "Biaya_Investasi_Sarana_Prodi",
      event.target.Biaya_Investasi_Sarana_Prodi.value
    );
    formData.append(
      "Biaya_Investasi_Sarana_UPPS",
      event.target.Biaya_Investasi_Sarana_UPPS.value
    );
    formData.append(
      "Biaya_Investasi_SDM_Prodi",
      event.target.Biaya_Investasi_SDM_Prodi.value
    );
    formData.append(
      "Biaya_Investasi_SDM_UPPS",
      event.target.Biaya_Investasi_SDM_UPPS.value
    );
    formData.append(
      "Biaya_Operasional_Kemahasiswaan_Prodi",
      event.target.Biaya_Operasional_Kemahasiswaan_Prodi.value
    );
    formData.append(
      "Biaya_Operasional_Kemahasiswaan_UPPS",
      event.target.Biaya_Operasional_Kemahasiswaan_UPPS.value
    );
    formData.append(
      "Biaya_Operasional_Pembelajaran_Prodi",
      event.target.Biaya_Operasional_Pembelajaran_Prodi.value
    );
    formData.append(
      "Biaya_Operasional_Pembelajaran_UPPS",
      event.target.Biaya_Operasional_Pembelajaran_UPPS.value
    );
    formData.append(
      "Biaya_Operasional_TidakLangsung_Prodi",
      event.target.Biaya_Operasional_TidakLangsung_Prodi.value
    );
    formData.append(
      "Biaya_Operasional_TidakLangsung_UPPS",
      event.target.Biaya_Operasional_TidakLangsung_UPPS.value
    );
    formData.append(
      "Biaya_Tenaga_Kependidikan_Prodi",
      event.target.Biaya_Tenaga_Kependidikan_Prodi.value
    );
    formData.append(
      "Biaya_Tenaga_Kependidikan_UPPS",
      event.target.Biaya_Tenaga_Kependidikan_UPPS.value
    );
    formData.append("Prodi_Id", event.target.prodi.value);
    formData.append("Tahun", event.target.Tahun.value);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_penggunaan_dana/${dataPenggunaanDana.id}`,
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
        console.log(response.data);
        // router.push("/");
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
                        <p className="mb-0">Input Data Penggunaan Dana</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="text-uppercase text-sm"> Penggunaan Dana</p>
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
                              Biaya Dosen UPPS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Biaya Dosen UPPS"
                              id="Biaya_Dosen_UPPS"
                              defaultValue={dataPenggunaanDana.Biaya_Dosen_UPPS}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Dosen_Prodi"
                              className="form-control-label"
                            >
                              Biaya Dosen Prodi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Biaya Dosen Prodi"
                              id="Biaya_Dosen_Prodi"
                              defaultValue={dataPenggunaanDana.Biaya_Dosen_Prodi}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Investasi_Prasarana_Prodi"
                              className="form-control-label"
                            >
                              Biaya Investasi Prasarana Prodi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mahasiswa Aktif Fulltime"
                              id="Biaya_Investasi_Prasarana_Prodi"
                              defaultValue={dataPenggunaanDana.Biaya_Investasi_Prasarana_Prodi}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Investasi_Prasarana_UPPS"
                              className="form-control-label"
                            >
                              Biaya Investasi Prasarana UPPS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Biaya Investasi Prasarana UPPS"
                              id="Biaya_Investasi_Prasarana_UPPS"
                              defaultValue={dataPenggunaanDana.Biaya_Investasi_Prasarana_UPPS}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Investasi_Sarana_Prodi"
                              className="form-control-label"
                            >
                              Biaya Investasi Sarana Prodi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Biaya Investasi Sarana Prodi"
                              id="Biaya_Investasi_Sarana_Prodi"
                              defaultValue={dataPenggunaanDana.Biaya_Investasi_Sarana_Prodi}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Investasi_Sarana_UPPS"
                              className="form-control-label"
                            >
                              Biaya Investasi Sarana UPPS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Biaya Investasi Sarana UPPS"
                              id="Biaya_Investasi_Sarana_UPPS"
                              defaultValue={dataPenggunaanDana.Biaya_Investasi_Sarana_UPPS}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Investasi_SDM_Prodi"
                              className="form-control-label"
                            >
                              Biaya Investasi SDM Prodi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Biaya Investasi Sarana UPPS"
                              id="Biaya_Investasi_SDM_Prodi"
                              defaultValue={dataPenggunaanDana.Biaya_Investasi_SDM_Prodi}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Investasi_SDM_UPPS"
                              className="form-control-label"
                            >
                              Biaya Investasi SDM UPPS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="M Biaya Investasi SDM UPPS"
                              id="Biaya_Investasi_SDM_UPPS"
                              defaultValue={dataPenggunaanDana.Biaya_Investasi_SDM_UPPS}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Operasional_Kemahasiswaan_Prodi"
                              className="form-control-label"
                            >
                              Biaya Operasional Kemahasiswaan Prodi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Biaya Operasional Kemahasiswaan Prodi"
                              id="Biaya_Operasional_Kemahasiswaan_Prodi"
                              defaultValue={dataPenggunaanDana.Biaya_Operasional_Kemahasiswaan_Prodi}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Operasional_Kemahasiswaan_UPPS"
                              className="form-control-label"
                            >
                              Biaya Operasional Kemahasiswaan UPPS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Biaya Operasional Kemahasiswaan Prodi"
                              id="Biaya_Operasional_Kemahasiswaan_UPPS"
                              defaultValue={dataPenggunaanDana.Biaya_Operasional_Kemahasiswaan_UPPS}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Operasional_Pembelajaran_Prodi"
                              className="form-control-label"
                            >
                              Biaya Operasional Pembelajaran Prodi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="  Biaya Operasional Pembelajaran Prodi"
                              id="Biaya_Operasional_Pembelajaran_Prodi"
                              defaultValue={dataPenggunaanDana.Biaya_Operasional_Pembelajaran_Prodi}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Operasional_Pembelajaran_UPPS"
                              className="form-control-label"
                            >
                              Biaya Operasional Pembelajaran UPPS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Biaya Operasional Pembelajaran UPPS"
                              id="Biaya_Operasional_Pembelajaran_UPPS"
                              defaultValue={dataPenggunaanDana.Biaya_Operasional_Pembelajaran_UPPS}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Operasional_TidakLangsung_Prodi"
                              className="form-control-label"
                            >
                              Biaya Operasional Tidak Langsung Prodi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Biaya Operasional Kemahasiswaan Prodi"
                              id="Biaya_Operasional_TidakLangsung_Prodi"
                              defaultValue={dataPenggunaanDana.Biaya_Operasional_TidakLangsung_Prodi}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Operasional_TidakLangsung_UPPS"
                              className="form-control-label"
                            >
                              Biaya Operasional Tidak Langsung UPPS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Biaya Operasional Tidak Langsung UPPS"
                              id="Biaya_Operasional_TidakLangsung_UPPS"
                              defaultValue={dataPenggunaanDana.Biaya_Operasional_TidakLangsung_UPPS}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Tenaga_Kependidikan_Prodi"
                              className="form-control-label"
                            >
                              Biaya Tenaga Kependidikan Prodi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Biaya Tenaga Kependidikan Prodi"
                              id="Biaya_Tenaga_Kependidikan_Prodi"
                              defaultValue={dataPenggunaanDana.Biaya_Tenaga_Kependidikan_Prodi}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Biaya_Tenaga_Kependidikan_UPPS"
                              className="form-control-label"
                            >
                              Biaya Tenaga Kependidikan UPPS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Biaya Tenaga Kependidikan UPPS"
                              id="Biaya_Tenaga_Kependidikan_UPPS"
                              defaultValue={dataPenggunaanDana.Biaya_Tenaga_Kependidikan_UPPS}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Tahun"
                              className="form-control-label"
                            >
                              Tahun
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Tahun "
                              id="Tahun"
                              defaultValue={dataPenggunaanDana.Tahun}
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
