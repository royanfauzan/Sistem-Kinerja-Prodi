import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Select from "react-select"
import toast from "react-hot-toast"
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama"
import Link from "next/link"

interface Prodi {
  nama_prodi: string
}

export default function input_mahasiswa_asing() {
  const router = useRouter()

  const [dataError, setError] = useState([])
  const [dataSelectTahun, setSelectTahun] = useState([])
  console.log(dataSelectTahun)

  // state pake test user
  const [stadmin, setStadmin] = useState(false)

  const [tampildana, setdataDana] = useState([])

  const handleChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (options) => options.value
    )

    setSelectTahun(value)

    // setSelectTahun(value)
  }
  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_penggunaan_dana",
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { tampil_penggunaan_dana } = response.data
        setdataDana(tampil_penggunaan_dana)
        console.log(tampildana)
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

  const submitForm = async (event) => {
    event.preventDefault()

    toast.loading("Loading...")
    const lgToken = localStorage.getItem("token")

    let formData = new FormData()
    formData.append("namamitra", event.target.namamitra.value)
    formData.append("alamat", event.target.alamat.value)
    formData.append("no_telepon", event.target.no_telepon.value)
    formData.append("nama_cp", event.target.nama_cp.value)
    formData.append("no_telp_cp", event.target.no_telp_cp.value)
    formData.append("email_cp", event.target.email_cp.value)
    formData.append("bidang", event.target.bidang.value)

    console.log(formData)

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/created",
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { profil } = response.data
        //handle success
        toast.dismiss()
        toast.success("Login Sugses!!")
        // console.log(token);
        console.log(response.data)
        // router.push("/");
      })
      .catch(function (error) {
        //handle error

        setError(error.response.error)
        console.log(dataError)
      })
  }

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
                        <h4>Penggunaan Dana</h4>
                        <Link
                          href={{
                            pathname:
                              "/penggunaan_dana/exportPenggunaanDana/export_dana",
                            query: {
                              tahun1: dataSelectTahun[0],
                              tahun2: dataSelectTahun[1],
                              tahun3: dataSelectTahun[2],
                            },
                          }}
                        >
                          <button
                            className="btn btn-primary btn-sm ms-auto"
                            type="submit"
                          >
                            EXPORT
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5>Export Penggunaan Dana</h5>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="mitra"
                              className="form-control-label"
                            >
                              Tahun
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={dataSelectTahun}
                              id="mitra"
                              onChange={handleChange}
                              multiple
                            >
                              <option>Pilih Tahun</option>
                              {tampildana.map((dataMitra) => {
                                return (
                                  <option
                                    value={dataMitra.Tahun}
                                    key={dataMitra.id}
                                  >
                                    {dataMitra.Tahun}
                                  </option>
                                )
                              })}
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
  )
}
