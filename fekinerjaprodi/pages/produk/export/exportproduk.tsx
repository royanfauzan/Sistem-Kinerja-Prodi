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

export default function exportproduk() {
  const router = useRouter();
  const apiurl = "http://127.0.0.1:8000/";

  const [stadmin, setStadmin] = useState(false);

  const [dataProduks, setdataProduks] = useState([]);
  const [dataListTahun, setListTahun] = useState([]);

  const [tampilMhsAsing, settampilMhsAsing] = useState([]);
  const [dataProdis, setdataProdi] = useState([]);
  const [dataRole, setRole] = useState("");

  const [dataSelectTahun, setSelectTahun] = useState(
    `${new Date().getFullYear()}`
  );

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

    tahunGenerator(new Date().getFullYear(), "biasa", 10);
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
      url: `http://127.0.0.1:8000/api/laporanprodukth/${tahun}`,
    })
      .then(function (response) {
        const { all_produk } = response.data;

        setdataProduks(all_produk);
        console.log(all_produk);
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
                      <h4>Produk DTPS yang Diadopsi Masyarakat</h4>
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
                        {dataProduks && (
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success ms-3"
                            table="tableProdukDiadopsi"
                            filename={`tabelProdukDiadopsi_TH${dataSelectTahun}`}
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
                          <table id="tableProdukDiadopsi" border={1}>
                            <thead>
                              <tr>
                                <td rowSpan={1}>No</td>
                                <td rowSpan={1}>Nama Dosen</td>
                                <td rowSpan={1}>Nama Produk/Jasa </td>
                                <td rowSpan={1}>Deskripsi</td>
                                <td rowSpan={1}>Bukti</td>
                                <td rowSpan={1}>Tahun</td>
                              </tr>
                            </thead>
                            <tbody>
                              {dataProduks.length ? (
                                <>
                                  {dataProduks.map((produk, index) => {
                                    return (
                                      <tr key={`tproduk` + produk.id}>
                                        {/* no */}
                                        <td>{index + 1}</td>
                                        {/* prodi */}
                                        <td>
                                          {produk.anggota_dosens.map(
                                            (anggota_dosen, idx) => {
                                              return (
                                                <span
                                                  className={`d-block`}
                                                  key={
                                                    anggota_dosen.id + `anggta`
                                                  }
                                                >
                                                  {`${idx + 1}. ${
                                                    anggota_dosen.NamaDosen
                                                  },`}
                                                </span>
                                              );
                                            }
                                          )}
                                        </td>
                                        <td>{`${produk.nm_produk}`}</td>
                                        <td>
                                          <p className={"text-wrap"}>
                                            {produk.deskripsi}
                                          </p>
                                        </td>
                                        <td>
                                          <a href={apiurl + produk.file_bukti}>
                                            {produk.deskripsi_bukti}
                                          </a>
                                        </td>
                                        <td>{produk.tahun}</td>
                                      </tr>
                                    );
                                  })}
                                </>
                              ) : (
                                <tr>
                                  <td colSpan={4}>Belum Ada Catatan Data</td>
                                </tr>
                              )}
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
