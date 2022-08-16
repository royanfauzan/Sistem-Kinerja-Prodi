import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama"
import Link from "next/link"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function tabelmitra() {
  const router = useRouter()
  const [dataRole, setRole] = useState("")
  const [stadmin, setStadmin] = useState(false)
  const [tampilUser, settampilUser] = useState([])
  const MySwal = withReactContent(Swal)

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_user",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { tampil_user } = response.data
        settampilUser(tampil_user)

        console.log(tampil_user)
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
  }

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

  const deleteUser = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // <--
      if (result.isConfirmed) {
        // <-- if confirmed
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/delete_user/${id}`,
        })
          .then(function (response) {
            router.reload()
            console.log(response.data)
          })
          .catch(function (err) {
            console.log("gagal")
            console.log(err.response)
          })
      }
    })
  }

  const resetUser = (id) => {
    MySwal.fire({
      title: "Edit Data Mitra",
      text: "Yakin Edit Data? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/reset_user/${id}`,
        })
          .then(function (response) {
            router.reload()
            console.log(response.data)
          })
          .catch(function (err) {
            console.log("gagal")
            console.log(err.response)
          })
      }
    })
  }

  const tambahUser = () => {
    MySwal.fire({
      title: "Tambah Data Mitra",
      text: "Yakin Tambah Data Mitra? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/User/Insert_User`)
      }
    })
  }
  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/read_user/`)
      const res = await req.data.tampil_user
      settampilUser(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/search_user/${e.target.value}`
      )
      const res = await req.data.search
      settampilUser(res)
    }
  }

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-8">
                      <button
                        onClick={() => tambahUser()}
                        className="btn btn-sm btn-success border-0 shadow-sm  m-0"
                      >
                        Tambah
                      </button>
                    </div>

                    <div className="col-4 d-flex flex-row-reverse">
                      <input
                        className="rounded-3"
                        type="text"
                        placeholder="search.."
                        defaultValue=""
                        id="search"
                        onChange={searchdata}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0 text-center">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5>NIDK</h5>
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h5> Role</h5>
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h5> Level Akses</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Aksi</h5>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tampilUser.map((User) => {
                          return (
                            <tr key={`User` + User.id}>
                              <td>
                                <h6 className="mb-0 text-sm">{User.NIDK}</h6>
                              </td>
                              <td>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{User.role}</h6>
                                </div>
                              </td>
                              <td className="align-middle ">
                                <h6 className="mb-0 text-sm">
                                  {User.level_akses}
                                </h6>
                              </td>

                              <td className="align-middle text-center">
                                <button
                                  onClick={() => resetUser(User.id)}
                                  className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3"
                                >
                                  RESET PASSWORD
                                </button>

                                <button
                                  onClick={() => deleteUser(User.id)}
                                  className="btn btn-sm btn-danger border-0 shadow-sm mb-3 me-3"
                                >
                                  HAPUS
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <FooterUtama />
          </div>
        </LayoutForm>
      )}
    </>
  )
}
