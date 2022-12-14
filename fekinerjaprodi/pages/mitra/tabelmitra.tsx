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

  const [stadmin, setStadmin] = useState(false)
  const [tampilMitra, settampilMitra] = useState([])
  const MySwal = withReactContent(Swal)
  const [dataRole, setRole] = useState("")
  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_mitra",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { tampil_mitras } = response.data
        settampilMitra(tampil_mitras)

        console.log(tampil_mitras)
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

  const deleteMitra = (id) => {
    MySwal.fire({
      title: "Yakin Hapus Data Mitra?",
      text: "Data Tidak Dapat Dikembalikan Jika di Hapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak",
      confirmButtonText: "Ya",
    }).then((result) => {
      // <--
      if (result.isConfirmed) {
        // <-- if confirmed
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/delete_mitra/${id}`,
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

  const editMitra = (id) => {
    MySwal.fire({
      title: "Edit Data Mitra",
      text: "Yakin Edit Data? ",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Iya",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/mitra/edit/${id}`)
      }
    })
  }

  const tambahMitra = () => {
    MySwal.fire({
      title: "Tambah Data Mitra",
      text: "Yakin Tambah Data Mitra? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/mitra/input_mitra`)
      }
    })
  }
  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/ReadMitra/`)
      const res = await req.data.tampil_mitras
      settampilMitra(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/readMitra/${e.target.value}`
      )
      const res = await req.data.searchmitra
      settampilMitra(res)
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
                  <p className="text-uppercase text-sm text-center"> <h5>TABEL DATA MITRA </h5> </p>
                    <div className="col-8">
                    
                      <button
                        onClick={() => tambahMitra()}
                        className="btn btn-sm btn-success border-0 shadow-sm  m-0"
                      >
                        Tambah Data Mitra
                      </button>
                    </div>

                    <div className="col-4 d-flex flex-row-reverse">
                      <input
                         className="form-control d-flex flex-row-reverse me-2 mt-3 mb-0"
                        type="text"
                        placeholder="Cari Data Mitra..."
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
                            <h5>Nama Mitra</h5>
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h5> Alamat</h5>
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h5> Nomor Telepon</h5>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Nama Contact Person</h5>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> No. Telp Contact Person</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Email Contact Person</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Bidang</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Aksi</h5>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tampilMitra.map((tMitra) => {
                          return (
                            <tr key={`tmitra` + tMitra.id}>
                              <td>
                                <h6 className="mb-0 text-sm">
                                  {tMitra.namamitra}
                                </h6>
                              </td>
                              <td>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {tMitra.alamat}
                                  </h6>
                                </div>
                              </td>
                              <td className="align-middle ">
                                <h6 className="mb-0 text-sm">
                                  {tMitra.no_telepon}
                                </h6>
                              </td>

                              <td className="align-middle text-center text-sm">
                                <h6 className="mb-0 text-sm">
                                  {tMitra.nama_cp}
                                </h6>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tMitra.no_telp_cp}
                                  </h6>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tMitra.email_cp}
                                  </h6>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tMitra.bidang}
                                  </h6>
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <button
                                  onClick={() => editMitra(tMitra.id)}
                                  className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3"
                                >
                                  EDIT
                                </button>

                                <button
                                  onClick={() => deleteMitra(tMitra.id)}
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
