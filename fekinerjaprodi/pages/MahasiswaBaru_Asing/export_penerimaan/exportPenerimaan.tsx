import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama"
import Link from "next/link"
import ReactHTMLTableToExcel from "react-html-table-to-excel"

export default function penerimaanMahasiswa() {
  const router = useRouter()

  const [stadmin, setStadmin] = useState(false)
  const [tampilPenerimaan, settampilPenerimaan] = useState([])
  const [dataRole, setRole] = useState("")
  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_penerimaan_mahasiswa",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { Seleksi } = response.data
        settampilPenerimaan(Seleksi)

        console.log(Seleksi)
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

  const deletePenerimaan = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/delete_penerimaan_mahasiswa/${id}`,
    })
      .then(function (response) {
        router.reload()
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
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
                    <div className="col-4">
                      <h4>Authors table</h4>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-success ms-3"
                        table="table1"
                        filename="Seleksi Mahasiswa"
                        sheet="Seleksi Mahasiswa"
                        buttonText="Export Excel"
                      />
                    </div>
                  </div>
                </div>
                <style jsx>{`
                  table,
                  th,
                  th {
                    border: 1px solid;
                    text-align: center;
                  }

                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                `}</style>

                <div className="card-body ">
                  <div className="table-responsive p-0">
                    <table id="table1" border={1}>
                      <thead>
                        <tr>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">Tahun Akademik</h3>
                          </th>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">Daya Tampung</h3>
                          </th>
                          <th colspan="2">
                            <h3 className="mb-0 text-sm">
                              Jumlah Calon Mahasiswa
                            </h3>
                          </th>
                          <th colspan="2">
                            <h3 className="mb-0 text-sm">
                              Jumlah Mahasiswa Baru
                            </h3>
                          </th>
                          <th colspan="2">
                            <h3 className="mb-0 text-sm">
                              Jumlah Mahasiswa Aktif
                            </h3>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <h3 className="mb-0 text-sm">Pendaftar</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">Lulus Seleksi</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">Reguler</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">Transfer</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">Reguler</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">Transfer</h3>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tampilPenerimaan.map((tPenerimaan) => {
                          return (
                            <tr key={`tpenerimaan` + tPenerimaan.id}>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tPenerimaan.Tahun_Akademik}
                                </h4>
                              </th>
                              <th>
                                <div className="d-flex flex-column justify-content-center">
                                  <h4 className="mb-0 text-sm">
                                    {tPenerimaan.Daya_Tampung}
                                  </h4>
                                </div>
                              </th>
                              <th className="align-middle ">
                                <h4 className="mb-0 text-sm">
                                  {tPenerimaan.Pendaftaran}
                                </h4>
                              </th>

                              <th className="align-middle text-center text-sm">
                                <h4 className="mb-0 text-sm">
                                  {tPenerimaan.Lulus_Seleksi}
                                </h4>
                              </th>
                              <th className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h4 className="mb-0 text-sm">
                                    {tPenerimaan.Maba_Reguler}
                                  </h4>
                                </span>
                              </th>

                              <th className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h4 className="mb-0 text-sm">
                                    {tPenerimaan.Maba_Transfer}
                                  </h4>
                                </span>
                              </th>

                              <th className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h4 className="mb-0 text-sm">
                                    {tPenerimaan.Mahasiswa_Aktif_Reguler}
                                  </h4>
                                </span>
                              </th>

                              <th className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h4 className="mb-0 text-sm">
                                    {tPenerimaan.Mahasiswa_Aktif_Transfer}
                                  </h4>
                                </span>
                              </th>
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
