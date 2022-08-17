import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// Untuk Ngambil Data Berdasarkan ID
export async function getServerSideProps(context) {
  //http request
  const req = await axios.get(
    `http://127.0.0.1:8000/api/show_mahasiswa_asing/${context.query.id_mhsAsing}`
  )
  const res = await req.data.tampil_mahasiswa_asing

  return {
    props: {
      mahasiswaAsing: res, // <-- assign response
    },
  }
}

export default function editMahasiswaAsing(props) {
  const router = useRouter()
  const MySwal = withReactContent(Swal)
  const { mahasiswaAsing } = props
  const [dataMahasiswaAsing, setdataMahasiswaAsing] = useState(mahasiswaAsing)
  console.log(dataMahasiswaAsing)
  const [dataProdi, setdataProdi] = useState([])
  const [selectProdi, setSelectProdi] = useState(
    mahasiswaAsing.Program_Studi_Prodi_Id
  )
  const [dataError, setError] = useState([])
  const [dataRole, setRole] = useState("")

  // state pake test user
  const [stadmin, setStadmin] = useState(false)

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Prodi",
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { Prodi } = response.data
        setdataProdi(Prodi)
        console.log(dataProdi)
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
  }
  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
  useEffect(() => {
    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem("token")
    if (!lgToken) {
      router.push("/login")
    }

    // perjalanan validasi token
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_user",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { level_akses } = response.data.user
        const { role } = response.data.user
        setRole(role)
        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
          return router.push("/")
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true)
        pengambilData()
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
        return router.push("/")
      })
  }, [])

  const handleChangeProdi = (e) => {
    setSelectProdi(e.target.value)
  }

  const submitForm = async (event) => {
    event.preventDefault()

    toast.loading("Loading...")
    const lgToken = localStorage.getItem("token")

    let formData = new FormData()
    formData.append("Tahun_Akademik", event.target.tahun_akademik.value)
    formData.append("Program_Studi", event.target.mahasiswa_aktif.value)
    formData.append(
      "Mahasiswa_Aktif_Fulltime",
      event.target.mahasiswa_fulltime.value
    )
    formData.append("Mahasiswa_Aktif", event.target.mahasiswa_aktif.value)
    formData.append(
      "Mahasiswa_Aktif_Parttime",
      event.target.mahasiswa_parttime.value
    )
    formData.append("Program_Studi_Prodi_Id", event.target.prodi.value)

    console.log(formData)

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
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data Mahasiswa Asing Berhasil Di Edit",
        })
        router.push("/MahasiswaBaru_Asing/tabel_mahasiswa_asing")
      })
      .catch(function (error) {
        //handle error
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Mahasiswa Asing Gagal Di Edit",
        })
        setError(error.response.data.error)
        console.log(error.response.data.error)
      })
  }

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
                              className={
                                dataError.Program_Studi_Prodi_Id
                                  ? "is-invalid"
                                  : ""
                              }
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
                              <option value="">Pilih Prodi</option>
                              {dataProdi.map((dataProdi) => {
                                return (
                                  <option
                                    value={dataProdi.id}
                                    key={dataProdi.id}
                                  >
                                    {dataProdi.nama_prodi}
                                  </option>
                                )
                              })}
                            </select>
                            {dataError.Program_Studi_Prodi_Id ? (
                              <div className="invalid-feedback">
                                {dataError.Program_Studi_Prodi_Id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tahun_akademik"
                              className={
                                dataError.Tahun_Akademik ? "is-invalid" : ""
                              }
                            >
                              Tahun Akademik
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Tahun Akademik"
                              id="tahun_akademik"
                              defaultValue={dataMahasiswaAsing.Tahun_Akademik}
                            />
                            {dataError.Tahun_Akademik ? (
                              <div className="invalid-feedback">
                                {dataError.Tahun_Akademik}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="mahasiswa_aktif"
                              className={
                                dataError.Mahasiswa_Aktif ? "is-invalid" : ""
                              }
                            >
                              Mahasiswa Aktif
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mahasiswa Aktif"
                              id="mahasiswa_aktif"
                              defaultValue={dataMahasiswaAsing.Mahasiswa_Aktif}
                            />
                            {dataError.Mahasiswa_Aktif ? (
                              <div className="invalid-feedback">
                                {dataError.Mahasiswa_Aktif}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="mahasiswa_fulltime"
                              className={
                                dataError.Mahasiswa_Aktif_Fulltime
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Mahasiswa Aktif Fulltime
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mahasiswa Aktif Fulltime"
                              id="mahasiswa_fulltime"
                              defaultValue={
                                dataMahasiswaAsing.Mahasiswa_Aktif_Fulltime
                              }
                            />
                            {dataError.Mahasiswa_Aktif_Fulltime ? (
                              <div className="invalid-feedback">
                                {dataError.Mahasiswa_Aktif_Fulltime}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="mahasiswa_parttime"
                              className={
                                dataError.Mahasiswa_Aktif_Parttime
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Mahasiswa Aktif Part Time
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mahasiswa Aktif PartTime"
                              id="mahasiswa_parttime"
                              defaultValue={
                                dataMahasiswaAsing.Mahasiswa_Aktif_Parttime
                              }
                            />
                            {dataError.Mahasiswa_Aktif_Parttime ? (
                              <div className="invalid-feedback">
                                {dataError.Mahasiswa_Aktif_Parttime}
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
  )
}
