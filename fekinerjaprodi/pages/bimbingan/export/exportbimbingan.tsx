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

export default function exportbimbingan() {
  const router = useRouter();

  
  const [stadmin, setStadmin] = useState(false);
  const [dataSelectTahun, setSelectTahun] = useState(``);

  // console.log(dataSelectTahun);

  const [dataBimbingans, setdataBimbingans] = useState([]);
  const [dataListTahun, setListTahun] = useState([]);

  const [tampilMhsAsing, settampilMhsAsing] = useState([]);
  const [dataProdis, setdataProdi] = useState([]);
  
const [dataRole, setRole] = useState('');


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
      url: "http://127.0.0.1:8000/api/bimbinganlisttahun",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tahunbimbingans } = response.data;
        setListTahun(tahunbimbingans);
        setSelectTahun(tahunbimbingans[0].split("/")[1]);
        tampildata(tahunbimbingans[0].split("/")[1]);
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
      url: `http://127.0.0.1:8000/api/laporanbimbingan/${tahun}`,
    })
      .then(function (response) {
        const { list_bimbingan } = response.data;
        setdataBimbingans(list_bimbingan);
        console.log(list_bimbingan);
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
                          {dataBimbingans&&(
                              <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="download-table-xls-button btn btn-success ms-3"
                              table="tableBimbingan"
                              filename={`tabelBimbingan_TH${dataSelectTahun}`}
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
                              <td colSpan={8}>
                                Jumlah Mahasiswa Dibimbing
                              </td>
                              <td rowSpan={3}>Rata-rata Jumlah Bimbingan di semua Program/ Semester</td>
                            </tr>
                            <tr>                    
                              <td colSpan={4}>Pada PS Diakreditasi</td>
                              <td colSpan={4}>Pada PS Lain di PT</td>
                            </tr>
                            <tr>
                              <td>TS-2</td>
                              <td>TS-1</td>
                              <td>TS</td>
                              <td>Rata-Rata</td>
                              <td>TS-2</td>
                              <td>TS-1</td>
                              <td>TS</td>
                              <td>Rata-Rata</td>
                            </tr>
                          </thead>
                          <tbody>
                            {dataBimbingans.map((bimbing, index) => {
                              
                              return (
                                <tr key={`tbimbing` + bimbing.id}>
                                  {/* no */}
                                  <td>{index + 1}</td>
                                  {/* prodi */}
                                  <td>{bimbing.NamaDosen}</td>
                                  <td>{bimbing.listBimbing[2].bimbingan_dalam}</td>
                                  <td>{bimbing.listBimbing[1].bimbingan_dalam}</td>
                                  <td>{bimbing.listBimbing[0].bimbingan_dalam}</td>
                                  <td>{bimbing.avgDalam}</td>
                                  <td>{bimbing.listBimbing[2].bimbingan_luar}</td>
                                  <td>{bimbing.listBimbing[1].bimbingan_luar}</td>
                                  <td>{bimbing.listBimbing[0].bimbingan_luar}</td>
                                  <td>{bimbing.avgLuar}</td> 
                                  <td>{bimbing.avgSemester}</td>
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
