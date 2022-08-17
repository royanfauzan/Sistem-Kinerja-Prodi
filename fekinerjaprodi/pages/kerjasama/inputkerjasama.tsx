import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

interface Mitra {
  namamitra: string
}

export default function inputkerjasama() {
  const router = useRouter()

  const [dataMitras, setMitras] = useState<Mitra[]>([])
  const [filebukti, setFilebukti] = useState<File>()
  const [dataError, setError] = useState([])
  const MySwal = withReactContent(Swal)
  const [dataRole, setRole] = useState("")

  // state pake test user
  const [stadmin, setStadmin] = useState(false)

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_mitra",
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { tampil_mitras } = response.data
        setMitras(tampil_mitras)
        console.log(dataMitras)
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

  const handleChangeFile = (e) => {
    setFilebukti(e.target.files[0])
  }

  const submitForm = async (event) => {
    event.preventDefault()

    toast.loading("Loading...")
    const lgToken = localStorage.getItem("token")

    let formData = new FormData()
    formData.append("idmitra", event.target.mitra.value)
    formData.append("tingkat", event.target.tingkat.value)
    formData.append("judul_kegiatan", event.target.kegiatan.value)
    formData.append("manfaat", event.target.manfaat.value)
    formData.append("tanggal_kegiatan", event.target.tanggalkegiatan.value)
    formData.append("lama_kegiatan", event.target.lamakegiatan.value)
    formData.append("bukti_kerjasama", event.target.buktikerjasama.value)
    formData.append("tahun_berakhir", event.target.tahunberakhir.value)
    formData.append("bidang", event.target.bidang.value)
    formData.append("file_bukti", filebukti)

    console.log(filebukti)

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/create_kjs",
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
          text: "Data Berhasil Di Input",
        })

        router.push("/kerjasama/tabelkerjasama")
      })
      .catch(function (error) {
        //handle error
        setError(error.response.data.error)
        console.log(error.response.data.error)
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Gagal Di Input",
        })
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
                      <p className="text-uppercase text-sm">Kerjasama</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="mitra"
                              className={dataError.idmitra ? "is-invalid" : ""}
                            >
                              MITRA
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="mitra"
                            >
                              <option value="">Pilih Mitra</option>
                              {dataMitras.map((dataMitra) => {
                                return (
                                  <option
                                    value={dataMitra.id}
                                    key={dataMitra.id}
                                  >
                                    {dataMitra.namamitra}
                                  </option>
                                )
                              })}
                            </select>
                            {dataError.idmitra ? (
                              <div className="invalid-feedback">
                                {dataError.idmitra}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="mitra"
                              className={dataError.bidang ? "is-invalid" : ""}
                            >
                              Bidang
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="bidang"
                            >
                              <option value="">Pilih Bidang</option>
                              <option value="Kerjasama Pendidikan">
                                Kerjasama Pendidikan
                              </option>
                              <option value="Kerjasama Penelitian">
                                Kerjasama Penelitian
                              </option>
                              <option value="Kerjasama Pengabdian Kepada Masyarakat">
                                Kerjasama Pengabdian Kepada Masyarakat
                              </option>
                            </select>
                            {dataError.bidang ? (
                              <div className="invalid-feedback">
                                {dataError.bidang}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tingkat"
                              className={dataError.tingkat ? "is-invalid" : ""}
                            >
                              Tingkat
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="tingkat"
                            >
                              <option value="">Pilih Tingkatan</option>
                              <option value="Internasional">
                                Internasional
                              </option>
                              <option value="Nasional">Nasional</option>
                              <option value="Lokal">Lokal</option>
                            </select>
                            {dataError.tingkat ? (
                              <div className="invalid-feedback">
                                {dataError.tingkat}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kegiatan"
                              className={
                                dataError.judul_kegiatan ? "is-invalid" : ""
                              }
                            >
                              Judul Kegiatan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Judul Kegiatan"
                              id="kegiatan"
                            />
                            {dataError.judul_kegiatan ? (
                              <div className="invalid-feedback">
                                {dataError.judul_kegiatan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="manfaat"
                              className={dataError.manfaat ? "is-invalid" : ""}
                            >
                              Manfaat
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Manfaat"
                              id="manfaat"
                            />
                            {dataError.manfaat ? (
                              <div className="invalid-feedback">
                                {dataError.manfaat}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tanggalkegiatan"
                              className={
                                dataError.tanggal_kegiatan ? "is-invalid" : ""
                              }
                            >
                              Tanggal Kegiatan
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              placeholder="Pilih Tanggal"
                              id="tanggalkegiatan"
                            />
                            {dataError.tanggal_kegiatan ? (
                              <div className="invalid-feedback">
                                {dataError.tanggal_kegiatan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="lamakegiatan"
                              className={
                                dataError.lama_kegiatan ? "is-invalid" : ""
                              }
                            >
                              Lama Kegiatan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Lama Kegiatan"
                              id="lamakegiatan"
                            />
                            {dataError.lama_kegiatan ? (
                              <div className="invalid-feedback">
                                {dataError.lama_kegiatan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="buktikerjasama"
                              className={
                                dataError.bukti_kerjasama ? "is-invalid" : ""
                              }
                            >
                              Bukti Kerjasama
                            </label>
                            <input
                              className="form-control"
                              placeholder="Bukti Kerjasama"
                              type="text"
                              id="buktikerjasama"
                            />
                            {dataError.bukti_kerjasama ? (
                              <div className="invalid-feedback">
                                {dataError.bukti_kerjasama}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tahunberakhir"
                              className={
                                dataError.tahun_berakhir ? "is-invalid" : ""
                              }
                            >
                              Tahun Berakhir
                            </label>
                            <input
                              className="form-control"
                              placeholder="Tahun Berakhir"
                              type="text"
                              id="tahunberakhir"
                            />
                            {dataError.tahun_berakhir ? (
                              <div className="invalid-feedback">
                                {dataError.tahun_berakhir}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="buktifile"
                              className={
                                dataError.file_bukti ? "is-invalid" : ""
                              }
                            >
                              Bukti File
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              onChange={handleChangeFile}
                              id="buktifile"
                            />
                            {dataError.file_bukti ? (
                              <div className="invalid-feedback">
                                {dataError.file_bukti}
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
