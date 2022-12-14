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
    `http://127.0.0.1:8000/api/show_penerimaan_mahasiswa/${context.query.id_penerimaan}`
  )
  const res = await req.data.tampil_penerimaan

  return {
    props: {
      penerimaan: res, // <-- assign response
    },
  }
}

export default function editpenerimaan(props) {
  const router = useRouter()
  const MySwal = withReactContent(Swal)
  const { penerimaan } = props
  const [dataRole, setRole] = useState("")
  const [dataPenerimaan, setdataPenerimaan] = useState(penerimaan)
  console.log(dataPenerimaan)
  const [dataProdi, setdataProdi] = useState([])
  const [selectProdi, setSelectProdi] = useState(
    penerimaan.Program_Studi_Prodi_Id
  )
  const [dataError, setError] = useState([])

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
    formData.append("Daya_Tampung", event.target.daya_tampung.value)
    formData.append("Pendaftaran", event.target.pendaftar.value)
    formData.append("Lulus_Seleksi", event.target.Lulus_Seleksi.value)
    formData.append("Maba_Reguler", event.target.Maba_Reguler.value)
    formData.append("Maba_Transfer", event.target.Maba_Transfer.value)
    formData.append(
      "Mahasiswa_Aktif_Reguler",
      event.target.Mahasiswa_Reguler.value
    )
    formData.append(
      "Mahasiswa_Aktif_Transfer",
      event.target.Mahasiswa_Transfer.value
    )
    formData.append("Program_Studi_Prodi_Id", event.target.prodi.value)

    console.log(formData)

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_penerimaan_mahasiswa/${dataPenerimaan.id}`,
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
          text: "Data Seleksi Mahasiswa Baru Berhasil Di Edit",
        })

        router.push("/MahasiswaBaru_Asing/tabel_penerimaan")
      })
      .catch(function (error) {
        //handle error
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Seleksi Mahasiswa Baru Gagal Di Edit",
        })
        setError(error.response.data.error)
        console.log(error.response)
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
                      <p className="text-uppercase text-sm"> <h5>EDIT DATA SELEKSI MAHASISWA </h5> </p>
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
                        {" "}
                        Seleksi Mahasiswa Baru
                      </p>
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
                              <option>Pilih Prodi</option>
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
                              placeholder="Tahun Akademik"
                              id="tahun_akademik"
                              defaultValue={dataPenerimaan.Tahun_Akademik}
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

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="daya_tampung"
                              className={
                                dataError.Daya_Tampung ? "is-invalid" : ""
                              }
                            >
                              Daya Tampung
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Daya Tampung"
                              id="daya_tampung"
                              defaultValue={dataPenerimaan.Daya_Tampung}
                            />
                            {dataError.Daya_Tampung ? (
                              <div className="invalid-feedback">
                                {dataError.Daya_Tampung}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="pendaftar"
                              className={
                                dataError.Pendaftaran ? "is-invalid" : ""
                              }
                            >
                              Pendaftar
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Pendaftar"
                              id="pendaftar"
                              defaultValue={dataPenerimaan.Pendaftaran}
                            />
                            {dataError.Pendaftaran ? (
                              <div className="invalid-feedback">
                                {dataError.Pendaftaran}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Lulus_Seleksi"
                              className={
                                dataError.Lulus_Seleksi ? "is-invalid" : ""
                              }
                            >
                              Lulus Seleksi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Lulus Seleksi"
                              id="Lulus_Seleksi"
                              defaultValue={dataPenerimaan.Lulus_Seleksi}
                            />{" "}
                            {dataError.Lulus_Seleksi ? (
                              <div className="invalid-feedback">
                                {dataError.Lulus_Seleksi}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Maba_Reguler"
                              className={
                                dataError.Maba_Reguler ? "is-invalid" : ""
                              }
                            >
                              Mahasiswa Baru Reguler
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mahasiswa Baru Reguler"
                              id="Maba_Reguler"
                              defaultValue={dataPenerimaan.Maba_Reguler}
                            />
                            {dataError.Maba_Reguler ? (
                              <div className="invalid-feedback">
                                {dataError.Maba_Reguler}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Maba_Transfer"
                              className={
                                dataError.Maba_Transfer ? "is-invalid" : ""
                              }
                            >
                              Mahasiswa Baru Transfer
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Mahasiswa Baru Transfer"
                              id="Maba_Transfer"
                              defaultValue={dataPenerimaan.Maba_Transfer}
                            />
                            {dataError.Maba_Transfer ? (
                              <div className="invalid-feedback">
                                {dataError.Maba_Transfer}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Mahasiswa_Reguler"
                              className={
                                dataError.Mahasiswa_Aktif_Reguler
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Jumlah Mahasiswa Aktif Reguler
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Jumlah Mahasiswa Aktif Reguler"
                              id="Mahasiswa_Reguler"
                              defaultValue={
                                dataPenerimaan.Mahasiswa_Aktif_Reguler
                              }
                            />
                            {dataError.Mahasiswa_Aktif_Reguler ? (
                              <div className="invalid-feedback">
                                {dataError.Mahasiswa_Aktif_Reguler}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="Mahasiswa_Reguler"
                              className={
                                dataError.Mahasiswa_Aktif_Transfer
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Jumlah Mahasiswa Aktif Transfer
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Jumlah Mahasiswa Aktif Transfer"
                              id="Mahasiswa_Transfer"
                              defaultValue={
                                dataPenerimaan.Mahasiswa_Aktif_Transfer
                              }
                            />
                            {dataError.Mahasiswa_Aktif_Transfer ? (
                              <div className="invalid-feedback">
                                {dataError.Mahasiswa_Aktif_Transfer}
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
