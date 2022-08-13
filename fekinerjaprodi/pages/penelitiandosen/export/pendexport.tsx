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
  const [isLoaded, setisLoaded] = useState(false);
  const [dataSelectTahun, setSelectTahun] = useState(``);

  // console.log(dataSelectTahun);

  const [dataListTahun, setListTahun] = useState([]);
  const [dataPenelitianTs, setPenelitianTs] = useState([]);
  const [dataJmlMandiri, setJmlMandiri] = useState();
  const [dataJmlDalam, setJmlDalam] = useState();
  const [dataJmlLuar, setJmlLuar] = useState();
  const [dataJmlTotal, setJmlTotal] = useState();
  const [dataRole, setRole] = useState('');


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
      url: "http://127.0.0.1:8000/api/penelitianlisttahun",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tahunpenelitians } = response.data;
        setListTahun(tahunpenelitians);
        setSelectTahun(tahunpenelitians[0]);
        tampildata(tahunpenelitians[0]);
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
        const {role} = response.data.user;
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
      url: `http://127.0.0.1:8000/api/laporanpendos/${tahun}`,
    })
      .then(function (response) {
        const {
          penelitian_ts,
          jumlah_mandiri,
          jumlah_dalam,
          jumlah_luar,
          jumlah_total,
        } = response.data;
        setPenelitianTs(penelitian_ts);
        setJmlMandiri(jumlah_mandiri);
        setJmlDalam(jumlah_dalam);
        setJmlLuar(jumlah_luar);
        setJmlTotal(jumlah_total);
        setisLoaded(true);
        console.log(penelitian_ts);
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
                        {dataPenelitianTs && (
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success ms-3"
                            table="tablePenelitianDosen"
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
                        <table id="tablePenelitianDosen" border={1}>
                          <thead>
                            <tr>
                              <td rowSpan={2}>No</td>
                              <td rowSpan={2}>Sumber Pembiayaan</td>
                              <td colSpan={3}>Jumlah Judul Penelitian</td>
                              <td rowSpan={2}>Jumlah</td>
                            </tr>

                            <tr>
                              <td>TS-2</td>
                              <td>TS-1</td>
                              <td>TS</td>
                            </tr>
                          </thead>
                          <tbody>
                            {isLoaded&&(
                              <>
                              <tr>
                              <td>{1}</td>
                              <td>
                                a)Perguruan Tinggi
                                <br/>
                                b)Mandiri
                              </td>
                              <td>{dataPenelitianTs[2].mandiript}</td>
                              <td>{dataPenelitianTs[1].mandiript}</td>
                              <td>{dataPenelitianTs[0].mandiript}</td>
                              <td>{dataJmlMandiri}</td>
                            </tr>
                            <tr>
                              <td>{2}</td>
                              <td>
                                Lembaga Dalam Negri (diluar PT)
                              </td>
                              <td>{dataPenelitianTs[2].dalam}</td>
                              <td>{dataPenelitianTs[1].dalam}</td>
                              <td>{dataPenelitianTs[0].dalam}</td>
                              <td>{dataJmlDalam}</td>
                            </tr>
                            <tr>
                              <td>{3}</td>
                              <td>
                                Lembaga Luar Negri
                              </td>
                              <td>{dataPenelitianTs[2].luar}</td>
                              <td>{dataPenelitianTs[1].luar}</td>
                              <td>{dataPenelitianTs[0].luar}</td>
                              <td>{dataJmlLuar}</td>
                            </tr>
                            <tr>
                              <td colSpan={2}>Jumlah</td>
                              <td>{dataPenelitianTs[2].jumlahts}</td>
                              <td>{dataPenelitianTs[1].jumlahts}</td>
                              <td>{dataPenelitianTs[0].jumlahts}</td>
                              <td>{dataJmlTotal}</td>
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
