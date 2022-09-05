import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Select from "react-select"
import toast from "react-hot-toast"
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama"
import Link from "next/link"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
interface Prodi {
  nama_prodi: string
}

export default function export_dana() {
  const router = useRouter()
  const [listtahun, setlisttahun] = useState([0])

  const [dataSelectTahun, setSelectTahun] = useState([])
  const [dataRole, setRole] = useState("")

  // state pake test user
  const [stadmin, setStadmin] = useState(false)

  const [tampildana, setdataDana] = useState([])
  const [tampilpkm, setdataPkm] = useState([])
  const [tampilpenelitian, setdataPenelitian] = useState([])
  const [tampilrata, setdataRata] = useState([])
  const [tampiljumlah, setdataJumlah] = useState([])

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/tampil_export_penggunaan_dana",
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { tampil_penggunaan_dana } = response.data
        setdataDana(tampil_penggunaan_dana)
        setdataPkm(response.data.tampil_pkm)
        setdataPenelitian(response.data.tampil_penelitian)
        setdataRata(response.data.rata)
        setdataJumlah(response.data.jumlah)
        console.log(response.data)
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
  }

  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
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
    console.log(e.target.value)
  }
  const tampildata = (tahun) => {
    console.log(tahun)
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/export_penggunaan_dana/${tahun}`,
    })
      .then(function (response) {
        setdataDana(response.data.tampil_penggunaan_dana)
        setdataPkm(response.data.tampil_pkm)
        setdataPenelitian(response.data.tampil_penelitian)
        setdataJumlah(response.data.jumlah)
        setdataRata(response.data.rata)
        console.log(response.data)
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
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
                      <h4>Penggunaan Dana</h4>

                      <button
                        className="btn btn-primary btn-sm ms-auto"
                        type="submit"
                        onClick={() => tampildata(dataSelectTahun)}
                      >
                        Tampil Data
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
            </div>
            <div className="col-12">
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
              <div className="card mb-4 mt-5">
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Penggunaan Dana</h6>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-success ms-3"
                        table="table1"
                        filename="Penggunaan Dana"
                        sheet="Penggunaan Dana"
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
                            <h3 className="mb-0 text-sm">Program Studi</h3>
                          </th>
                          <th rowspan="2" className="w-20">
                            <h3 className="mb-0 text-sm">Jenis Penggunaan</h3>
                          </th>
                          <th colspan="4">
                            <h3 className="mb-0 text-sm">
                              Unit Pengelola Program Studi <br />
                              (Rupiah)
                            </h3>
                          </th>
                          <th colspan="4">
                            <h3 className="mb-0 text-sm">
                              Program Studi <br />
                              (Rupiah)
                            </h3>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <h3 className="mb-0 text-sm">TS-2</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">TS-1</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">TS</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">Rata-rata</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">TS-2</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">TS-1</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">TS</h3>
                          </th>
                          <th>
                            <h3 className="mb-0 text-sm">Rata-rata</h3>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">1</h4>
                          </th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              Manajemen Informatika
                            </h4>
                          </th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              Biaya Operasional Pendidikan
                            </h4>
                          </th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                        <tr>
                          <th></th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              a. Biaya Dosen (Gaji, Honor)
                            </h4>
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Dosen_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Dosen_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Dosen_UPPS}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].bdsn_upps)}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Dosen_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Dosen_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Dosen_Prodi}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].bdsn_prodi)}
                              </h4>
                            )}
                          </th>
                        </tr>
                        <tr>
                          <th></th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              b. Biaya Tenaga Kependidikan (Gaji, Honor)
                            </h4>
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Tenaga_Kependidikan_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Tenaga_Kependidikan_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Tenaga_Kependidikan_UPPS}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].btenaga_upps)}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Tenaga_Kependidikan_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Tenaga_Kependidikan_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Tenaga_Kependidikan_Prodi}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].btenaga_prodi)}
                              </h4>
                            )}
                          </th>
                        </tr>
                        <tr>
                          <th></th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              c. Biaya Operasional Pembelajaran (Bahan dan
                              Peralatan Habis Pakai)
                            </h4>
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[2]
                                    .Biaya_Operasional_Pembelajaran_UPPS
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[1]
                                    .Biaya_Operasional_Pembelajaran_UPPS
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[0]
                                    .Biaya_Operasional_Pembelajaran_UPPS
                                }
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].boperasional_pmbljrn_upps
                                )}
                              </h4>
                            )}
                          </th>
                          {/* Biaya_Operasional_Pembelajaran_Prodi */}
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[2]
                                    .Biaya_Operasional_Pembelajaran_Prodi
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[1]
                                    .Biaya_Operasional_Pembelajaran_Prodi
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[0]
                                    .Biaya_Operasional_Pembelajaran_Prodi
                                }
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].boperasional_pmbljrn_prodi
                                )}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/* end Biaya_Operasional_Pembelajaran_Prodi */}

                        {/* Biaya Operasional Tidak Langsung UPPS */}
                        <tr>
                          <th></th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              d. Biaya Operasional Tidak Langsung (Listrik, Gas,
                              Air, Pemeliharaan Gedung, Pemeliharaan Sarana,
                              Uang Lembur, Telekomunikasi, Konsumsi, Transport
                              Lokal, Pajak, Asuransi, dll.)
                            </h4>
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[2]
                                    .Biaya_Operasional_TidakLangsung_UPPS
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[1]
                                    .Biaya_Operasional_TidakLangsung_UPPS
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[0]
                                    .Biaya_Operasional_TidakLangsung_UPPS
                                }
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].boperasional_tdklgsg_upps
                                )}
                              </h4>
                            )}
                          </th>
                          {/* end  Biaya_Operasional_TidakLangsung_UPPS*/}

                          {/* Biaya_Operasional_TidakLangsung_Prodi */}
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[2]
                                    .Biaya_Operasional_TidakLangsung_Prodi
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[1]
                                    .Biaya_Operasional_TidakLangsung_Prodi
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[0]
                                    .Biaya_Operasional_TidakLangsung_Prodi
                                }
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].boperasional_tdklgsg_prodi
                                )}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/* end  Biaya_Operasional_TidakLangsung_Prodi*/}

                        {/* Biaya operasional kemahasiswaan UPPS */}
                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">2</h4>
                          </th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              Biaya operasional kemahasiswaan (penalaran, minat,
                              bakat, dan kesejahteraan).
                            </h4>
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[2]
                                    .Biaya_Operasional_Kemahasiswaan_UPPS
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[1]
                                    .Biaya_Operasional_Kemahasiswaan_UPPS
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[0]
                                    .Biaya_Operasional_Kemahasiswaan_UPPS
                                }
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].boperasional_mhs_upps
                                )}
                              </h4>
                            )}
                          </th>
                          {/* end Biaya_Operasional_Kemahasiswaan_UPPS */}

                          {/* Biaya_Operasional_Kemahasiswaan_Prodi */}
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[2]
                                    .Biaya_Operasional_Kemahasiswaan_Prodi
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[1]
                                    .Biaya_Operasional_Kemahasiswaan_Prodi
                                }
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {
                                  tampildana[0]
                                    .Biaya_Operasional_Kemahasiswaan_Prodi
                                }
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].boperasional_mhs_prodi
                                )}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/* end Biaya_Operasional_Kemahasiswaan_Prodi */}

                        {/* Jumlah UPPS */}
                        <tr>
                          <th></th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">Jumlah</h4>
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_bo_ts2_upps}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_bo_ts1_upps}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_bo_ts_upps}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].bdsn_upps +
                                    tampilrata[0].btenaga_upps +
                                    tampilrata[0].boperasional_pmbljrn_upps +
                                    tampilrata[0].boperasional_tdklgsg_upps +
                                    tampilrata[0].boperasional_mhs_upps
                                )}
                              </h4>
                            )}
                          </th>
                          {/* End Jumlah UPPS */}

                          {/* PRODI */}
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_bo_ts2_prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_bo_ts1_prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_bo_ts_prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].bdsn_prodi +
                                    tampilrata[0].btenaga_prodi +
                                    tampilrata[0].boperasional_pmbljrn_prodi +
                                    tampilrata[0].boperasional_tdklgsg_prodi +
                                    tampilrata[0].boperasional_mhs_prodi
                                )}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/*Biaya Penelitian  */}
                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">3</h4>
                          </th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">Biaya Penelitian</h4>
                          </th>
                          <th>
                            {tampilpenelitian[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpenelitian[2].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpenelitian[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpenelitian[1].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpenelitian[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpenelitian[0].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].bpenelitian_upps)}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpenelitian[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpenelitian[2].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpenelitian[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpenelitian[1].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpenelitian[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpenelitian[0].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].bpenelitian_prodi)}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/* end biaya penelitian */}

                        {/* Biaya PKM */}
                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">4</h4>
                          </th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">Biaya PKM</h4>
                          </th>
                          <th>
                            {tampilpkm[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpkm[2].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpkm[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpkm[1].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpkm[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpkm[0].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].bpkm_upps)}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpkm[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpkm[2].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpkm[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpkm[1].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilpkm[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampilpkm[0].dana_PT_Mandiri}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].bpkm_prodi)}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/* end biaya pkm */}

                        {/* jumlah pkm penlitain  */}
                        <tr>
                          <th></th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">Jumlah</h4>
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_pp_ts2_upps}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_pp_ts1_upps}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_pp_ts_upps}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].bpkm_upps +
                                    tampilrata[0].bpenelitian_upps
                                )}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_pp_ts2_prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_pp_ts1_prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_pp_ts_prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].bpkm_prodi +
                                    tampilrata[0].bpenelitian_prodi
                                )}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/* end jumlah pkm penelitian */}

                        {/*  Biaya Investasi SDM */}
                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">5</h4>
                          </th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              Biaya Investasi SDM
                            </h4>
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Investasi_SDM_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Investasi_SDM_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Investasi_SDM_UPPS}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].binvestasi_sdm_upps)}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Investasi_SDM_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Investasi_SDM_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Investasi_SDM_Prodi}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(tampilrata[0].binvestasi_sdm_prodi)}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/* end biaya investasi sdm  */}

                        {/* Biaya Investasi Sarana */}
                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">6</h4>
                          </th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              Biaya Investasi Sarana
                            </h4>
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Investasi_Sarana_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Investasi_Sarana_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Investasi_Sarana_UPPS}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].binvestasi_sarana_upps
                                )}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Investasi_Sarana_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Investasi_Sarana_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Investasi_Sarana_Prodi}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].binvestasi_sarana_prodi
                                )}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/* biaya sarana  */}

                        {/* biaya prasarana */}
                        <tr>
                          <th>
                            <h4 className="mb-0 text-sm">7</h4>
                          </th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">
                              Biaya Investasi Prasarana
                            </h4>
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Investasi_Prasarana_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Investasi_Prasarana_UPPS}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Investasi_Prasarana_UPPS}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].binvestasi_prasarana_upps
                                )}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[2] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[2].Biaya_Investasi_Prasarana_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[1] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[1].Biaya_Investasi_Prasarana_Prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampildana[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampildana[0].Biaya_Investasi_Prasarana_Prodi}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampilrata[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].binvestasi_prasarana_prodi
                                )}
                              </h4>
                            )}
                          </th>
                        </tr>
                        {/* biaya prasarana */}
                        <tr>
                          <th></th>
                          <th></th>
                          <th>
                            <h4 className="mb-0 text-sm">Jumlah</h4>
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_investasi_ts2_upps}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_investasi_ts1_upps}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_investasi_ts_upps}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].binvestasi_sdm_upps +
                                    tampilrata[0].binvestasi_sarana_upps +
                                    tampilrata[0].binvestasi_prasarana_upps
                                )}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_investasi_ts2_prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_investasi_ts1_prodi}
                              </h4>
                            )}
                          </th>
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {tampiljumlah[0].jmlh_investasi_ts_prodi}
                              </h4>
                            )}
                          </th>
                          {/* rata-rata */}
                          <th>
                            {tampiljumlah[0] == null ? (
                              0
                            ) : (
                              <h4 className="mb-0 text-sm">
                                {Math.round(
                                  tampilrata[0].binvestasi_sdm_prodi +
                                    tampilrata[0].binvestasi_sarana_prodi +
                                    tampilrata[0].binvestasi_prasarana_prodi
                                )}
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
          </div>
        </LayoutForm>
      )}
    </>
  )
}
