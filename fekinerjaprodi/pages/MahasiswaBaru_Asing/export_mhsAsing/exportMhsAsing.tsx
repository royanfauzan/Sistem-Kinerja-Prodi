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
  const [dataSelectTahun, setSelectTahun] = useState([])
  console.log(dataSelectTahun)
  const [dataRole, setRole] = useState("")
  const [tampilMhsAsingTs1, settampilMhsAsingTs1] = useState([])
  const [tampilMhsAsingTs2, settampilMhsAsingTs2] = useState([])
  const [tampilMhsAsingTs3, settampilMhsAsingTs3] = useState([])
  const [tampilMhsAsing, settampilMhsAsing] = useState([])
  const [dataProdis, sethataProdi] = useState([])
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
    sethataProdi(e.target.value)
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
        console.log(response.data)
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
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="d-flex ">
                      <h4>Mahasiswa Asing</h4>
                      <button
                        className="btn btn-primary btn-sm  ms-auto "
                        type="submit"
                        onClick={() => tampilprodi(dataProdis)}
                      >
                        Tampil Prodi
                      </button>
                      <button
                        className="btn btn-primary btn-sm ms-2 "
                        type="submit"
                        onClick={() => tampildata(dataSelectTahun)}
                      >
                        Tampil Tahun
                      </button>
                    </div>
                  </div>

                  <div className="card-body pb-0">
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

                  <div className="card-body pt-0">
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
                </div>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h3>Mahasiswa Asing</h3>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      {/* <button className="btn btn-sm btn-success border-0 shadow-sm mb-3 me-3">
                        EXPORT
                      </button> */}
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-success ms-3"
                        table="table1"
                        filename="Mahasiswa Asing"
                        sheet="Mahasiswa Asing"
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
                            <h3 className="mb-0 text-sm">No</h3>
                          </th>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">Program Studi</h3>
                          </th>
                          <th colspan="3">
                            <h3 className="mb-0 text-sm">
                              Jumlah Mahasiswa Aktif
                            </h3>
                          </th>
                          <th colspan="3">
                            <h3 className="mb-0 text-sm">
                              Jumlah Mahasiswa Asing Penuh Waktu <br />
                              (Full-time)
                            </h3>
                          </th>
                          <th colspan="3">
                            <h3 className="mb-0 text-sm">
                              Jumlah Mahasiswa Asing Paruh Waktu <br />
                              (Part-time)
                            </h3>
                          </th>
                        </tr>
                        <tr>
                          {!tampilMhsAsingTs3.Tahun_Akademik ? (
                            <th>TS3</th>
                          ) : (
                            <th>
                              <h3 className="mb-0 text-sm">
                                {tampilMhsAsingTs3.Tahun_Akademik}
                              </h3>
                            </th>
                          )}
                          {!tampilMhsAsingTs2.Tahun_Akademik ? (
                            <th>TS2</th>
                          ) : (
                            <th>
                              <h3 className="mb-0 text-sm">
                                {tampilMhsAsingTs2.Tahun_Akademik}
                              </h3>
                            </th>
                          )}
                          {!tampilMhsAsingTs1.Tahun_Akademik ? (
                            <th>TS1</th>
                          ) : (
                            <th>
                              <h3 className="mb-0 text-sm">
                                {tampilMhsAsingTs1.Tahun_Akademik}
                              </h3>
                            </th>
                          )}
                          {!tampilMhsAsingTs3.Tahun_Akademik ? (
                            <th>TS3</th>
                          ) : (
                            <th>
                              <h3 className="mb-0 text-sm">
                                {tampilMhsAsingTs3.Tahun_Akademik}
                              </h3>
                            </th>
                          )}
                          {!tampilMhsAsingTs2.Tahun_Akademik ? (
                            <th>TS2</th>
                          ) : (
                            <th>
                              <h3 className="mb-0 text-sm">
                                {tampilMhsAsingTs2.Tahun_Akademik}
                              </h3>
                            </th>
                          )}
                          {!tampilMhsAsingTs1.Tahun_Akademik ? (
                            <th>TS1</th>
                          ) : (
                            <th>
                              <h3 className="mb-0 text-sm">
                                {tampilMhsAsingTs1.Tahun_Akademik}
                              </h3>
                            </th>
                          )}
                          {!tampilMhsAsingTs3.Tahun_Akademik ? (
                            <th>TS3</th>
                          ) : (
                            <th>
                              <h3 className="mb-0 text-sm">
                                {tampilMhsAsingTs3.Tahun_Akademik}
                              </h3>
                            </th>
                          )}
                          {!tampilMhsAsingTs2.Tahun_Akademik ? (
                            <th>TS2</th>
                          ) : (
                            <th>
                              <h3 className="mb-0 text-sm">
                                {tampilMhsAsingTs2.Tahun_Akademik}
                              </h3>
                            </th>
                          )}
                          {!tampilMhsAsingTs1.Tahun_Akademik ? (
                            <th>TS1</th>
                          ) : (
                            <th>
                              <h3 className="mb-0 text-sm">
                                {tampilMhsAsingTs1.Tahun_Akademik}
                              </h3>
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {tampildataProdis.map((mhsasing, index) => {
                          return (
                            <tr key={`tprodi` + mhsasing.id}>
                              {/* no */}
                              <th>
                                <h4 className="mb-0 text-sm">{index + 1}</h4>
                              </th>
                              {/* prodi */}
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {mhsasing.prodi.nama_prodi}
                                </h4>
                              </th>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tampilMhsAsingTs3.Mahasiswa_Aktif}
                                </h4>
                              </th>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tampilMhsAsingTs2.Mahasiswa_Aktif}
                                </h4>
                              </th>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tampilMhsAsingTs1.Mahasiswa_Aktif}
                                </h4>
                              </th>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tampilMhsAsingTs3.Mahasiswa_Aktif_Fulltime}
                                </h4>
                              </th>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tampilMhsAsingTs2.Mahasiswa_Aktif_Fulltime}
                                </h4>
                              </th>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tampilMhsAsingTs1.Mahasiswa_Aktif_Fulltime}
                                </h4>
                              </th>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tampilMhsAsingTs3.Mahasiswa_Aktif_Parttime}
                                </h4>
                              </th>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tampilMhsAsingTs2.Mahasiswa_Aktif_Parttime}
                                </h4>
                              </th>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tampilMhsAsingTs1.Mahasiswa_Aktif_Parttime}
                                </h4>
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
