import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"


// Untuk Ngambil Data Berdasarkan ID
export async function getServerSideProps(context) {

  //http request
  const req = await axios.get(`http://127.0.0.1:8000/api/tampil_KepuasanMHS/${context.query.id_kepuasanmhs}`)
  const res = await req.data.all_mhs

  const reqprodi = await axios.get(`http://127.0.0.1:8000/api/Prodi/`)
  const prodi = await reqprodi.data.Prodi

  return {
    props: {
      kepuasanmhs: res,
      prodi: prodi// <-- assign response
    },
  }
}
// interface Kategori {
//   id: number;
//   nama: string;
//   created_at: string;
//   updated_at: string;
// }


export default function update_datakepuasanmhs(props) {
  const { kepuasanmhs } = props;
  console.log(kepuasanmhs);

  const { prodi } = props;
  console.log(prodi);

  const router = useRouter();


  const [datakepuasanmhs, setdatakepuasanmhs] = useState(kepuasanmhs);
  const [dataprodi, setdataprodi] = useState(prodi);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);
  const [selectProdi, setselectProdi] = useState(kepuasanmhs.prodi_id);

  const [dataRole, setRole] = useState("");



  // pake ngambil data untuk halaman input
  const pengambilData = async () => {

  }



  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
  useEffect(() => {


    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem('token');
    if (!lgToken) {
      router.push('/login')


    }

    // perjalanan validasi token 
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_user",
      headers: { "Authorization": `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log('Sukses');
        const { level_akses } = response.data.user;
        const { role } = response.data.user;
        setRole(role);
        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
          return router.push('/');
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true);
        pengambilData();
      })
      .catch(function (err) {
        console.log('gagal');
        console.log(err.response);
        return router.push('/');
      })
  }, []);

  //HAPUS DATA


  // Insert Update Data
  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("prodi_id", event.target.prodi.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("keandalan_4", event.target.keandalan_4.value);
    formData.append("keandalan_3", event.target.keandalan_3.value);
    formData.append("keandalan_2", event.target.keandalan_2.value);
    formData.append("keandalan_1", event.target.keandalan_1.value);
    formData.append("tl_keandalan", event.target.tl_keandalan.value);
    formData.append("dayatanggap_4", event.target.dayatanggap_4.value);
    formData.append("dayatanggap_3", event.target.dayatanggap_3.value);
    formData.append("dayatanggap_2", event.target.dayatanggap_2.value);
    formData.append("dayatanggap_1", event.target.dayatanggap_1.value);
    formData.append("tl_dayatanggap", event.target.tl_dayatanggap.value);
    formData.append("kepastian_4", event.target.kepastian_4.value);
    formData.append("kepastian_3", event.target.kepastian_3.value);
    formData.append("kepastian_2", event.target.kepastian_2.value);
    formData.append("kepastian_1", event.target.kepastian_1.value);
    formData.append("tl_kepastian", event.target.tl_kepastian.value);
    formData.append("empati_4", event.target.empati_4.value);
    formData.append("empati_3", event.target.empati_3.value);
    formData.append("empati_2", event.target.empati_2.value);
    formData.append("empati_1", event.target.empati_1.value);
    formData.append("tl_empati", event.target.tl_empati.value);
    formData.append("tangible_4", event.target.tangible_4.value);
    formData.append("tangible_3", event.target.tangible_3.value);
    formData.append("tangible_2", event.target.tangible_2.value);
    formData.append("tangible_1", event.target.tangible_1.value);
    formData.append("tl_tangible", event.target.tl_tangible.value);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/KepuasanMHS_Update/${datakepuasanmhs.id}` + `?_method=PUT`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      MySwal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data Berhasil Di Edit",
      })

      router.push("/kepuasanmhs/daftarkepuasanmhs")
    })
    .catch(function (error) {
      //handle error
      setError(error.response.data.error)
      console.log(error.response.data.error)
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Data Gagal Di Edit",
      })
      console.log(error.response)
    })
  };

  const handleChangeProdi = (e) => {
    setselectProdi(e.target.value);
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
                        <h6 className="mb-0">Edit Data Kepuasan Mahasiswa</h6>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Simpan
                        </button>

                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">

                        
                      <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="prodi"
                              className={dataError.prodi_id ? "is-invalid" : ""}
                            >
                              Prodi
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="prodi"

                              value={selectProdi}
                              onChange={handleChangeProdi}
                            >
                              <option value="">Pilih Prodi</option>
                              {dataprodi.map((userprodi) => {
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
                              })}
                            </select>
                            {dataError.prodi_id ? (
                              <div className="invalid-feedback">
                                {dataError.prodi_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tahun" 
                            className={dataError.tahun ? "is-invalid" : ""}>
                              Tahun
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tahun}
                              className="form-control"
                              type="text"
                              placeholder="Tahun"
                              id="tahun"
                            />
                            {dataError.tahun ? (
                              <div className="invalid-feedback">
                                {dataError.tahun}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="keandalan_4" 
                            className={dataError.keandalan_4 ? "is-invalid" : ""}>
                              Keandalan : Buruk
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.keandalan_4}
                              className="form-control"
                              type="text"
                              placeholder="4"
                              id="keandalan_4"
                            />
                            {dataError.keandalan_4 ? (
                              <div className="invalid-feedback">
                                {dataError.keandalan_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="keandalan_3" 
                            className={dataError.keandalan_3 ? "is-invalid" : ""}>
                              Keandalan : Cukup
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.keandalan_3}
                              className="form-control"
                              type="text"
                              placeholder="3"
                              id="keandalan_3"
                            />
                            {dataError.keandalan_3 ? (
                              <div className="invalid-feedback">
                                {dataError.keandalan_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="keandalan_2" 
                            className={dataError.keandalan_2 ? "is-invalid" : ""}>
                              Keandalan : Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.keandalan_2}
                              className="form-control"
                              type="text"
                              placeholder="2"
                              id="keandalan_2"
                            />
                            {dataError.keandalan_2 ? (
                              <div className="invalid-feedback">
                                {dataError.keandalan_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="keandalan_1" 
                            className={dataError.keandalan_1 ? "is-invalid" : ""}>
                              Keandalan : Sangat Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.keandalan_1}
                              className="form-control"
                              type="text"
                              placeholder="1"
                              id="keandalan_1"
                            />
                            {dataError.keandalan_1 ? (
                              <div className="invalid-feedback">
                                {dataError.keandalan_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tl_keandalan" 
                             className={dataError.tl_keandalan ? "is-invalid" : ""}>
                              TL Keandalan
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tl_keandalan}
                              className="form-control"
                              type="text"
                              placeholder="Tindakan yang Dilakukan"
                              id="tl_keandalan"
                            />
                            {dataError.tl_keandalan ? (
                              <div className="invalid-feedback">
                                {dataError.tl_keandalan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dayatanggap_4" 
                            className={dataError.dayatanggap_4 ? "is-invalid" : ""}>
                              Daya Tanggap : Buruk
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.dayatanggap_4}
                              className="form-control"
                              type="text"
                              placeholder="4"
                              id="dayatanggap_4"
                            />
                            {dataError.dayatanggap_4 ? (
                              <div className="invalid-feedback">
                                {dataError.dayatanggap_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dayatanggap_3" 
                            className={dataError.dayatanggap_3 ? "is-invalid" : ""}>
                              Daya Tanggap : Cukup
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.dayatanggap_3}
                              className="form-control"
                              type="text"
                              placeholder="3"
                              id="dayatanggap_3"
                            />
                            {dataError.dayatanggap_3 ? (
                              <div className="invalid-feedback">
                                {dataError.dayatanggap_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dayatanggap_2" 
                             className={dataError.dayatanggap_2 ? "is-invalid" : ""}>
                              Daya Tanggap : Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.dayatanggap_2}
                              className="form-control"
                              type="text"
                              placeholder="2"
                              id="dayatanggap_2"
                            />
                            {dataError.dayatanggap_2 ? (
                              <div className="invalid-feedback">
                                {dataError.dayatanggap_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dayatanggap_1" 
                            className={dataError.dayatanggap_1 ? "is-invalid" : ""}>
                              Daya Tanggap : Sangat Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.dayatanggap_1}
                              className="form-control"
                              type="text"
                              placeholder="1"
                              id="dayatanggap_1"
                            />
                            {dataError.dayatanggap_1 ? (
                              <div className="invalid-feedback">
                                {dataError.dayatanggap_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tl_dayatanggap" 
                            className={dataError.tl_dayatanggap ? "is-invalid" : ""}>
                              TL Daya Tanggap
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tl_dayatanggap}
                              className="form-control"
                              type="text"
                              placeholder="Tindakan yang Dilakukan"
                              id="tl_dayatanggap"
                            />
                             {dataError.tl_dayatanggap ? (
                              <div className="invalid-feedback">
                                {dataError.tl_dayatanggap}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="kepastian_4" 
                            className={dataError.kepastian_4 ? "is-invalid" : ""}>
                              Kepastian : Buruk
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.kepastian_4}
                              className="form-control"
                              type="text"
                              placeholder="4"
                              id="kepastian_4"
                            />
                            {dataError.kepastian_4 ? (
                              <div className="invalid-feedback">
                                {dataError.kepastian_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="kepastian_3" 
                            className={dataError.kepastian_3 ? "is-invalid" : ""}>
                              Kepastian : Cukup
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.kepastian_3}
                              className="form-control"
                              type="text"
                              placeholder="3"
                              id="kepastian_3"
                            />
                            {dataError.kepastian_3 ? (
                              <div className="invalid-feedback">
                                {dataError.kepastian_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="kepastian_2" 
                            className={dataError.kepastian_2 ? "is-invalid" : ""}>
                              Kepastian : Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.kepastian_2}
                              className="form-control"
                              type="text"
                              placeholder="2"
                              id="kepastian_2"
                            />
                            {dataError.kepastian_2 ? (
                              <div className="invalid-feedback">
                                {dataError.kepastian_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="kepastian_1" 
                            className={dataError.kepastian_1 ? "is-invalid" : ""}>
                              Kepastian : Sangat Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.kepastian_1}
                              className="form-control"
                              type="text"
                              placeholder="1"
                              id="kepastian_1"
                            />
                            {dataError.kepastian_1 ? (
                              <div className="invalid-feedback">
                                {dataError.kepastian_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tl_kepastian" 
                            className={dataError.tl_kepastian ? "is-invalid" : ""}>
                              TL Kepastian
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tl_kepastian}
                              className="form-control"
                              type="text"
                              placeholder="Tindakan yang Dilakukan"
                              id="tl_kepastian"
                            />
                            {dataError.tl_kepastian ? (
                              <div className="invalid-feedback">
                                {dataError.tl_kepastian}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="empati_4" 
                            className={dataError.empati_4 ? "is-invalid" : ""}>
                              Empati : Buruk
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.empati_4}
                              className="form-control"
                              type="text"
                              placeholder="4"
                              id="empati_4"
                            />
                            {dataError.empati_4 ? (
                              <div className="invalid-feedback">
                                {dataError.empati_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="empati_3" 
                            className={dataError.empati_3 ? "is-invalid" : ""}>
                              Empati : Cukup
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.empati_3}
                              className="form-control"
                              type="text"
                              placeholder="3"
                              id="empati_3"
                            />
                            {dataError.empati_3 ? (
                              <div className="invalid-feedback">
                                {dataError.empati_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="empati_2" 
                            className={dataError.empati_2 ? "is-invalid" : ""}>
                              Empati : Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.empati_2}
                              className="form-control"
                              type="text"
                              placeholder="2"
                              id="empati_2"
                            />
                             {dataError.empati_2 ? (
                              <div className="invalid-feedback">
                                {dataError.empati_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="empati_1" 
                            className={dataError.empati_1 ? "is-invalid" : ""}>
                              Empati : Sangat Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.empati_1}
                              className="form-control"
                              type="text"
                              placeholder="1"
                              id="empati_1"
                            />
                            {dataError.empati_1 ? (
                              <div className="invalid-feedback">
                                {dataError.empati_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tl_empati" 
                            className={dataError.tl_empati ? "is-invalid" : ""}>
                              Tl Empati
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tl_empati}
                              className="form-control"
                              type="text"
                              placeholder="Tindakan yang Dilakukan"
                              id="tl_empati"
                            />
                            {dataError.tl_empati ? (
                              <div className="invalid-feedback">
                                {dataError.tl_empati}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tangible_4" 
                            className={dataError.tangible_4 ? "is-invalid" : ""}>
                              Tangible : Buruk
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tangible_4}
                              className="form-control"
                              type="text"
                              placeholder="4"
                              id="tangible_4"
                            />
                            {dataError.tangible_4 ? (
                              <div className="invalid-feedback">
                                {dataError.tangible_4}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tangible_3"
                            className={dataError.tangible_3 ? "is-invalid" : ""}>
                              Tangible : Cukup
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tangible_3}
                              className="form-control"
                              type="text"
                              placeholder="3"
                              id="tangible_3"
                            />
                            {dataError.tangible_3 ? (
                              <div className="invalid-feedback">
                                {dataError.tangible_3}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tangible_2" 
                            className={dataError.tangible_2 ? "is-invalid" : ""}>
                              Tangible : Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tangible_2}
                              className="form-control"
                              type="text"
                              placeholder="2"
                              id="tangible_2"
                            />
                            {dataError.tangible_2 ? (
                              <div className="invalid-feedback">
                                {dataError.tangible_2}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tangible_1" 
                            className={dataError.tangible_1 ? "is-invalid" : ""}>
                              Tangible : Sangat Baik
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tangible_1}
                              className="form-control"
                              type="text"
                              placeholder="1"
                              id="tangible_1"
                            />
                             {dataError.tangible_1 ? (
                              <div className="invalid-feedback">
                                {dataError.tangible_1}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tl_tangible" 
                             className={dataError.tl_tangible ? "is-invalid" : ""}>
                              TL Tangible
                            </label>
                            <input
                              defaultValue={datakepuasanmhs.tl_tangible}
                              className="form-control"
                              type="text"
                              placeholder="Tindakan yang Dilakukan"
                              id="tl_tangible"
                            />
                            {dataError.tl_tangible ? (
                              <div className="invalid-feedback">
                                {dataError.tl_tangible}
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
