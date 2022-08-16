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

export default function changepassword() {
  const router = useRouter()

  const [dataProdis, setdataProdi] = useState<Prodi[]>([])
  const [dataError, setError] = useState([])
  const [userid, setUserid] = useState("")
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
        const { id } = response.data.user
        console.log(id)
        setUserid(id)
        console.log(userid)
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

    formData.append("currentpassword", event.target.currentpassword.value)
    formData.append("newpassword", event.target.newpassword.value)
    formData.append(
      "newpassword_confirmation",
      event.target.newpassword_confirmation.value
    )
    formData.append("user_id", userid)

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/change_password",
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

        router.push("/dashboards/dashboardadmin")
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
    const inputPwd = document.getElementById("currentpassword")
    if (event.target.checked) {
      inputPwd?.setAttribute("type", "text")
    } else {
      inputPwd?.setAttribute("type", "password")
    }
    console.log(event)
  }

  const viewNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const inputnewPwd = document.getElementById("newpassword")
    if (event.target.checked) {
      inputnewPwd?.setAttribute("type", "text")
    } else {
      inputnewPwd?.setAttribute("type", "password")
    }
    console.log(event)
  }
  const viewConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const inputnewPwd = document.getElementById("confirmpassword")
    if (event.target.checked) {
      inputnewPwd?.setAttribute("type", "text")
    } else {
      inputnewPwd?.setAttribute("type", "password")
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
                        <p className="mb-0">Change Password</p>
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
                        <div className="mb-3 form-password-toggle">
                          <div className="d-flex justify-content-between">
                            <label className="form-label" htmlFor="password">
                              Current Password
                            </label>
                          </div>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              id="currentpassword"
                              className="form-control"
                              name="password"
                              placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                              aria-describedby="password"
                            />
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
                              className={
                                dataError.currentpassword ? "is-invalid" : ""
                              }
                              htmlFor="remember-me"
                            >
                              Lihat Password
                            </label>
                            {dataError.currentpassword ? (
                              <div className="invalid-feedback">
                                {dataError.currentpassword}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="mb-3 form-password-toggle">
                          <div className="d-flex justify-content-between">
                            <label className="form-label" htmlFor="password">
                              New Password
                            </label>
                          </div>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              id="newpassword"
                              className="form-control"
                              name="password"
                              placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                              aria-describedby="password"
                            />
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
                              onChange={viewNewPassword}
                            />
                            <label
                              className={
                                dataError.newpassword ? "is-invalid" : ""
                              }
                              htmlFor="remember-me"
                            >
                              Lihat Password
                            </label>
                            {dataError.newpassword ? (
                              <div className="invalid-feedback">
                                {dataError.newpassword}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="mb-3 form-password-toggle">
                          <div className="d-flex justify-content-between">
                            <label className="form-label" htmlFor="password">
                              Confirm Password
                            </label>
                          </div>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              id="newpassword_confirmation"
                              className="form-control"
                              name="password"
                              placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                              aria-describedby="password"
                            />
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
                              onChange={viewConfirmPassword}
                            />
                            <label
                              className={
                                dataError.newpassword_confirmation
                                  ? "is-invalid"
                                  : ""
                              }
                              htmlFor="remember-me"
                            >
                              Lihat Password
                            </label>
                            {dataError.newpassword_confirmation ? (
                              <div className="invalid-feedback">
                                {dataError.newpassword_confirmation}
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
