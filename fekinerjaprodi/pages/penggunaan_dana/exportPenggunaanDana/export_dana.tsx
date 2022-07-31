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

interface Prodi {
  nama_prodi: string
}
// Untuk Ngambil Data Berdasarkan ID
// export async function getServerSideProps(context) {
//   //http request
//   const reqtahun1 = await axios.get(
//     `http://127.0.0.1:8000/api/export_penggunaan_dana/${context.query.tahun1}`
//   )
//   const pgdanath1 = await reqtahun1.data.tampil_ts
//   const danapkmth1 = await reqtahun1.data.dana_pkm
//   const danapenelitianth1 = await reqtahun1.data.dana_penelitian

//   const reqtahun2 = await axios.get(
//     `http://127.0.0.1:8000/api/export_penggunaan_dana/${context.query.tahun2}`
//   )
//   const pgdanath2 = await reqtahun2.data.tampil_ts
//   const danapkmth2 = await reqtahun2.data.dana_pkm
//   const danapenelitianth2 = await reqtahun2.data.dana_penelitian

//   const reqtahun3 = await axios.get(
//     `http://127.0.0.1:8000/api/export_penggunaan_dana/${context.query.tahun3}`
//   )
//   const pgdanath3 = await reqtahun3.data.tampil_ts
//   const danapkmth3 = await reqtahun3.data.dana_pkm
//   const danapenelitianth3 = await reqtahun3.data.dana_penelitian
//   return {
//     props: {
//       ts1: pgdanath1,
//       dnpkm1: danapkmth1,
//       dnpenelitian1: danapenelitianth1,
//       ts2: pgdanath2,
//       dnpkm2: danapkmth2,
//       dnpenelitian2: danapenelitianth2,
//       ts3: pgdanath3,
//       dnpkm3: danapkmth3,
//       dnpenelitian3: danapenelitianth3,
//       // <-- assign response
//     },
//   }
// }
export default function input_mahasiswa_asing(props) {
  const router = useRouter()
  // untuk ngambil data tahun
  // const ts1 = props.ts1
  // const { dnpkm1 } = props
  // const { dnpenelitian1 } = props
  // const ts2 = props.ts2
  // const { dnpkm2 } = props
  // const { dnpenelitian2 } = props
  // const ts3 = props.ts3
  // const { dnpkm3 } = props
  // const { dnpenelitian3 } = props
  // console.log(ts1)
  // console.log(ts2)
  // console.log(ts3)
  const [dataTs1, setDataTs1] = useState([])
  const [dataDnpkm1, setDataDnpkm1] = useState([])
  const [dataDnpenelitian1, setDataDnpenelitian1] = useState([])
  const [dataTs2, setDataTs2] = useState([])
  const [dataDnpkm2, setDataDnpkm2] = useState([])
  const [dataDnpenelitian2, setDataDnpenelitian2] = useState([])
  const [dataTs3, setDataTs3] = useState([])
  const [dataDnpkm3, setDataDnpkm3] = useState([])
  const [dataDnpenelitian3, setDataDnpenelitian3] = useState([])

  const [dataSelectTahun, setSelectTahun] = useState([])

  const [dataError, setError] = useState([])

  // state pake test user
  const [stadmin, setStadmin] = useState(false)
  const [tampildana, setdataDana] = useState([])

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_penggunaan_dana",
    })
      .then(function (response) {
        console.log(response)
        console.log("Sukses")
        const { tampil_penggunaan_dana } = response.data
        setdataDana(tampil_penggunaan_dana)
        console.log(tampildana)
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

  const handleChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (options) => options.value
    )

    setSelectTahun(value)

    // setSelectTahun(value)
  }
  const tampildata = (tahun) => {
    console.log(tahun)
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/export_penggunaan_dana/${tahun}`,
    })
      .then(function (response) {
        const { tampil_ts1 } = response.data
        const { tampil_ts2 } = response.data
        const { tampil_ts3 } = response.data
        setDataTs1(tampil_ts1)
        setDataTs2(tampil_ts2)
        setDataTs3(tampil_ts3)
        const { dana_penelitian1 } = response.data
        const { dana_penelitian2 } = response.data
        const { dana_penelitian3 } = response.data
        setDataDnpenelitian1(dana_penelitian1)
        setDataDnpenelitian2(dana_penelitian2)
        setDataDnpenelitian3(dana_penelitian3)
        const { dana_pkm1 } = response.data
        const { dana_pkm2 } = response.data
        const { dana_pkm3 } = response.data
        setDataDnpkm1(dana_pkm1)
        setDataDnpkm2(dana_pkm2)
        setDataDnpkm3(dana_pkm3)
        console.log(tampil_ts1)
        console.log(tampil_ts2)
        console.log(tampil_ts3)
        console.log(dana_penelitian1)
        console.log(dana_penelitian2)
        console.log(dana_penelitian3)
        console.log(dana_pkm1)
        console.log(dana_pkm2)
        console.log(dana_pkm3)
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
                            multiple
                          >
                            {tampildana.map((datadana) => {
                              return (
                                <option
                                  value={datadana.Tahun}
                                  key={datadana.id}
                                >
                                  {datadana.Tahun}
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
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Authors table</h6>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      <button className="btn btn-sm btn-success border-0 shadow-sm mb-3 me-3">
                        EXPORT
                      </button>
                    </div>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th rowspan="2">No</th>
                      <th rowspan="2" className="w-20">
                        Jenis Penggunaan
                      </th>
                      <th colspan="4">
                        Unit Pengelola Program Studi <br />
                        (Rupiah)
                      </th>
                      <th colspan="4">
                        Program Studi <br />
                        (Rupiah)
                      </th>
                    </tr>
                    <tr>
                      <th>{dataTs3.Tahun}</th>
                      <th>{dataTs2.Tahun}</th>
                      <th>{dataTs1.Tahun}</th>
                      <th>Rata-rata</th>
                      <th>{dataTs3.Tahun}</th>
                      <th>{dataTs2.Tahun}</th>
                      <th>{dataTs1.Tahun}</th>
                      <th>Rata-rata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Biaya Operasional Pendidikan</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>a. Biaya Dosen (Gaji, Honor)</td>
                      <td>{dataTs3.Biaya_Dosen_UPPS}</td>
                      <td>{dataTs2.Biaya_Dosen_UPPS}</td>
                      <td>{dataTs1.Biaya_Dosen_UPPS}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Dosen_UPPS) +
                          parseInt(dataTs2.Biaya_Dosen_UPPS) +
                          parseInt(dataTs1.Biaya_Dosen_UPPS)) /
                          3}
                      </td>
                      <td>{dataTs3.Biaya_Dosen_Prodi}</td>
                      <td>{dataTs2.Biaya_Dosen_Prodi}</td>
                      <td>{dataTs1.Biaya_Dosen_Prodi}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Dosen_Prodi) +
                          parseInt(dataTs2.Biaya_Dosen_Prodi) +
                          parseInt(dataTs1.Biaya_Dosen_Prodi)) /
                          3}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>b. Biaya Tenaga Kependidikan (Gaji, Honor)</td>
                      <td>{dataTs3.Biaya_Tenaga_Kependidikan_UPPS}</td>
                      <td>{dataTs2.Biaya_Tenaga_Kependidikan_UPPS}</td>
                      <td>{dataTs1.Biaya_Tenaga_Kependidikan_UPPS}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Tenaga_Kependidikan_UPPS) +
                          parseInt(dataTs2.Biaya_Tenaga_Kependidikan_UPPS) +
                          parseInt(dataTs1.Biaya_Tenaga_Kependidikan_UPPS)) /
                          3}
                      </td>
                      <td>{dataTs3.Biaya_Tenaga_Kependidikan_Prodi}</td>
                      <td>{dataTs2.Biaya_Tenaga_Kependidikan_Prodi}</td>
                      <td>{dataTs1.Biaya_Tenaga_Kependidikan_Prodi}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Tenaga_Kependidikan_Prodi) +
                          parseInt(dataTs2.Biaya_Tenaga_Kependidikan_Prodi) +
                          parseInt(dataTs1.Biaya_Tenaga_Kependidikan_Prodi)) /
                          3}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        c. Biaya Operasional Pembelajaran (Bahan dan Peralatan
                        Habis Pakai)
                      </td>
                      <td>{dataTs3.Biaya_Operasional_Pembelajaran_UPPS}</td>
                      <td>{dataTs2.Biaya_Operasional_Pembelajaran_UPPS}</td>
                      <td>{dataTs1.Biaya_Operasional_Pembelajaran_UPPS}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(
                          dataTs3.Biaya_Operasional_Pembelajaran_UPPS
                        ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_Pembelajaran_UPPS
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_Pembelajaran_UPPS
                          )) /
                          3}
                      </td>
                      <td>{dataTs3.Biaya_Operasional_Pembelajaran_Prodi}</td>
                      <td>{dataTs2.Biaya_Operasional_Pembelajaran_Prodi}</td>
                      <td>{dataTs1.Biaya_Operasional_Pembelajaran_Prodi}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(
                          dataTs3.Biaya_Operasional_Pembelajaran_Prodi
                        ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_Pembelajaran_Prodi
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_Pembelajaran_Prodi
                          )) /
                          3}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        d. Biaya Operasional Tidak Langsung (Listrik, Gas, Air,
                        Pemeliharaan Gedung, Pemeliharaan Sarana, Uang Lembur,
                        Telekomunikasi, Konsumsi, Transport Lokal, Pajak,
                        Asuransi, dll.)
                      </td>
                      <td>{dataTs3.Biaya_Operasional_TidakLangsung_UPPS}</td>
                      <td>{dataTs2.Biaya_Operasional_TidakLangsung_UPPS}</td>
                      <td>{dataTs1.Biaya_Operasional_TidakLangsung_UPPS}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(
                          dataTs3.Biaya_Operasional_TidakLangsung_UPPS
                        ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_TidakLangsung_UPPS
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_TidakLangsung_UPPS
                          )) /
                          3}
                      </td>
                      <td>{dataTs3.Biaya_Operasional_TidakLangsung_Prodi}</td>
                      <td>{dataTs2.Biaya_Operasional_TidakLangsung_Prodi}</td>
                      <td>{dataTs1.Biaya_Operasional_TidakLangsung_Prodi}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(
                          dataTs3.Biaya_Operasional_TidakLangsung_Prodi
                        ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_TidakLangsung_Prodi
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_TidakLangsung_Prodi
                          )) /
                          3}
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        Biaya operasional kemahasiswaan (penalaran, minat,
                        bakat, dan kesejahteraan).
                      </td>
                      <td>{dataTs3.Biaya_Operasional_Kemahasiswaan_UPPS}</td>
                      <td>{dataTs2.Biaya_Operasional_Kemahasiswaan_UPPS}</td>
                      <td>{dataTs1.Biaya_Operasional_Kemahasiswaan_UPPS}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(
                          dataTs3.Biaya_Operasional_Kemahasiswaan_UPPS
                        ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_Kemahasiswaan_UPPS
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_Kemahasiswaan_UPPS
                          )) /
                          3}
                      </td>
                      <td>{dataTs3.Biaya_Operasional_Kemahasiswaan_Prodi}</td>
                      <td>{dataTs2.Biaya_Operasional_Kemahasiswaan_Prodi}</td>
                      <td>{dataTs1.Biaya_Operasional_Kemahasiswaan_Prodi}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(
                          dataTs3.Biaya_Operasional_Kemahasiswaan_Prodi
                        ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_Kemahasiswaan_Prodi
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_Kemahasiswaan_Prodi
                          )) /
                          3}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Jumlah</td>
                      <td>
                        {parseInt(dataTs3.Biaya_Dosen_UPPS) +
                          parseInt(dataTs3.Biaya_Tenaga_Kependidikan_UPPS) +
                          parseInt(
                            dataTs3.Biaya_Operasional_Pembelajaran_UPPS
                          ) +
                          parseInt(
                            dataTs3.Biaya_Operasional_TidakLangsung_UPPS
                          ) +
                          parseInt(
                            dataTs3.Biaya_Operasional_Kemahasiswaan_UPPS
                          )}
                      </td>
                      <td>
                        {parseInt(dataTs2.Biaya_Dosen_UPPS) +
                          parseInt(dataTs2.Biaya_Tenaga_Kependidikan_UPPS) +
                          parseInt(
                            dataTs2.Biaya_Operasional_Pembelajaran_UPPS
                          ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_TidakLangsung_UPPS
                          ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_Kemahasiswaan_UPPS
                          )}
                      </td>
                      <td>
                        {parseInt(dataTs2.Biaya_Dosen_UPPS) +
                          parseInt(dataTs2.Biaya_Tenaga_Kependidikan_UPPS) +
                          parseInt(
                            dataTs1.Biaya_Operasional_Pembelajaran_UPPS
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_TidakLangsung_UPPS
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_Kemahasiswaan_UPPS
                          )}
                      </td>
                      <td>
                        {(parseInt(dataTs3.Biaya_Dosen_UPPS) +
                          parseInt(dataTs2.Biaya_Dosen_UPPS) +
                          parseInt(dataTs1.Biaya_Dosen_UPPS)) /
                          3 +
                          (parseInt(dataTs3.Biaya_Tenaga_Kependidikan_UPPS) +
                            parseInt(dataTs2.Biaya_Tenaga_Kependidikan_UPPS) +
                            parseInt(dataTs1.Biaya_Tenaga_Kependidikan_UPPS)) /
                            3 +
                          (parseInt(
                            dataTs3.Biaya_Operasional_Pembelajaran_UPPS
                          ) +
                            parseInt(
                              dataTs2.Biaya_Operasional_Pembelajaran_UPPS
                            ) +
                            parseInt(
                              dataTs1.Biaya_Operasional_Pembelajaran_UPPS
                            )) /
                            3 +
                          (parseInt(
                            dataTs3.Biaya_Operasional_TidakLangsung_UPPS
                          ) +
                            parseInt(
                              dataTs2.Biaya_Operasional_TidakLangsung_UPPS
                            ) +
                            parseInt(
                              dataTs1.Biaya_Operasional_TidakLangsung_UPPS
                            )) /
                            3 +
                          (parseInt(
                            dataTs3.Biaya_Operasional_Kemahasiswaan_UPPS
                          ) +
                            parseInt(
                              dataTs2.Biaya_Operasional_Kemahasiswaan_UPPS
                            ) +
                            parseInt(
                              dataTs1.Biaya_Operasional_Kemahasiswaan_UPPS
                            )) /
                            3}
                      </td>
                      {/* PRODI */}
                      <td>
                        {parseInt(dataTs3.Biaya_Dosen_Prodi) +
                          parseInt(dataTs3.Biaya_Tenaga_Kependidikan_Prodi) +
                          parseInt(
                            dataTs3.Biaya_Operasional_Pembelajaran_Prodi
                          ) +
                          parseInt(
                            dataTs3.Biaya_Operasional_TidakLangsung_Prodi
                          ) +
                          parseInt(
                            dataTs3.Biaya_Operasional_Kemahasiswaan_Prodi
                          )}
                      </td>
                      <td>
                        {parseInt(dataTs2.Biaya_Dosen_Prodi) +
                          parseInt(dataTs2.Biaya_Tenaga_Kependidikan_Prodi) +
                          parseInt(
                            dataTs2.Biaya_Operasional_Pembelajaran_Prodi
                          ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_TidakLangsung_Prodi
                          ) +
                          parseInt(
                            dataTs2.Biaya_Operasional_Kemahasiswaan_Prodi
                          )}
                      </td>
                      <td>
                        {parseInt(dataTs2.Biaya_Dosen_Prodi) +
                          parseInt(dataTs2.Biaya_Tenaga_Kependidikan_Prodi) +
                          parseInt(
                            dataTs1.Biaya_Operasional_Pembelajaran_Prodi
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_TidakLangsung_Prodi
                          ) +
                          parseInt(
                            dataTs1.Biaya_Operasional_Kemahasiswaan_Prodi
                          )}
                      </td>
                      <td>
                        {(parseInt(dataTs3.Biaya_Dosen_Prodi) +
                          parseInt(dataTs2.Biaya_Dosen_Prodi) +
                          parseInt(dataTs1.Biaya_Dosen_Prodi)) /
                          3 +
                          (parseInt(dataTs3.Biaya_Tenaga_Kependidikan_Prodi) +
                            parseInt(dataTs2.Biaya_Tenaga_Kependidikan_Prodi) +
                            parseInt(dataTs1.Biaya_Tenaga_Kependidikan_Prodi)) /
                            3 +
                          (parseInt(
                            dataTs3.Biaya_Operasional_Pembelajaran_Prodi
                          ) +
                            parseInt(
                              dataTs2.Biaya_Operasional_Pembelajaran_Prodi
                            ) +
                            parseInt(
                              dataTs1.Biaya_Operasional_Pembelajaran_Prodi
                            )) /
                            3 +
                          (parseInt(
                            dataTs3.Biaya_Operasional_TidakLangsung_Prodi
                          ) +
                            parseInt(
                              dataTs2.Biaya_Operasional_TidakLangsung_Prodi
                            ) +
                            parseInt(
                              dataTs1.Biaya_Operasional_TidakLangsung_Prodi
                            )) /
                            3 +
                          (parseInt(
                            dataTs3.Biaya_Operasional_Kemahasiswaan_Prodi
                          ) +
                            parseInt(
                              dataTs2.Biaya_Operasional_Kemahasiswaan_Prodi
                            ) +
                            parseInt(
                              dataTs1.Biaya_Operasional_Kemahasiswaan_Prodi
                            )) /
                            3}
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Biaya Penelitian</td>
                      <td>{dataDnpenelitian3.dana_PT_Mandiri}</td>
                      <td>{dataDnpenelitian2.dana_PT_Mandiri}</td>
                      <td>{dataDnpenelitian1.dana_PT_Mandiri}</td>
                      {/* rata-rata */}
                      <td>
                        {Math.round(
                          (parseInt(dataDnpenelitian3.dana_PT_Mandiri) +
                            parseInt(dataDnpenelitian2.dana_PT_Mandiri) +
                            parseInt(dataDnpenelitian1.dana_PT_Mandiri)) /
                            3
                        )}
                      </td>
                      <td>{dataDnpenelitian3.dana_PT_Mandiri}</td>
                      <td>{dataDnpenelitian2.dana_PT_Mandiri}</td>
                      <td>{dataDnpenelitian1.dana_PT_Mandiri}</td>
                      {/* rata-rata */}
                      <td>
                        {Math.round(
                          (parseInt(dataDnpenelitian3.dana_PT_Mandiri) +
                            parseInt(dataDnpenelitian2.dana_PT_Mandiri) +
                            parseInt(dataDnpenelitian1.dana_PT_Mandiri)) /
                            3
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Biaya PKM</td>
                      <td>{dataDnpkm3.dana_PT_Mandiri}</td>
                      <td>{dataDnpkm2.dana_PT_Mandiri}</td>
                      <td>{dataDnpkm1.dana_PT_Mandiri}</td>
                      {/* rata-rata */}
                      <td>
                        {Math.round(
                          (parseInt(dataDnpkm3.dana_PT_Mandiri) +
                            parseInt(dataDnpkm2.dana_PT_Mandiri) +
                            parseInt(dataDnpkm3.dana_PT_Mandiri)) /
                            3
                        )}
                      </td>
                      <td>{dataDnpkm3.dana_PT_Mandiri}</td>
                      <td>{dataDnpkm2.dana_PT_Mandiri}</td>
                      <td>{dataDnpkm1.dana_PT_Mandiri}</td>
                      {/* rata-rata */}
                      <td>
                        {Math.round(
                          (parseInt(dataDnpkm3.dana_PT_Mandiri) +
                            parseInt(dataDnpkm2.dana_PT_Mandiri) +
                            parseInt(dataDnpkm3.dana_PT_Mandiri)) /
                            3
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Jumlah</td>
                      <td>
                        {parseInt(dataDnpenelitian3.dana_PT_Mandiri) +
                          parseInt(dataDnpkm3.dana_PT_Mandiri)}
                      </td>
                      <td>
                        {parseInt(dataDnpenelitian2.dana_PT_Mandiri) +
                          parseInt(dataDnpkm2.dana_PT_Mandiri)}
                      </td>
                      <td>
                        {parseInt(dataDnpenelitian1.dana_PT_Mandiri) +
                          parseInt(dataDnpkm1.dana_PT_Mandiri)}
                      </td>
                      <td>
                        {Math.round(
                          (parseInt(dataDnpenelitian3.dana_PT_Mandiri) +
                            parseInt(dataDnpenelitian2.dana_PT_Mandiri) +
                            parseInt(dataDnpenelitian1.dana_PT_Mandiri)) /
                            3 +
                            (parseInt(dataDnpkm3.dana_PT_Mandiri) +
                              parseInt(dataDnpkm2.dana_PT_Mandiri) +
                              parseInt(dataDnpkm3.dana_PT_Mandiri)) /
                              3
                        )}
                      </td>
                      <td>
                        {parseInt(dataDnpenelitian3.dana_PT_Mandiri) +
                          parseInt(dataDnpkm3.dana_PT_Mandiri)}
                      </td>
                      <td>
                        {parseInt(dataDnpenelitian2.dana_PT_Mandiri) +
                          parseInt(dataDnpkm2.dana_PT_Mandiri)}
                      </td>
                      <td>
                        {parseInt(dataDnpenelitian1.dana_PT_Mandiri) +
                          parseInt(dataDnpkm1.dana_PT_Mandiri)}
                      </td>
                      <td>
                        {Math.round(
                          (parseInt(dataDnpenelitian3.dana_PT_Mandiri) +
                            parseInt(dataDnpenelitian2.dana_PT_Mandiri) +
                            parseInt(dataDnpenelitian1.dana_PT_Mandiri)) /
                            3 +
                            (parseInt(dataDnpkm3.dana_PT_Mandiri) +
                              parseInt(dataDnpkm2.dana_PT_Mandiri) +
                              parseInt(dataDnpkm3.dana_PT_Mandiri)) /
                              3
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Biaya Investasi SDM</td>
                      <td>{dataTs3.Biaya_Investasi_SDM_UPPS}</td>
                      <td>{dataTs2.Biaya_Investasi_SDM_UPPS}</td>
                      <td>{dataTs1.Biaya_Investasi_SDM_UPPS}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Investasi_SDM_UPPS) +
                          parseInt(dataTs2.Biaya_Investasi_SDM_UPPS) +
                          parseInt(dataTs1.Biaya_Investasi_SDM_UPPS)) /
                          3}
                      </td>
                      <td>{dataTs3.Biaya_Investasi_SDM_Prodi}</td>
                      <td>{dataTs2.Biaya_Investasi_SDM_Prodi}</td>
                      <td>{dataTs1.Biaya_Investasi_SDM_Prodi}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Investasi_SDM_UPPS) +
                          parseInt(dataTs2.Biaya_Investasi_SDM_UPPS) +
                          parseInt(dataTs1.Biaya_Investasi_SDM_UPPS)) /
                          3}
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Biaya Investasi Sarana</td>
                      <td>{dataTs3.Biaya_Investasi_Sarana_UPPS}</td>
                      <td>{dataTs2.Biaya_Investasi_Sarana_UPPS}</td>
                      <td>{dataTs1.Biaya_Investasi_Sarana_UPPS}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Investasi_Sarana_UPPS) +
                          parseInt(dataTs2.Biaya_Investasi_Sarana_UPPS) +
                          parseInt(dataTs1.Biaya_Investasi_Sarana_UPPS)) /
                          3}
                      </td>
                      <td>{dataTs3.Biaya_Investasi_Sarana_Prodi}</td>
                      <td>{dataTs2.Biaya_Investasi_Sarana_Prodi}</td>
                      <td>{dataTs1.Biaya_Investasi_Sarana_Prodi}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Investasi_Sarana_Prodi) +
                          parseInt(dataTs2.Biaya_Investasi_Sarana_Prodi) +
                          parseInt(dataTs1.Biaya_Investasi_Sarana_Prodi)) /
                          3}
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Biaya Investasi Prasarana</td>
                      <td>{dataTs3.Biaya_Investasi_Prasarana_UPPS}</td>
                      <td>{dataTs2.Biaya_Investasi_Prasarana_UPPS}</td>
                      <td>{dataTs1.Biaya_Investasi_Prasarana_UPPS}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Investasi_Prasarana_UPPS) +
                          parseInt(dataTs2.Biaya_Investasi_Prasarana_UPPS) +
                          parseInt(dataTs1.Biaya_Investasi_Prasarana_UPPS)) /
                          3}
                      </td>
                      <td>{dataTs3.Biaya_Investasi_Prasarana_Prodi}</td>
                      <td>{dataTs2.Biaya_Investasi_Prasarana_Prodi}</td>
                      <td>{dataTs1.Biaya_Investasi_Prasarana_Prodi}</td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Investasi_Prasarana_Prodi) +
                          parseInt(dataTs2.Biaya_Investasi_Prasarana_Prodi) +
                          parseInt(dataTs1.Biaya_Investasi_Prasarana_Prodi)) /
                          3}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Jumlah</td>
                      <td>
                        {parseInt(dataTs3.Biaya_Investasi_SDM_UPPS) +
                          parseInt(dataTs3.Biaya_Investasi_Sarana_UPPS) +
                          parseInt(dataTs3.Biaya_Investasi_Prasarana_UPPS)}
                      </td>
                      <td>
                        {parseInt(dataTs2.Biaya_Investasi_SDM_UPPS) +
                          parseInt(dataTs2.Biaya_Investasi_Sarana_UPPS) +
                          parseInt(dataTs2.Biaya_Investasi_Prasarana_UPPS)}
                      </td>
                      <td>
                        {parseInt(dataTs1.Biaya_Investasi_SDM_UPPS) +
                          parseInt(dataTs1.Biaya_Investasi_Sarana_UPPS) +
                          parseInt(dataTs1.Biaya_Investasi_Prasarana_UPPS)}
                      </td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Investasi_SDM_UPPS) +
                          parseInt(dataTs2.Biaya_Investasi_SDM_UPPS) +
                          parseInt(dataTs1.Biaya_Investasi_SDM_UPPS)) /
                          3 +
                          (parseInt(dataTs3.Biaya_Investasi_Sarana_UPPS) +
                            parseInt(dataTs2.Biaya_Investasi_Sarana_UPPS) +
                            parseInt(dataTs1.Biaya_Investasi_Sarana_UPPS)) /
                            3 +
                          (parseInt(dataTs3.Biaya_Investasi_Prasarana_UPPS) +
                            parseInt(dataTs2.Biaya_Investasi_Prasarana_UPPS) +
                            parseInt(dataTs1.Biaya_Investasi_Prasarana_UPPS)) /
                            3}
                      </td>
                      <td>
                        {parseInt(dataTs2.Biaya_Investasi_SDM_Prodi) +
                          parseInt(dataTs2.Biaya_Investasi_Sarana_Prodi) +
                          parseInt(dataTs2.Biaya_Investasi_Prasarana_Prodi)}
                      </td>
                      <td>
                        {parseInt(dataTs1.Biaya_Investasi_SDM_Prodi) +
                          parseInt(dataTs1.Biaya_Investasi_Sarana_Prodi) +
                          parseInt(dataTs1.Biaya_Investasi_Prasarana_Prodi)}
                      </td>
                      <td>
                        {parseInt(dataTs1.Biaya_Investasi_SDM_Prodi) +
                          parseInt(dataTs1.Biaya_Investasi_Sarana_Prodi) +
                          parseInt(dataTs1.Biaya_Investasi_Prasarana_Prodi)}
                      </td>
                      {/* rata-rata */}
                      <td>
                        {(parseInt(dataTs3.Biaya_Investasi_SDM_Prodi) +
                          parseInt(dataTs2.Biaya_Investasi_SDM_Prodi) +
                          parseInt(dataTs1.Biaya_Investasi_SDM_Prodi)) /
                          3 +
                          (parseInt(dataTs3.Biaya_Investasi_Sarana_Prodi) +
                            parseInt(dataTs2.Biaya_Investasi_Sarana_Prodi) +
                            parseInt(dataTs1.Biaya_Investasi_Sarana_Prodi)) /
                            3 +
                          (parseInt(dataTs3.Biaya_Investasi_Prasarana_Prodi) +
                            parseInt(dataTs2.Biaya_Investasi_Prasarana_Prodi) +
                            parseInt(dataTs1.Biaya_Investasi_Prasarana_Prodi)) /
                            3}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0"></div>
                </div>
              </div>
            </div>
          </div>
        </LayoutForm>
      )}
    </>
  )
}
