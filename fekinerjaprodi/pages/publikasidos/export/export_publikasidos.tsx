import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function export_publikasidos() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [dataSelectTahun, setSelectTahun] = useState(``);

  // console.log(dataSelectTahun);

  const [dataListTahun, setListTahun] = useState([]);
  const [dataPublikasiTs, setPublikasiTs] = useState([]);

  const [dataRole, setRole] = useState("");

  //   Set Tahun
  const tanggalSekarang = new Date();
  const tahunSekarang = tanggalSekarang.getFullYear();

  function tahunGenerator(tahun: number, tipe: String, jumlah: number) {
    let counter = -5;
    const tahunPertama =
      tipe == "akademik"
        ? `${tahun + counter - 2}/${tahun + counter - 1}`
        : `${tahun + counter - 1}`;
    const arrTahun = [tahunPertama];
    if (tipe == "akademik") {
      for (let index = 0; index <= jumlah; index++) {
        if (counter > 0) {
          counter++;
          arrTahun.push(`${tahun + counter - 2}/${tahun + counter - 1}`);
        }
        if (counter <= 0) {
          arrTahun.push(`${tahun + counter - 1}/${tahun + counter}`);
          counter++;
        }
      }
    } else {
      for (let index = 0; index <= jumlah; index++) {
        arrTahun.push(`${tahun + counter}`);
        counter++;
      }
    }
    setListTahun(arrTahun);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    setSelectTahun(value);
    tampildata(value);
  };

  const pengambilData = async () => {
    // const lgToken = localStorage.getItem("token");
    tahunGenerator(new Date().getFullYear(), "biasa", 10);
    setSelectTahun(`${new Date().getFullYear()}`);

    tampildata(`${new Date().getFullYear()}`);

    // axios({
    //   method: "get",
    //   url: "http://127.0.0.1:8000/api/penelitianlisttahun",
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     console.log("Sukses");
    //     const { tahunpenelitians } = response.data;
    //     setListTahun(tahunpenelitians);
    //     setSelectTahun(tahunpenelitians[0]);
    //     tampildata(tahunpenelitians[0]);
    //   })
    //   .catch(function (err) {
    //     console.log("gagal");
    //     console.log(err.response);
    //   });
  };

  useEffect(() => {
    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem("token");
    if (!lgToken) {
      router.push("/login");
    }

    // perjalanan validasi token
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_user",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { level_akses } = response.data.user;
        const { role } = response.data.user;
        setRole(role);

        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
          return router.push("/");
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true);
        pengambilData();
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
        return router.push("/");
      });
  }, []);

  const tampildata = (tahun) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/laporanpublikasidos/${tahun}`,
    })
      .then(function (response) {
        const { data } = response;
        setPublikasiTs(data);

        setisLoaded(true);
        console.log(data);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  };

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
                      <h4>Jumlah Penelitian Dosen</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Pilih Tahun</h5>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <div className="form-group">
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                defaultValue={dataSelectTahun}
                                id="tahun"
                                onChange={handleChange}
                              >
                                {dataListTahun.map((dataTahun) => {
                                  return (
                                    <option value={dataTahun} key={dataTahun}>
                                      {dataTahun}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-5 d-flex justify-content-end">
                            <button
                              className="btn btn-primary btn-sm ms-auto"
                              type="submit"
                              onClick={() => tampildata(dataSelectTahun)}
                            >
                              Tampil Data
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 d-flex flex-row-reverse">
                        {dataPublikasiTs && (
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success ms-3"
                            table="tablePenelitianDosen"
                            filename={`tabel_PublikasiIlmiah_TH${dataSelectTahun}`}
                            sheet="3b4-2"
                            buttonText="Export Excel"
                            border="1"
                          />
                        )}
                      </div>
                    </div>
                    <div className="row">
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
                        <table id="tablePenelitianDosen" border={1}>
                          <thead>
                            <tr>
                              <td rowSpan={2}>No</td>
                              <td rowSpan={2}>Jenis Publikasi</td>
                              <td colSpan={3}>Jumlah Judul</td>
                              <td rowSpan={2}>Jumlah</td>
                            </tr>

                            <tr>
                              <td>TS-2</td>
                              <td>TS-1</td>
                              <td>TS</td>
                            </tr>
                          </thead>
                          <tbody>
                            {isLoaded && (
                              <>
                                <tr>
                                  <td>{1}</td>
                                  <td className={`text-start`}>Jurnal penelitian tidak terakreditasi</td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .jurnal_tidak_akreditasi
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .jurnal_tidak_akreditasi
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .jurnal_tidak_akreditasi
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.jumlah_publikasi_tidak_akreditasi
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td>{2}</td>
                                  <td className={`text-start`}>
                                    Jurnal penelitian nasional terakreditasi
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .jurnal_nasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .jurnal_nasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .jurnal_nasional
                                    }
                                  </td>
                                  <td>
                                    {dataPublikasiTs.jumlah_publikasi_nasional}
                                  </td>
                                </tr>
                                <tr>
                                  <td>{3}</td>
                                  <td className={`text-start`}>Jurnal penelitian internasional</td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .jurnal_internasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .jurnal_internasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .jurnal_internasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.jumlah_publikasi_internasional
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td>{4}</td>
                                  <td className={`text-start`}>
                                    Jurnal penelitian internasional Bereputasi
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .jurnal_internasional_bereputasi
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .jurnal_internasional_bereputasi
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .jurnal_internasional_bereputasi
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.jumlah_publikasi_internasional_bereputasi
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td>{5}</td>
                                  <td className={`text-start`}>
                                    Seminar wilayah/lokal/perguruan tinggi
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .seminar_wilayah
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .seminar_wilayah
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .seminar_wilayah
                                    }
                                  </td>
                                  <td>
                                    {dataPublikasiTs.jumlah_seminar_wilayah}
                                  </td>
                                </tr>
                                <tr>
                                  <td>{6}</td>
                                  <td className={`text-start`}>Seminar nasional</td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .seminar_nasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .seminar_nasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .seminar_nasional
                                    }
                                  </td>
                                  <td>
                                    {dataPublikasiTs.jumlah_seminar_nasional}
                                  </td>
                                </tr>
                                <tr>
                                  <td>{7}</td>
                                  <td className={`text-start`}>Seminar Internasional</td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .seminar_internasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .seminar_internasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .seminar_internasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.jumlah_seminar_internasional
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td>{8}</td>
                                  <td className={`text-start`}>
                                    Pagelaran/pameran/presentasi dalam forum di
                                    tingkat wilayah
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .pagelaran_wilayah
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .pagelaran_wilayah
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .pagelaran_wilayah
                                    }
                                  </td>
                                  <td>
                                    {dataPublikasiTs.jumlah_pagelaran_wilayah}
                                  </td>
                                </tr>
                                <tr>
                                  <td>{9}</td>
                                  <td className={`text-start`}>
                                    Pagelaran/pameran/presentasi dalam forum di
                                    tingkat nasional
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .pagelaran_nasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .pagelaran_nasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .pagelaran_nasional
                                    }
                                  </td>
                                  <td>
                                    {dataPublikasiTs.jumlah_pagelaran_nasional}
                                  </td>
                                </tr>
                                <tr>
                                  <td>{10}</td>
                                  <td className={`text-start`}>
                                    Pagelaran/pameran/presentasi dalam forum di
                                    tingkat internasional
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[2]
                                        .pagelaran_internasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[1]
                                        .pagelaran_internasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.publikasi_ts[0]
                                        .pagelaran_internasional
                                    }
                                  </td>
                                  <td>
                                    {
                                      dataPublikasiTs.jumlah_pagelaran_internasional
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={2}>Jumlah</td>
                                  <td>
                                    {dataPublikasiTs.publikasi_ts[2].jml_ts}
                                  </td>
                                  <td>
                                    {dataPublikasiTs.publikasi_ts[1].jml_ts}
                                  </td>
                                  <td>
                                    {dataPublikasiTs.publikasi_ts[0].jml_ts}
                                  </td>
                                  <td>{dataPublikasiTs.jumlah_total}</td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card mb-4"></div>
            </div>
            <FooterUtama />
          </div>
        </LayoutForm>
      )}
    </>
  );
}
