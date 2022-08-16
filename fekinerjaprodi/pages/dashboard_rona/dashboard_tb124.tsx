import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../components/Molecule/Footer/FooterUtama"
import MenuCardUtama from "../../components/Molecule/MenuCard/MenuCardUtama"
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../components/Organism/Layout/LayoutDashboard"
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama"

export default function dashboardadmin() {
  const router = useRouter()
  const [dataRole, setRole] = useState("")
  const linkKelola = {
    profilDsn: "/profildosen/daftarprofil",
  }

  const [stadmin, setStadmin] = useState(false)
  const [profilDosen, setprofilDosen] = useState([])

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profildosens",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { profilDosens } = response.data
        setprofilDosen(profilDosens)

        console.log(profilDosens)
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

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="row justify-content-center">
              <div className="col-4 mt-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Data Mitra </h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="/mitra/tabelmitra" className="btn btn-primary">
                      Kelola Data
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-4 mt-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Data Kerjasama</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a
                      href="/kerjasama/tabelkerjasama"
                      className="btn btn-primary"
                    >
                      Kelola Data
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-4 mt-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Data Mahasiswa Asing</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a
                      href="/MahasiswaBaru_Asing/tabel_mahasiswa_asing"
                      className="btn btn-primary"
                    >
                      Kelola Data
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-4 mt-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Data Seleksi Mahasiswa </h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a
                      href="/MahasiswaBaru_Asing/tabel_penerimaan"
                      className="btn btn-primary"
                    >
                      Kelola Data
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-4 mt-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Data Penggunaan Dana </h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a
                      href="/penggunaan_dana/tabel_penggunaan_dana"
                      className="btn btn-primary"
                    >
                      Kelola Data
                    </a>
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
