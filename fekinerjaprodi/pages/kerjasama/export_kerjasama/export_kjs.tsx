import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama"
import TableToExcel from "@linways/table-to-excel"
import ReactHTMLTableToExcel from "react-html-table-to-excel"

// import dynamic from 'next/dynamic';
// const foo = dynamic(import("@linways/table-to-excel"), { ssr: false });

export default function exportKerjasama() {
  const router = useRouter()

  const [stadmin, setStadmin] = useState(false)
  const [tampilKerjasama, settampilKerjasama] = useState([])
  const [dataBidang, setSelectBidang] = useState([])
  const [dataRole, setRole] = useState("")
  const [NameExport, setNameExport] = useState("")
  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")
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
  const handleChange = (e) => {
    setSelectBidang(e.target.value)
    setNameExport(e.target.value)
  }
  const tampildata = async (bidang) => {
    const req = await axios.get(
      `http://127.0.0.1:8000/api/read_bidang_kjs/${bidang}`
    )
    const res = await req.data.tampilkerjasamabidang
    settampilKerjasama(res)
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
                    <div className="d-flex align-items-center">
                      <h4>Kerjasama</h4>

                      <button
                        className="btn btn-primary btn-sm ms-auto"
                        type="submit"
                        onClick={() => tampildata(dataBidang)}
                      >
                        Tampil Data
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5>Pilih Bidang</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue={dataBidang}
                            id="tahun"
                            onChange={handleChange}
                          >
                            <option value="">Pilih Bidang</option>
                            <option value="Kerjasama Pendidikan">
                              Kerjasama Pendidikan
                            </option>
                            <option value="Kerjasama Penelitian">
                              Kerjasama Penelitian
                            </option>
                            <option value="Kerjasama Pengabdian Kepada Masyarakat">
                              Kerjasama Pengabdian Kepada Masyarakat
                            </option>
                          </select>
                        </div>
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
                      <h3>Kerjasama</h3>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      {/* <button className="btn btn-sm btn-success border-0 shadow-sm mb-3 me-3">
                        EXPORT
                      </button> */}
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-success ms-3"
                        table="table1"
                        filename={NameExport}
                        sheet={NameExport}
                        buttonText="Export Excel"
                      />
                    </div>
                  </div>
                </div>

                <div className="card-body ">
                  <div className="table-responsive p-0">
                    <table id="table1" border={1}>
                      <thead>
                        <tr>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">No</h3>
                          </th>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">Lembaga Mitra</h3>
                          </th>
                          <th colspan="3">
                            <h3 className="mb-0 text-sm">Tingkat</h3>
                          </th>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">
                              Judul Kegiatan Kerjasama
                            </h3>
                          </th>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">
                              Manfaat Bagi PS yang Diakreditasi
                            </h3>
                          </th>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">Waktu dan Durasi</h3>
                          </th>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">Bukti Kerjasama</h3>
                          </th>
                          <th rowspan="2">
                            <h3 className="mb-0 text-sm">
                              Tahun Berakhirnya Kerjasama
                            </h3>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <h3 className="mb-0 text-sm">Internasional</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">Nasional</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">Wilayah/Lokal</h3>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tampilKerjasama.map((tKjs, number) => {
                          return (
                            <tr key={`tkerjasama` + tKjs.id}>
                              <th>
                                <h4 className="mb-0 text-sm">
                                  <center> {number + 1}</center>
                                </h4>
                              </th>

                              <th>
                                <h4 className="mb-0 text-sm">
                                  {tKjs.mitra.namamitra}
                                </h4>
                              </th>

                              {tKjs.tingkat == "Internasional" ? (
                                <>
                                  <th>
                                    &#10004;
                                  </th>
                                  <th></th> <th> </th>
                                </>
                              ) : (
                                ""
                              )}
                              {tKjs.tingkat == "Nasional" ? (
                                <>
                                  <th></th>
                                  <th>
                                  &#10004;
                                  </th>
                                  <th> </th>
                                </>
                              ) : (
                                ""
                              )}
                              {tKjs.tingkat == "Lokal" ? (
                                <>
                                  <th></th> <th> </th>
                                  <th>
                                  &#10004;
                                  </th>
                                </>
                              ) : (
                                ""
                              )}
                              <th className="align-middle ">
                                <h4 className="mb-0 text-sm">
                                  {tKjs.judul_kegiatan}
                                </h4>
                              </th>

                              <th className="align-middle text-center text-sm">
                                <h4 className="mb-0 text-sm">{tKjs.manfaat}</h4>
                              </th>
                              <th className="align-middle text-center">
                                <h4 className="mb-0 text-sm">
                                  {tKjs.tanggal_kegiatan}
                                </h4>
                              </th>

                              <th className="align-middle text-center">
                                <h4 className="mb-0 text-sm">
                                  {tKjs.bukti_kerjasama}
                                </h4>
                              </th>

                              <th className="align-middle text-center">
                                <h4 className="mb-0 text-sm">
                                  {tKjs.tahun_berakhir}
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
        </LayoutForm>
      )}
    </>
  )
}
