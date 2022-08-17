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
export default function daftarprofil() {
  const router = useRouter()
  const MySwal = withReactContent(Swal)
  const [stadmin, setStadmin] = useState(false)
  const [tampilMahasiswaAsing, settampilMahasiswaAsing] = useState([])
  const [dataRole, setRole] = useState("")

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_mahasiswa_asing",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { mahasiswa_asing } = response.data
        settampilMahasiswaAsing(mahasiswa_asing)

        console.log(mahasiswa_asing)
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

  const deleteMhsAsing = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/delete_mahasiswa_asing/${id}`,
    })
      .then(function (response) {
        router.reload()
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
  }
  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/read_mahasiswa_asing/`
      )
      const res = await req.data.mahasiswa_asing
      settampilMahasiswaAsing(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/search_mahasiswa_asing/${e.target.value}`
      )
      const res = await req.data.mahasiswa_asing
      settampilMahasiswaAsing(res)
      console.log(res)
    }
  }
  const exportAsing = () => {
    MySwal.fire({
      title: "Export Data Mahasiswa Asing",
      text: "Yakin Export? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ya !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/MahasiswaBaru_Asing/export_mhsAsing/exportMhsAsing`)
      }
    })
  }
  const tambahAsing = () => {
    MySwal.fire({
      title: "Tambah",
      text: "Are you sure? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/MahasiswaBaru_Asing/MahasiswaAsing`)
      }
    })
  }
  const editAsing = (id) => {
    MySwal.fire({
      title: "Edit",
      text: "Are you sure? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/MahasiswaBaru_Asing/edit_mahasiswa_asing/${id}`)
      }
    })
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
                        onClick={() => tambahAsing()}
                        className="btn btn-sm btn-success border-0 shadow-sm  m-0"
                      >
                        Tambah
                      </button>

                      <button
                        onClick={() => exportAsing()}
                        className="btn ms-2 btn-sm btn-success border-0 shadow-sm  m-0"
                      >
                        Export
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
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5>Tahun Akademik</h5>
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h5> Program Studi</h5>
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h5> Mahasiswa Aktif</h5>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Mahasiswa Aktif Full Time</h5>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Mahasiswa Aktif Part Time</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Aksi</h5>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {tampilMahasiswaAsing.map((tAsing) => {
                          return (
                            <tr key={`tasing` + tAsing.id}>
                              <td>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {tAsing.Tahun_Akademik}
                                  </h6>
                                </div>
                              </td>
                              <td className="align-middle ">
                                <h6 className="mb-0 text-sm">
                                  {tAsing.prodi.nama_prodi}
                                </h6>
                              </td>

                              <td className="align-middle text-center text-sm">
                                <h6 className="mb-0 text-sm">
                                  {tAsing.Mahasiswa_Aktif}
                                </h6>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tAsing.Mahasiswa_Aktif_Fulltime}
                                  </h6>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tAsing.Mahasiswa_Aktif_Parttime}
                                  </h6>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <button
                                  onClick={() => editAsing(tAsing.id)}
                                  className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3"
                                >
                                  EDIT
                                </button>

                                <button
                                  onClick={() => deleteMhsAsing(tAsing.id)}
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
