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
  const [tampiljumlah, settampiljumlah] = useState([])
  const [dataRole, setRole] = useState("")
  const [listtahun, setlisttahun] = useState([0])
  const [dataSelectTahun, setSelectTahun] = useState([])

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
        settampiljumlah(response.data.Jumlah)
        console.log(response.data.Jumlah)
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
        gettahun()
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
        return router.push("/")
      })
  }, [])
  const handleChange = (e) => {
    setSelectTahun(e.target.value)
  }

  const gettahun = () => {
    const tahun = new Date().getFullYear()
    let tahunarr = []

    for (let i = 0; i < 6; i++) {
      tahunarr[i] = tahun - i
    }
    setlisttahun(tahunarr)
    console.log(tahunarr)
  }

  const tampildata = (tahun) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/pilih_penerimaan_mahasiswa/${tahun}`,
    })
      .then(function (response) {
        settampilPenerimaan(response.data.seleksi)
        settampiljumlah(response.data.jumlah)
        console.log(response.data.seleksi)
        console.log(response.data.jumlah)
        console.log("asd")
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
            <div className="col-md-12">
              <div className="card">
                <div className="card-header pb-0">
                  <div className="d-flex ">
                    <h4>Seleksi Mahasiswa</h4>

                    <button
                      className="btn btn-primary btn-sm ms-auto "
                      type="submit"
                      onClick={() => tampildata(dataSelectTahun)}
                    >
                      Tampil Tahun
                    </button>
                  </div>
                </div>

                <div className="card-body  pt-0">
                  <h5>Pilih Tahun</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          defaultValue={dataSelectTahun}
                          id="tahun"
                          onChange={handleChange}
                        >
                          <option value="">Pilih Tahun</option>
                          {listtahun.map((tahun) => {
                            return (
                              <option value={tahun} key={tahun}>
                                {tahun}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h4>Tabel Seleksi Mahasiswa</h4>
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
                          <th rowSpan={2}>
                            <h3 className="mb-0 text-sm">Tahun Akademik</h3>
                          </th>
                          <th rowSpan={2}>
                            <h3 className="mb-0 text-sm">Daya Tampung</h3>
                          </th>
                          <th colSpan={2}>
                            <h3 className="mb-0 text-sm">
                              Jumlah Calon Mahasiswa
                            </h3>
                          </th>
                          <th colSpan={2}>
                            <h3 className="mb-0 text-sm">
                              Jumlah Mahasiswa Baru
                            </h3>
                          </th>
                          <th colSpan={2}>
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
                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">TS-4</h4>
                          </th>
                          <th>
                            {tampilPenerimaan[4] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[4].Daya_Tampung}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle ">
                            {tampilPenerimaan[4] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[4].Pendaftaran}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center text-sm">
                            {tampilPenerimaan[4] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[4].Lulus_Seleksi}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle text-center">
                            {tampilPenerimaan[4] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[4].Maba_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[4] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[4].Maba_Transfer}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[4] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[4].Mahasiswa_Aktif_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[4] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[4].Mahasiswa_Aktif_Transfer}
                              </h4>
                            )}
                          </th>
                        </tr>

                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">TS-3</h4>
                          </th>
                          <th>
                            {tampilPenerimaan[3] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[3].Daya_Tampung}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle ">
                            {tampilPenerimaan[3] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[3].Pendaftaran}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center text-sm">
                            {tampilPenerimaan[3] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[3].Lulus_Seleksi}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle text-center">
                            {tampilPenerimaan[3] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[3].Maba_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[3] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[3].Maba_Transfer}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[3] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[3].Mahasiswa_Aktif_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[3] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[3].Mahasiswa_Aktif_Transfer}
                              </h4>
                            )}
                          </th>
                        </tr>

                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">TS-2</h4>
                          </th>
                          <th>
                            {tampilPenerimaan[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[2].Daya_Tampung}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle ">
                            {tampilPenerimaan[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[2].Pendaftaran}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center text-sm">
                            {tampilPenerimaan[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[2].Lulus_Seleksi}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle text-center">
                            {tampilPenerimaan[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[2].Maba_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[2].Maba_Transfer}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[2].Mahasiswa_Aktif_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[2].Mahasiswa_Aktif_Transfer}
                              </h4>
                            )}
                          </th>
                        </tr>

                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">TS-1</h4>
                          </th>
                          <th>
                            {tampilPenerimaan[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[1].Daya_Tampung}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle ">
                            {tampilPenerimaan[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[1].Pendaftaran}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center text-sm">
                            {tampilPenerimaan[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[1].Lulus_Seleksi}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle text-center">
                            {tampilPenerimaan[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[1].Maba_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[1].Maba_Transfer}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[1].Mahasiswa_Aktif_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[1].Mahasiswa_Aktif_Transfer}
                              </h4>
                            )}
                          </th>
                        </tr>

                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">TS</h4>
                          </th>
                          <th>
                            {tampilPenerimaan[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[0].Daya_Tampung}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle ">
                            {tampilPenerimaan[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[0].Pendaftaran}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center text-sm">
                            {tampilPenerimaan[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[0].Lulus_Seleksi}
                              </h4>
                            )}
                          </th>
                          <th className="align-middle text-center">
                            {tampilPenerimaan[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[0].Maba_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[0].Maba_Transfer}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[0].Mahasiswa_Aktif_Reguler}
                              </h4>
                            )}
                          </th>

                          <th className="align-middle text-center">
                            {tampilPenerimaan[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilPenerimaan[0].Mahasiswa_Aktif_Transfer}
                              </h4>
                            )}
                          </th>
                        </tr>
                        <tr>
                          <th colSpan={2}>Jumlah</th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_pendaftaran}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_lulus}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_reguler_baru}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_transfer_baru}
                              </h4>
                            )}
                          </th>

                          <th colSpan={2}>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_reguler_transfer_aktif}
                              </h4>
                            )}
                          </th>
                        </tr>
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
