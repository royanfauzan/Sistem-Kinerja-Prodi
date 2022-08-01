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
  const [tampilKerjasama, settampilKerjasama] = useState([])

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_kjs",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { tampilkerjasama } = response.data
        settampilKerjasama(tampilkerjasama)

        console.log(tampilkerjasama)
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

  const deleteKjs = (id) => {
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
          url: `http://127.0.0.1:8000/api/delete_kjs/${id}`,
        })
          .then(function (response) {
            router.reload()
          })
          .catch(function (err) {
            console.log("gagal")
            console.log(err.response)
          })
      }
    })
  }
  const editKjs = (id) => {
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
        router.push(`/kerjasama/edit/${id}`)
      }
    })
  }
  const tambahKjs = () => {
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
        router.push(`/kerjasama/inputkerjasama`)
      }
    })
  }
  const exportKjs = () => {
    MySwal.fire({
      title: "EXport",
      text: "Are you sure? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/kerjasama/export_kerjasama/export_kjs`)
      }
    })
  }
  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/read_kjs/`)
      const res = await req.data.tampilkerjasama
      settampilKerjasama(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/read_kjs/${e.target.value}`
      )
      const res = await req.data.searchkerjasama
      settampilKerjasama(res)
    }
  }
  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm>
          <div className=" container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-8">
                      <button
                        onClick={() => tambahKjs()}
                        className="btn btn-sm btn-success border-0 shadow-sm  m-0"
                      >
                        Tambah
                      </button>

                      <button
                        onClick={() => exportKjs()}
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
                            <h6>Lembaga Mitra</h6>
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h6> Tingkat</h6>
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h6>Judul Kegiatan Kerjasama</h6>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h6> Manfaat Bagi PS Yang Diakreditasi</h6>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h6>Waktu dan Durasi</h6>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h6> Bukti Kerjasama</h6>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h6>Tahun Berakhirnya Kerjasama</h6>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h6> Bidang</h6>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h6> Aksi</h6>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tampilKerjasama.map((tKjs) => {
                          return (
                            <tr
                              className="text-center"
                              key={`tkerjasama` + tKjs.id}
                            >
                              <td>
                                <h6 className="mb-0 text-sm">
                                  {tKjs.mitra.namamitra}
                                </h6>
                              </td>
                              <td>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {tKjs.tingkat}
                                  </h6>
                                </div>
                              </td>
                              <td className="align-middle ">
                                <h6 className="mb-0 text-sm">
                                  {tKjs.judul_kegiatan}
                                </h6>
                              </td>

                              <td className="align-middle text-center text-sm">
                                <h6 className="mb-0 text-sm">{tKjs.manfaat}</h6>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tKjs.tanggal_kegiatan}
                                  </h6>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tKjs.bukti_kerjasama}
                                  </h6>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tKjs.tahun_berakhir}
                                  </h6>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tKjs.mitra.bidang}
                                  </h6>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <button
                                  onClick={() => editKjs(tKjs.id)}
                                  className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3"
                                >
                                  EDIT
                                </button>
                                <button
                                  onClick={() => deleteKjs(tKjs.id)}
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
