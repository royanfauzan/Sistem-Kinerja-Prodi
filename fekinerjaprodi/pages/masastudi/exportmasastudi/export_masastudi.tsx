import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Link from "next/link";

export default function exportmasastudi() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [profilDosen, setprofilDosen] = useState([]);
  const [dataSelectTahun, setSelectTahun] = useState(``);

  // console.log(dataSelectTahun);

  const [dataListTahun, setListTahun] = useState([]);
  const [dataPenelitianTs, setPenelitianTs] = useState([]);
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
      url: "http://127.0.0.1:8000/api/masastudilisttahun",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tahunmasastudis } = response.data;
        setListTahun(tahunmasastudis);
        setSelectTahun(tahunmasastudis[0]);
        tampildata(tahunmasastudis[0]);
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

  const tampildata = (tahun_masuk) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/masastudi/laporan/${tahun_masuk}`,
    })
      .then(function (response) {
        const { masastudi_ts } = response.data;
        setPenelitianTs(masastudi_ts);
        setisLoaded(true);
        console.log(masastudi_ts);
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
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0 mb-3 ms-3 ps-0">
                  <h6>Authors table</h6>
                </div>
                <div className="row">
                  <div className="col-6 mb-2">
                    <td className="align-middle">
                      <Link href={`/masastudi/daftarmasastudi/`}>
                        <button className=" btn btn-primary border-0 shadow-sm ps-3 ms-3 pe-3 ps-3 me-3 mt-3 mb-3">
                          Daftar Tabel
                        </button>
                      </Link>
                    </td>
                  </div>
                  <div className="col-6 d-flex flex-row-reverse">
                      {dataPenelitianTs && (
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button btn btn-success m-3"
                          table="tablePenelitianDosen"
                          filename={`Tabel Masastudi ${dataSelectTahun}`}
                          sheet="3a3"
                          buttonText="Export Excel"
                          border="1"
                        />
                      )}
                    </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="pb-0 mb-0 ms-3">Pilih Tahun</h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-4">
                          <div className="form-group">
                            <select
                              className="form-select ms-3"
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
                      </div>
                    </div>
                  </div>

                  <div className="row mx-3">
                    <div className="col-12 px-0">
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
                            <td rowSpan={2} width={40}>No</td>
                            <td rowSpan={2} width={120}>Tahun Masuk</td>
                            <td rowSpan={2} width={230}>Jumlah Mahasiswa Diterima</td>
                            <td colSpan={4} height={45}>Jumlah Mahasiswa yang Lulus Pada</td>
                            <td rowSpan={2}>Jumlah Lulusan s.d. Akhir TS</td>
                            <td rowSpan={2}>Rata - rata Masa Studi</td>
                          </tr>

                          <tr>
                            <td width={110} height={45}>Akhir TS-4</td>
                            <td width={110} height={45}>Akhir TS-3</td>
                            <td width={110} height={45}>Akhir TS-2</td>
                            <td width={110} height={45}>Akhir TS-1</td>
                          </tr>
                        </thead>
                        <tbody>
                          {isLoaded && (
                            <>
                              <tr>
                                <td>{1}</td>
                                <td>TS-4</td>
                                {dataPenelitianTs[2].masastudits2 ? (
                                  <>
                                    <td>
                                      {dataPenelitianTs[2].masastudits2.jmlh_mhs}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[2].masastudits2.lulus_thn_4}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[2].masastudits2.lulus_thn_3}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[2].masastudits2.lulus_thn_2}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[2].masastudits2.lulus_thn_1}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[2].masastudits2.lulus_thn_1 + dataPenelitianTs[2].masastudits2.lulus_thn_2 + dataPenelitianTs[2].masastudits2.lulus_thn_3}
                                    </td>
                                    <td>
                                    {'3 Tahun'}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                  </>
                                )}
                              </tr>
                              <tr>
                                <td>{2}</td>
                                <td>TS-3</td>
                                {dataPenelitianTs[1].masastudits1 ? (
                                  <>
                                    <td>
                                      {dataPenelitianTs[1].masastudits1.jmlh_mhs}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[1].masastudits1.lulus_thn_4}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[1].masastudits1.lulus_thn_3}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[1].masastudits1.lulus_thn_2}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[1].masastudits1.lulus_thn_1}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[1].masastudits1.lulus_thn_1 + dataPenelitianTs[1].masastudits1.lulus_thn_2 + dataPenelitianTs[1].masastudits1.lulus_thn_3}
                                    </td>
                                    <td>
                                      {'3 Tahun'}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                  </>
                                )}
                              </tr>
                              <tr>
                                <td>{3}</td>
                                <td>TS-2</td>
                                {dataPenelitianTs[0].masastudits0 ? (
                                  <>
                                    <td>
                                      {dataPenelitianTs[0].masastudits0.jmlh_mhs}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[0].masastudits0.lulus_thn_4}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[0].masastudits0.lulus_thn_3}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[0].masastudits0.lulus_thn_2}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[0].masastudits0.lulus_thn_1}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[0].masastudits0.lulus_thn_1 + dataPenelitianTs[0].masastudits0.lulus_thn_2 + dataPenelitianTs[0].masastudits0.lulus_thn_3}
                                    </td>
                                    <td>
                                    {'3 Tahun'}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                  </>
                                )}
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
            <FooterUtama />
          </div>
        </LayoutForm>
      )}
    </>
  );
}
