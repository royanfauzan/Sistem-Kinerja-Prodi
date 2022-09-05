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

export default function pkmdexport() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  

  // console.log(dataSelectTahun);

  const [dataListTahun, setListTahun] = useState([]);
  const [dataPengabdianTs, setPengabdianTs] = useState([]);
  const [dataJmlMandiri, setJmlMandiri] = useState();
  const [dataJmlDalam, setJmlDalam] = useState();
  const [dataJmlLuar, setJmlLuar] = useState();
  const [dataJmlTotal, setJmlTotal] = useState();
  const [dataRole, setRole] = useState("");

  const [dataSelectTahun, setSelectTahun] = useState(`${new Date().getFullYear()}`);

  console.log(dataSelectTahun);
  console.log(`dataSelectTahun`);

  const tanggalSekarang = new Date();
  const tahunSekarang = tanggalSekarang.getFullYear();


 function tahunGenerator(tahun:number,tipe:String,jumlah:number) {
   let counter = -5;
   const tahunPertama = tipe=='akademik'?(`${tahun+counter-2}/${tahun+counter-1}`):`${tahun+counter-1}`;
   const arrTahun =[tahunPertama];
   if(tipe=='akademik'){
    for (let index = 0; index <= jumlah; index++) {
      if(counter>0){
        counter++;
        arrTahun.push((`${tahun+counter-2}/${tahun+counter-1}`));
      }
      if(counter<=0){
        arrTahun.push((`${tahun+counter-1}/${tahun+counter}`));
        counter++;
      }
      
    }
   }else{
    for (let index = 0; index <= jumlah; index++) {
      arrTahun.push((`${tahun+counter}`));
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

    tahunGenerator(new Date().getFullYear(),'biasa',10);
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
      url: `http://127.0.0.1:8000/api/laporanpkmdos/${tahun}`,
    })
      .then(function (response) {
        const {
          pengabdian_ts,
          jumlah_mandiri,
          jumlah_dalam,
          jumlah_luar,
          jumlah_total,
        } = response.data;
        setPengabdianTs(pengabdian_ts);
        setJmlMandiri(jumlah_mandiri);
        setJmlDalam(jumlah_dalam);
        setJmlLuar(jumlah_luar);
        setJmlTotal(jumlah_total);
        setisLoaded(true);
        console.log(pengabdian_ts);
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
                      <h4>Jumlah Pengabdian Dosen</h4>
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
                        {dataPengabdianTs && (
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success ms-3"
                            table="tablePengabdianDosen"
                            filename={`tabelEWMP_TH${dataSelectTahun}`}
                            sheet="3b3"
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
                        <table id="tablePengabdianDosen" border={1}>
                          <thead>
                            <tr>
                              <td rowSpan={2}>No</td>
                              <td rowSpan={2}>Sumber Pembiayaan</td>
                              <td colSpan={3}>Jumlah Judul Pengabdian</td>
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
                              <td>{dataPengabdianTs[2].mandiript}</td>
                              <td>{dataPengabdianTs[1].mandiript}</td>
                              <td>{dataPengabdianTs[0].mandiript}</td>
                              <td>{dataJmlMandiri}</td>
                            </tr>
                            <tr>
                              <td>{2}</td>
                              <td>
                                Lembaga Dalam Negri (diluar PT)
                              </td>
                              <td>{dataPengabdianTs[2].dalam}</td>
                              <td>{dataPengabdianTs[1].dalam}</td>
                              <td>{dataPengabdianTs[0].dalam}</td>
                              <td>{dataJmlDalam}</td>
                            </tr>
                            <tr>
                              <td>{3}</td>
                              <td>
                                Lembaga Luar Negri
                              </td>
                              <td>{dataPengabdianTs[2].luar}</td>
                              <td>{dataPengabdianTs[1].luar}</td>
                              <td>{dataPengabdianTs[0].luar}</td>
                              <td>{dataJmlLuar}</td>
                            </tr>
                            <tr>
                              <td colSpan={2}>Jumlah</td>
                              <td>{dataPengabdianTs[2].jumlahts}</td>
                              <td>{dataPengabdianTs[1].jumlahts}</td>
                              <td>{dataPengabdianTs[0].jumlahts}</td>
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
