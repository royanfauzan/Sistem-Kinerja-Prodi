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

export default function exporttidaktetap() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);

  const [dataTidakTetap, setdataTidakTetap] = useState([]);
  const [dataListTahun, setListTahun] = useState([]);

  const [tampilMhsAsing, settampilMhsAsing] = useState([]);
  const [dataProdis, setdataProdi] = useState([]);
  const [dataRole, setRole] = useState("");

  const [dataSelectTahun, setSelectTahun] = useState(
    `${new Date().getFullYear()}`
  );

  console.log(dataSelectTahun);
  console.log(`dataSelectTahun`);

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
    const lgToken = localStorage.getItem("token");

    tahunGenerator(new Date().getFullYear(), "akademik", 10);
    tampildata(`${new Date().getFullYear()}`);
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
      url: `http://127.0.0.1:8000/api/laporandosentidaktetap/${tahun}`,
    })
      .then(function (response) {
        const { dosentidaktetap } = response.data;
        setdataTidakTetap(dosentidaktetap);
        console.log(dosentidaktetap);
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
                      <h4>Dosen Tidak Tetap</h4>
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
                                value={dataSelectTahun}
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
                        {dataTidakTetap && (
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success ms-3"
                            table="tableDosenTidakTetap"
                            filename={`tabelDosenTidakTetap_TH${dataSelectTahun}`}
                            sheet="3a4"
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
                          <table id="tableDosenTidakTetap" border={1}>
                            <thead>
                              <tr>
                                <td rowSpan={1}>No</td>
                                <td rowSpan={1}>Nama Dosen</td>
                                <td rowSpan={1}>NIDN/NIDK</td>
                                <td colSpan={1}>Pendidikan Pasca Sarjana</td>
                                <td rowSpan={1}>BidangKeahlian</td>
                                <td rowSpan={1}>Jabatan Akademik</td>
                                <td rowSpan={1}>
                                  Sertifikat pendidik Profesional
                                </td>
                                <td rowSpan={1}>
                                  Sertifikat Kompetensi/ Profesi/Industri
                                </td>
                                <td rowSpan={1}>
                                  Mata Kuliah yang Diampu pada PS yang
                                  Diakreditasi
                                </td>
                                <td rowSpan={1}>
                                  Kesesuaian Bidang Keahlian dengan Mata Kuliah
                                  yang Diampu
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {dataTidakTetap.length?(<>
                                {dataTidakTetap.map((dosentidaktetap, index) => {
                                const stats = dosentidaktetap.mengajarUns[0]
                                  ? dosentidaktetap.mengajarUns[0].kesesuaian
                                    ? "V"
                                    : ""
                                  : "";
                                const penTinggi =
                                  dosentidaktetap.pascasarjana.doktor == "S3"
                                    ? "S3"
                                    : dosentidaktetap.pascasarjana.magister
                                    ? "S2"
                                    : "";
                                return (
                                  <tr key={`tdosentidaktetap` + dosentidaktetap.id}>
                                    {/* no */}
                                    <td>{index + 1}</td>
                                    {/* prodi */}
                                    <td>{dosentidaktetap.NamaDosen}</td>
                                    <td>{dosentidaktetap.NIDK}</td>
                                    <td>{penTinggi}</td>
                                    {dosentidaktetap.detaildosen ? (
                                      <>
                                        <td>
                                          {dosentidaktetap.detaildosen.bidangKeahlian}
                                        </td>
                                      </>
                                    ) : (
                                      <>
                                        <td></td>
                                        
                                      </>
                                    )}
                                    <td>{dosentidaktetap.JabatanAkademik}</td>
                                    {dosentidaktetap.detaildosen ? (
                                      dosentidaktetap.detaildosen.fileBukti ? (
                                        <td>
                                          <a
                                            href={
                                              `http://127.0.0.1:8000/` +
                                              dosentidaktetap.detaildosen.fileBukti
                                            }
                                          >
                                            {dosentidaktetap.detaildosen.noSertifPendidik}
                                          </a>
                                        </td>
                                      ) : (
                                        <td></td>
                                      )
                                    ) : (
                                      <td></td>
                                    )}
                                    <td>
                                      {dosentidaktetap.serkoms.map((serkom, indx) => {
                                        return (
                                          <>
                                            {`${indx + 1}.${
                                              serkom.nama_skema
                                            }/${serkom.nomor_sertifikat}`}
                                            <br />
                                          </>
                                        );
                                      })}
                                    </td>
                                    <td>
                                      {dosentidaktetap.mengajarUns.map(
                                        (mengajars, indx) => {
                                          return (
                                            <>
                                              {mengajars.matkul.nama_matkul}
                                              <br />
                                            </>
                                          );
                                        }
                                      )}
                                    </td>
                                    <td>{stats}</td>
                                  </tr>
                                );
                              })}
                              </>):(<tr><td colSpan={10}>Belum ada Data Tersimpan</td></tr>)}
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
