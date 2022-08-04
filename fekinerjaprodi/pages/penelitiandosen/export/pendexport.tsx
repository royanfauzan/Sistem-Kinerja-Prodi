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

export default function pendexport() {
  const router = useRouter();

  
  const [stadmin, setStadmin] = useState(false);
  const [dataSelectTahun, setSelectTahun] = useState(``);

  // console.log(dataSelectTahun);

  const [dataEWMP, setdataEWMP] = useState([]);
  const [dataListTahun, setListTahun] = useState([]);

  const [tampilMhsAsing, settampilMhsAsing] = useState([]);
  const [dataProdis, setdataProdi] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value
    console.log(e.target.value)
    setSelectTahun(value);
    tampildata(value);
  };
  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/ewmplisttahun",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tahunewmps } = response.data;
        setListTahun(tahunewmps);
        setSelectTahun(tahunewmps[0].split("/")[1]);
        tampildata(tahunewmps[0].split("/")[1]);
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
      url: `http://127.0.0.1:8000/api/laporanewmp/${tahun}`,
    })
      .then(function (response) {
        const { ewmp } = response.data;
        setdataEWMP(ewmp);
        console.log(ewmp);
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
                      <h4>EWMP</h4>
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
                          {dataEWMP&&(
                              <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="download-table-xls-button btn btn-success ms-3"
                              table="tableEWMP"
                              filename={`tabelEWMP_TH${dataSelectTahun}`}
                              sheet="3a3"
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
                        <table id="tableEWMP" border={1}>
                          <thead>
                            <tr>
                              <td rowSpan={3}>No</td>
                              <td rowSpan={3}>Nama Dosen</td>
                              <td rowSpan={3}>DTPS</td>
                              <td colSpan={6}>
                                Ekuivalen Waktu Mengajar Penuh (EWMP) pada saat
                                TS dalam satuan kredit semester (sks)
                              </td>
                              <td rowSpan={3}>Jumlah</td>
                              <td rowSpan={3}>Rata Rata per semester</td>
                            </tr>
                            <tr>
                              <td colSpan={3}>
                                Pendidikan: Pembelajaran dan Pembimbingan
                              </td>
                              <td rowSpan={2}>Penelitian</td>
                              <td rowSpan={2}>PKM</td>
                              <td rowSpan={2}>Tugas</td>
                            </tr>
                            <tr>
                              <td>Ps Diakreditasi</td>
                              <td>Ps Lain Dalam PT</td>
                              <td>Ps Lain Luar PT</td>
                            </tr>
                          </thead>
                          <tbody>
                            {dataEWMP.map((ewmp, index) => {
                              const dtps = ewmp.dtps ? "v" : "";
                              return (
                                <tr key={`tewmp` + ewmp.id}>
                                  {/* no */}
                                  <td>{index + 1}</td>
                                  {/* prodi */}
                                  <td>{ewmp.profil_dosen.NamaDosen}</td>
                                  <td>{dtps}</td>
                                  <td>{ewmp.sks_ps_akreditasi}</td>
                                  <td>{ewmp.sks_ps_lain_pt}</td>
                                  <td>{ewmp.sks_ps_luar_pt}</td>
                                  <td>{ewmp.sks_penelitian}</td>
                                  <td>{ewmp.sks_pengabdian}</td>
                                  <td>{ewmp.sks_tugas}</td>
                                  <td>{ewmp.total}</td>
                                  <td>{ewmp.avg}</td>
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
