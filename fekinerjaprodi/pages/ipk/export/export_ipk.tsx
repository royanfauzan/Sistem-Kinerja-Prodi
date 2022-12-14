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

export default function daftaripk() {
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
      url: "http://127.0.0.1:8000/api/ipklisttahun",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tahunipks } = response.data;
        setListTahun(tahunipks);
        setSelectTahun(tahunipks[0]);
        tampildata(tahunipks[0]);
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

  const tampildata = (tahun) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/ipk/laporan/${tahun}`,
    })
      .then(function (response) {
        const { penelitian_ts } = response.data;
        setPenelitianTs(penelitian_ts);
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
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0 mb-3 ms-3 ps-0">
                  <h6>Authors table</h6>
                </div>
                <div className="row">
                  <div className="col-6 mb-2">
                    <td className="align-middle">
                      <Link href={`/ipk/daftaripk/`}>
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
                          filename={`Tabel IPK ${dataSelectTahun}`}
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
                            <td rowSpan={2}>No</td>
                            <td rowSpan={2}>Tahun Lulus</td>
                            <td rowSpan={2}>Jumlah Lulusan</td>
                            <td colSpan={3}>Index Prestasi Kumulatif</td>
                          </tr>

                          <tr>
                            <td>Min.</td>
                            <td>Rata-rata</td>
                            <td>Maks</td>
                          </tr>
                        </thead>
                        <tbody>
                          {isLoaded && (
                            <>
                              <tr>
                                <td>{1}</td>
                                <td>TS-2</td>
                                {dataPenelitianTs[2].ipkts2 ? (
                                  <>
                                    <td>
                                      {dataPenelitianTs[2].ipkts2.jmlh_lulusan}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[2].ipkts2.ipk_min}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[2].ipkts2.ipk_avg}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[2].ipkts2.ipk_max}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                  </>
                                )}
                              </tr>
                              <tr>
                                <td>{2}</td>
                                <td>TS-1</td>
                                {dataPenelitianTs[1].ipkts1 ? (
                                  <>
                                    <td>
                                      {dataPenelitianTs[1].ipkts1.jmlh_lulusan}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[1].ipkts1.ipk_min}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[1].ipkts1.ipk_avg}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[1].ipkts1.ipk_max}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                  </>
                                )}
                              </tr>
                              <tr>
                                <td>{3}</td>
                                <td>TS</td>
                                {dataPenelitianTs[0].ipkts0 ? (
                                  <>
                                    <td>
                                      {dataPenelitianTs[0].ipkts0.jmlh_lulusan}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[0].ipkts0.ipk_min}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[0].ipkts0.ipk_avg}
                                    </td>
                                    <td>
                                      {dataPenelitianTs[0].ipkts0.ipk_max}
                                    </td>
                                  </>
                                ) : (
                                  <>
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
