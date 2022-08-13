import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama"
import Link from "next/link"

export default function penerimaanMahasiswa() {
  const router = useRouter()

  const [stadmin, setStadmin] = useState(false)
  const [dataSelectTahun, setSelectTahun] = useState([])
  console.log(dataSelectTahun)

  const [tampilMhsAsingTs1, settampilMhsAsingTs1] = useState([])
  const [tampilMhsAsingTs2, settampilMhsAsingTs2] = useState([])
  const [tampilMhsAsingTs3, settampilMhsAsingTs3] = useState([])
  const [tampilMhsAsing, settampilMhsAsing] = useState([])
  const [dataProdis, setdataProdi] = useState([])
  const [prodis, setprodis] = useState([])
  const [tampildataProdis, settampildataProdi] = useState([])

  const handleChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (options) => options.value
    )
    setSelectTahun(value)
  }
  const handleChangeProdi = (e) => {
    setdataProdi(e.target.value)
  }
  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Prodi",
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { Prodi } = response.data
        setprodis(Prodi)
        console.log(dataProdis)
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_mahasiswa_asing",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        settampilMhsAsing(response.data.mahasiswa_asing)
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
  const tampildata = (tahun) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/export_mahasiswa_asing/${tahun}`,
    })
      .then(function (response) {
        const { ts1 } = response.data
        const { ts2 } = response.data
        const { ts3 } = response.data
        settampilMhsAsingTs1(ts1)
        settampilMhsAsingTs2(ts2)
        settampilMhsAsingTs3(ts3)

        console.log(ts1)
        console.log(ts2)
        console.log(ts3)
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
  }
  const tampilprodi = (prodi) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/tampilprodi_mahasiswa_asing/${prodi}`,
    })
      .then(function (response) {
        settampildataProdi(response.data.tampil_mahasiswa_asing)
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
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="d-flex ">
                      <h4>Mahasiswa Asing</h4>

                      <button
                        className="btn btn-primary btn-sm ms-auto"
                        type="submit"
                        onClick={() => tampildata(dataSelectTahun)}
                      >
                        Tampil Tahun
                      </button>
                      <button
                        className="btn btn-primary btn-sm ms-2"
                        type="submit"
                        onClick={() => tampilprodi(dataProdis)}
                      >
                        Tampil Prodi
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
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
                            multiple
                          >
                            {tampilMhsAsing.map((dataMhsasing) => {
                              return (
                                <option
                                  value={dataMhsasing.Tahun_Akademik}
                                  key={dataMhsasing.id}
                                >
                                  {dataMhsasing.Tahun_Akademik}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5>Pilih Prodi</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue={dataProdis}
                            id="tahun"
                            onChange={handleChangeProdi}
                          >
                            <option value="">Pilih Prodi</option>
                            {prodis.map((dataprodi) => {
                              return (
                                <option
                                  value={dataprodi.nama_prodi}
                                  key={dataprodi.id}
                                >
                                  {dataprodi.nama_prodi}
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
            </div>
            <div className="col-12">
              <div className="card mb-4">
                <style jsx>{`
                  table,
                  td,
                  th {
                    border: 1px solid;
                    text-align: center;
                  }

                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                `}</style>
                <table>
                  <thead>
                    <tr>
                      <th rowspan="2">No</th>
                      <th rowspan="2">Program Studi</th>
                      <th colspan="3">Jumlah Mahasiswa Aktif</th>
                      <th colspan="3">
                        Jumlah Mahasiswa Asing Penuh Waktu <br />
                        (Full-time)
                      </th>
                      <th colspan="3">
                        Jumlah Mahasiswa Asing Paruh Waktu <br />
                        (Part-time)
                      </th>
                    </tr>
                    <tr>
                      {!tampilMhsAsingTs3.Tahun_Akademik ? (
                        <th>TS3</th>
                      ) : (
                        <th>{tampilMhsAsingTs3.Tahun_Akademik}</th>
                      )}
                      {!tampilMhsAsingTs2.Tahun_Akademik ? (
                        <th>TS2</th>
                      ) : (
                        <th>{tampilMhsAsingTs2.Tahun_Akademik}</th>
                      )}
                      {!tampilMhsAsingTs1.Tahun_Akademik ? (
                        <th>TS1</th>
                      ) : (
                        <th>{tampilMhsAsingTs1.Tahun_Akademik}</th>
                      )}
                      {!tampilMhsAsingTs3.Tahun_Akademik ? (
                        <th>TS3</th>
                      ) : (
                        <th>{tampilMhsAsingTs3.Tahun_Akademik}</th>
                      )}
                      {!tampilMhsAsingTs2.Tahun_Akademik ? (
                        <th>TS2</th>
                      ) : (
                        <th>{tampilMhsAsingTs2.Tahun_Akademik}</th>
                      )}
                      {!tampilMhsAsingTs1.Tahun_Akademik ? (
                        <th>TS1</th>
                      ) : (
                        <th>{tampilMhsAsingTs1.Tahun_Akademik}</th>
                      )}
                      {!tampilMhsAsingTs3.Tahun_Akademik ? (
                        <th>TS3</th>
                      ) : (
                        <th>{tampilMhsAsingTs3.Tahun_Akademik}</th>
                      )}
                      {!tampilMhsAsingTs2.Tahun_Akademik ? (
                        <th>TS2</th>
                      ) : (
                        <th>{tampilMhsAsingTs2.Tahun_Akademik}</th>
                      )}
                      {!tampilMhsAsingTs1.Tahun_Akademik ? (
                        <th>TS1</th>
                      ) : (
                        <th>{tampilMhsAsingTs1.Tahun_Akademik}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {tampildataProdis.map((mhsasing, index) => {
                      return (
                        <tr key={`tprodi` + mhsasing.id}>
                          {/* no */}
                          <td>{index + 1}</td>
                          {/* prodi */}
                          <td>{mhsasing.prodi.nama_prodi}</td>
                          <td>{tampilMhsAsingTs3.Mahasiswa_Aktif}</td>
                          <td>{tampilMhsAsingTs2.Mahasiswa_Aktif}</td>
                          <td>{tampilMhsAsingTs1.Mahasiswa_Aktif}</td>
                          <td>{tampilMhsAsingTs3.Mahasiswa_Aktif_Fulltime}</td>
                          <td>{tampilMhsAsingTs2.Mahasiswa_Aktif_Fulltime}</td>
                          <td>{tampilMhsAsingTs1.Mahasiswa_Aktif_Fulltime}</td>
                          <td>{tampilMhsAsingTs3.Mahasiswa_Aktif_Parttime}</td>
                          <td>{tampilMhsAsingTs2.Mahasiswa_Aktif_Parttime}</td>
                          <td>{tampilMhsAsingTs1.Mahasiswa_Aktif_Parttime}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <FooterUtama />
          </div>
        </LayoutForm>
      )}
    </>
  )
}
