import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState, ChangeEvent } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

interface Prodi {
  nama_prodi: string
}

export default function input_mitra() {
  const router = useRouter()

  const [dataProdis, setdataProdi] = useState<Prodi[]>([])
  const [dataError, setError] = useState([])
  const MySwal = withReactContent(Swal)

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
        console.log(dataProdis)
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
    formData.append("NIDK", event.target.NIDK.value)
    formData.append("password", event.target.password.value)
    formData.append("role", event.target.role.value)
    formData.append("level_akses", event.target.level_akses.value)

    console.log(formData)

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/store_user",
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
          text: "Data User Berhasil Di Input",
        })
        console.log(response.data)

        router.push("/User/Tabel_User")
      })
      .catch(function (error) {
        //handle error
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data User Gagal Di Input",
        })
        setError(error.response.data.error)
        console.log(error.response.data.error)
      })
  }
  const viewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPwd = document.getElementById("password")
    if (event.target.checked) {
      inputPwd?.setAttribute("type", "text")
    } else {
      inputPwd?.setAttribute("type", "password")
    }
    console.log(event)
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
                        <p className="mb-0">Input Data User</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="text-uppercase text-sm"> User </p>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="NIDK"
                              className={dataError.NIDK ? "is-invalid" : ""}
                            >
                              NIDK
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder=" NIDK"
                              id="NIDK"
                            />
                            {dataError.NIDK ? (
                              <div className="invalid-feedback">
                                {dataError.NIDK}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              className={dataError.password ? "is-invalid" : ""}
                              htmlFor="password"
                            >
                              Password
                            </label>
                          </div>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                              aria-describedby="password"
                            />
                            {dataError.password ? (
                              <div className="invalid-feedback">
                                {dataError.password}
                              </div>
                            ) : (
                              ""
                            )}
                            <span className="input-group-text cursor-pointer">
                              <i className="bx bx-hide"></i>
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="remember-me"
                              onChange={viewPassword}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="remember-me"
                            >
                              {" "}
                              Lihat Password{" "}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="role"
                              className={dataError.role ? "is-invalid" : ""}
                            >
                              Role
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="role"
                            >
                              <option value="">Pilih Role</option>
                              <option value="Admin">Admin</option>
                              <option value="Dosen"> Dosen</option>
                            </select>
                            {dataError.role ? (
                              <div className="invalid-feedback">
                                {dataError.role}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="level_akses"
                              className={
                                dataError.level_akses ? "is-invalid" : ""
                              }
                            >
                              Level Akses
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="level_akses"
                            >
                              <option value="">Pilih Level Akses</option>
                              <option value="1">1</option>
                              <option value="2"> 2</option>
                            </select>
                            {dataError.level_akses ? (
                              <div className="invalid-feedback">
                                {dataError.level_akses}
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
