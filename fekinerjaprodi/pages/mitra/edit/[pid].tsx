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
    `http://127.0.0.1:8000/api/show_mitra/${context.query.pid}`
  )
  const res = await req.data.tampil_mitras

  return {
    props: {
      mitra: res, // <-- assign response
    },
  }
}
// interface Kategori {
//   id: number;
//   nama: string;
//   created_at: string;
//   updated_at: string;
// }

export default function update_datamitra(props) {
  const { mitra } = props
  console.log(mitra)
  const [dataRole, setRole] = useState("")
  const [dataError, setError] = useState([])
  const MySwal = withReactContent(Swal)
  const router = useRouter()
  const { pid } = router.query

  const [dataMitras, setdataMitra] = useState(mitra)

  // state pake test user
  const [stadmin, setStadmin] = useState(false)

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {}

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

  //HAPUS DATA

  // Insert Update Data
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
      url: `http://127.0.0.1:8000/api/update_mitra/${dataMitras.id}`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        //handle success
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data Mitra Berhasil Di Update",
        })
        console.log(response.data)

        router.push("/mitra/tabelmitra")
      })
      .catch(function (error) {
        //handle error
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Gagal Di Update",
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
                      <p className="text-uppercase text-sm"> <h5>FORM EDIT DATA MITRA </h5> </p>
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
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="namamitra"
                              className={
                                dataError.namamitra ? "is-invalid" : ""
                              }
                            >
                              Nama Mitra
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" Nama Mitra"
                              id="namamitra"
                              defaultValue={dataMitras.namamitra}
                            />
                            {dataError.namamitra ? (
                              <div className="invalid-feedback">
                                {dataError.namamitra}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="alamat"
                              className={dataError.alamat ? "is-invalid" : ""}
                            >
                              Alamat
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Alamat Mitra"
                              id="alamat"
                              defaultValue={dataMitras.alamat}
                            />
                            {dataError.alamat ? (
                              <div className="invalid-feedback">
                                {dataError.alamat}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="no_telepon"
                              className={
                                dataError.no_telepon ? "is-invalid" : ""
                              }
                            >
                              Nomor Telepon Mitra
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nomor Telepon Mitra"
                              id="no_telepon"
                              defaultValue={dataMitras.no_telepon}
                            />
                            {dataError.no_telepon ? (
                              <div className="invalid-feedback">
                                {dataError.no_telepon}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="nama_cp"
                              className={dataError.nama_cp ? "is-invalid" : ""}
                            >
                              Nama CP
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nama CP"
                              id="nama_cp"
                              defaultValue={dataMitras.nama_cp}
                            />
                            {dataError.nama_cp ? (
                              <div className="invalid-feedback">
                                {dataError.nama_cp}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="no_telp_cp"
                              className={
                                dataError.no_telp_cp ? "is-invalid" : ""
                              }
                            >
                              Nomor Telepon CP
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nomor Telepon CP"
                              id="no_telp_cp"
                              defaultValue={dataMitras.no_telp_cp}
                            />
                            {dataError.no_telp_cp ? (
                              <div className="invalid-feedback">
                                {dataError.no_telp_cp}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="email_cp"
                              className={dataError.email_cp ? "is-invalid" : ""}
                            >
                              Email CP
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Email CP"
                              id="email_cp"
                              defaultValue={dataMitras.email_cp}
                            />
                            {dataError.email_cp ? (
                              <div className="invalid-feedback">
                                {dataError.email_cp}
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
                              className={dataError.bidang ? "is-invalid" : ""}
                            >
                              Bidang
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="bidang"
                              defaultValue={dataMitras.bidang}
                            >
                              <option value="">Pilih Bidang Kerjasama</option>
                              <option value="Kerjasama Pendidikan">
                                {" "}
                                Kerjasama Pendidikan{" "}
                              </option>
                              <option value="Kerjasama Penelitian">
                                {" "}
                                Kerjasama Penelitian
                              </option>
                              <option value="Kerjasama pengabdian Masyarakat">
                                {" "}
                                Kerjasama pengabdian Masyarakat
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
