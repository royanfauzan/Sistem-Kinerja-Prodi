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

export default function exportdtps() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [dataSelectTahun, setSelectTahun] = useState(``);

  // console.log(dataSelectTahun);

  const [dataDTPS, setdataDTPS] = useState([]);
  const [dataListTahun, setListTahun] = useState([]);

  const [tampilMhsAsing, settampilMhsAsing] = useState([]);
  const [dataProdis, setdataProdi] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    setSelectTahun(value);
    tampildata(value);
  };
  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/dtpslisttahun",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tahundtpss } = response.data;
        setListTahun(tahundtpss);
        setSelectTahun(tahundtpss[0].split("/")[1]);
        tampildata(tahundtpss[0].split("/")[1]);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
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
      url: `http://127.0.0.1:8000/api/laporandtps/${tahun}`,
    })
      .then(function (response) {
        const { dtps } = response.data;
        setdataDTPS(dtps);
        console.log(dtps);
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
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                      <h4>DTPS</h4>
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
                                    <option
                                      value={dataTahun.split("/")[1]}
                                      key={dataTahun}
                                    >
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
                        {dataDTPS && (
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success ms-3"
                            table="tableDTPS"
                            filename={`tabelDTPS_TH${dataSelectTahun}`}
                            sheet="3a3"
                            buttonText="Export Excel"
                            border="1"
                          />
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="card-body p-3">
                        <div className="table-responsive p-0">
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
                        <table id="tableDTPS" border={1}>
                          <thead>
                            <tr>
                              <td rowSpan={2}>No</td>
                              <td rowSpan={2}>Nama Dosen</td>
                              <td rowSpan={2}>NIDN/NIDK</td>
                              <td colSpan={2}>Pendidikan Pasca Sarjana</td>
                              <td rowSpan={2}>BidangKeahlian</td>
                              <td rowSpan={2}>
                                Kesesuaian dengan Kompetensi Inti PS
                              </td>
                              <td rowSpan={2}>Jabatan Akademik</td>
                              <td rowSpan={2}>
                                Sertifikat pendidik Profesional
                              </td>
                              <td rowSpan={2}>
                                Sertifikat Kompetensi/ Profesi/Industri
                              </td>
                              <td rowSpan={2}>
                                Mata Kuliah yang Diampu pada PS yang
                                Diakreditasi
                              </td>
                              <td rowSpan={2}>
                                Kesesuaian Bidang Keahlian dengan Mata Kuliah
                                yang Diampu
                              </td>
                              <td rowSpan={2}>
                                Mata Kuliah yang Diampu pada PS Lain
                              </td>
                            </tr>
                            <tr>
                              <td>Magister/Magister Terapan/Spesialis</td>
                              <td>Doktor/Doktor Terapan/Spesialis</td>
                            </tr>
                          </thead>
                          <tbody>
                            {dataDTPS.map((dtps, index) => {
                              const stats = dtps.mengajarUns[0].kesesuaian
                                ? "V"
                                : "";
                              return (
                                <tr key={`tdtps` + dtps.id}>
                                  {/* no */}
                                  <td>{index + 1}</td>
                                  {/* prodi */}
                                  <td>{dtps.NamaDosen}</td>
                                  <td>{dtps.NIDK}</td>
                                  <td>{dtps.pascasarjana.magister}</td>
                                  <td>{dtps.pascasarjana.doktor}</td>
                                  <td>{dtps.detaildosen.bidangKeahlian}</td>
                                  <td>{dtps.detaildosen.kesesuaian}</td>
                                  <td>{dtps.detaildosen.jabatanAkademik}</td>
                                  <td>
                                    <a
                                      href={
                                        `http://127.0.0.1:8000/` +
                                        dtps.detaildosen.fileBukti
                                      }
                                    >
                                      {dtps.detaildosen.noSertifPendidik}
                                    </a>
                                  </td>
                                  <td>
                                    {dtps.detaildosen.serkoms.map((serkom, indx) => {
                                      return (
                                        <>
                                          {`${indx+1}.${serkom.nama_sertifikat}(${serkom.keterangan})`}
                                          <br />
                                        </>
                                      );
                                    })}
                                  </td>
                                  <td>
                                    {dtps.mengajarUns.map((mengajars, indx) => {
                                      return (
                                        <>
                                          {mengajars.matkul.nama_matkul}
                                          <br />
                                        </>
                                      );
                                    })}
                                  </td>
                                  <td>{stats}</td>
                                  <td>
                                    {dtps.mengajarLuar.map(
                                      (mengajarlr, indx) => {
                                        return (
                                          <>
                                            {mengajarlr.matkul.nama_matkul}
                                            <br />
                                          </>
                                        );
                                      }
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        </div>
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
