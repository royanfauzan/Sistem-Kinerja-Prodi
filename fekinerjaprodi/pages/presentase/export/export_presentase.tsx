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

export default function exporttempat() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [profilDosen, setprofilDosen] = useState([]);
  const [dataSelectTahun, setSelectTahun] = useState(``);

  // console.log(dataSelectTahun);

  const [dataListTahun, setListTahun] = useState([]);
  const [dataPenelitianTs, setPenelitianTs] = useState([]);
  const [dataRole, setRole] = useState("");

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
      url: "http://127.0.0.1:8000/api/presentaselisttahun",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tahunpresentases } = response.data;
        setListTahun(tahunpresentases);
        setSelectTahun(tahunpresentases[0]);
        tampildata(tahunpresentases[0]);
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
      url: `http://127.0.0.1:8000/api/presentase_Export/${tahun}`,
    })
      .then(function (response) {
        const { exportpresentase } = response.data;
        setprofilDosen(exportpresentase);
        console.log(exportpresentase);
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
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Export Kepuasan Mahasiswa</h6>
                    </div>
                    <div className="row"></div>
                    <div className="row justify-content-between mb-4">
                      <div className="col-4">
                        <div className="align-middle">
                          <Link href={`/kepuasanmhs/daftarkepuasanmhs/`}>
                            <button className=" btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                              Daftar Tabel
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-row-reverse">
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button btn btn-success ms-3"
                          table="tabelkepuasanmhs"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Export Excel"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pe-0">
                      <div className="row">
                        <div className="col-6">
                          <h6>Pilih Tahun</h6>
                        </div>

                        <div className="col-md-6 px-0">
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
                      </div>
                    </div>
                  </div>
                </div>
                <style jsx>{`
                  table,
                  td,
                  th {
                    border: 1px solid !important ;
                    text-align: center;
                  }

                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                `}</style>
                <div className="card-body p-3">
                  <div className="table-responsive p-0">
                    <table id="tabelkepuasanmhs" border="1">
                      <thead>
                        <tr>
                          <th width="40px" rowspan="2">
                            No
                          </th>
                          <th rowspan="2">Jenis Kemampuan</th>
                          <th colspan="4">Tingkat Kepuasan Pengguna (%)</th>
                          <th rowspan="2">
                            Rencana Tindak Lanjut oleh UPPS/PS
                          </th>
                        </tr>
                        <tr>
                          <th width="100px">Sangat Baik</th>
                          <th width="100px">Baik</th>
                          <th width="100px">Cukup</th>
                          <th width="100px">Kurang</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <h6 className="mb-0 text-sm">1</h6>
                          </th>
                          <th>
                            <h6 className="mb-0 text-sm">2</h6>
                          </th>
                          <th>
                            <h6 className="mb-0 text-sm">3</h6>
                          </th>
                          <th>
                            <h6 className="mb-0 text-sm">4</h6>
                          </th>
                          <th>
                            <h6 className="mb-0 text-sm">5</h6>
                          </th>
                          <th>
                            <h6 className="mb-0 text-sm">6</h6>
                          </th>
                          <th>
                            <h6 className="mb-0 text-sm">7</h6>
                          </th>
                        </tr>

                        <tr>
                          <th>
                            <p className="mb-0 text-sm">1</p>
                          </th>
                          <td>
                            <p
                              className="text-start"
                              data-a-wrap="true"
                              data-b-a-s="thin"
                              data-f-sz="10"
                              data-t=""
                            >
                              Etika
                            </p>
                          </td>
                          {profilDosen.presentase ? (
                            <>
                              <td>{profilDosen.presentase.etika_4}</td>
                              <td>{profilDosen.presentase.etika_3}</td>
                              <td>{profilDosen.presentase.etika_2}</td>
                              <td>{profilDosen.presentase.etika_1}</td>
                              <td>{profilDosen.presentase.tindak_etika}</td>
                            </>
                          ) : (
                            <>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                            </>
                          )}
                        </tr>

                        <tr>
                          <th>
                            <p className="mb-0 text-sm">1</p>
                          </th>
                          <td>
                            <p
                              className="text-start"
                              data-a-wrap="true"
                              data-b-a-s="thin"
                              data-f-sz="10"
                              data-t=""
                            >
                              Keahlian pada bidang ilmu (kompetensi utama)
                            </p>
                          </td>
                          {profilDosen.presentase ? (
                            <>
                              <td>{profilDosen.presentase.etika_4}</td>
                              <td>{profilDosen.presentase.etika_3}</td>
                              <td>{profilDosen.presentase.etika_2}</td>
                              <td>{profilDosen.presentase.etika_1}</td>
                              <td>{profilDosen.presentase.tindak_etika}</td>
                            </>
                          ) : (
                            <>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                            </>
                          )}
                        </tr>

                        <tr>
                          <th>
                            <p className="mb-0 text-sm">1</p>
                          </th>
                          <td>
                            <p
                              className="text-start"
                              data-a-wrap="true"
                              data-b-a-s="thin"
                              data-f-sz="10"
                              data-t=""
                            >
                              Kemampuan berbahasa asing
                            </p>
                          </td>
                          {profilDosen.presentase ? (
                            <>
                              <td>{profilDosen.presentase.etika_4}</td>
                              <td>{profilDosen.presentase.etika_3}</td>
                              <td>{profilDosen.presentase.etika_2}</td>
                              <td>{profilDosen.presentase.etika_1}</td>
                              <td>{profilDosen.presentase.tindak_etika}</td>
                            </>
                          ) : (
                            <>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                            </>
                          )}
                        </tr>

                        <tr>
                          <th>
                            <p className="mb-0 text-sm">1</p>
                          </th>
                          <td>
                            <p
                              className="text-start"
                              data-a-wrap="true"
                              data-b-a-s="thin"
                              data-f-sz="10"
                              data-t=""
                            >
                              Penggunaan teknologi informasi
                            </p>
                          </td>
                          {profilDosen.presentase ? (
                            <>
                              <td>{profilDosen.presentase.etika_4}</td>
                              <td>{profilDosen.presentase.etika_3}</td>
                              <td>{profilDosen.presentase.etika_2}</td>
                              <td>{profilDosen.presentase.etika_1}</td>
                              <td>{profilDosen.presentase.tindak_etika}</td>
                            </>
                          ) : (
                            <>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                            </>
                          )}
                        </tr>

                        <tr>
                          <th>
                            <p className="mb-0 text-sm">1</p>
                          </th>
                          <td>
                            <p
                              className="text-start"
                              data-a-wrap="true"
                              data-b-a-s="thin"
                              data-f-sz="10"
                              data-t=""
                            >
                              Kemampuan berkomunikasi
                            </p>
                          </td>
                          {profilDosen.presentase ? (
                            <>
                              <td>{profilDosen.presentase.etika_4}</td>
                              <td>{profilDosen.presentase.etika_3}</td>
                              <td>{profilDosen.presentase.etika_2}</td>
                              <td>{profilDosen.presentase.etika_1}</td>
                              <td>{profilDosen.presentase.tindak_etika}</td>
                            </>
                          ) : (
                            <>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                            </>
                          )}
                        </tr>

                        <tr>
                          <th>
                            <p className="mb-0 text-sm">1</p>
                          </th>
                          <td>
                            <p
                              className="text-start"
                              data-a-wrap="true"
                              data-b-a-s="thin"
                              data-f-sz="10"
                              data-t=""
                            >
                              Kerjasama
                            </p>
                          </td>
                          {profilDosen.presentase ? (
                            <>
                              <td>{profilDosen.presentase.etika_4}</td>
                              <td>{profilDosen.presentase.etika_3}</td>
                              <td>{profilDosen.presentase.etika_2}</td>
                              <td>{profilDosen.presentase.etika_1}</td>
                              <td>{profilDosen.presentase.tindak_etika}</td>
                            </>
                          ) : (
                            <>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                            </>
                          )}
                        </tr>

                        <tr>
                          <th>
                            <p className="mb-0 text-sm">1</p>
                          </th>
                          <td>
                            <p
                              className="text-start"
                              data-a-wrap="true"
                              data-b-a-s="thin"
                              data-f-sz="10"
                              data-t=""
                            >
                              Pengembangan diri
                            </p>
                          </td>
                          {profilDosen.presentase ? (
                            <>
                              <td>{profilDosen.presentase.etika_4}</td>
                              <td>{profilDosen.presentase.etika_3}</td>
                              <td>{profilDosen.presentase.etika_2}</td>
                              <td>{profilDosen.presentase.etika_1}</td>
                              <td>{profilDosen.presentase.tindak_etika}</td>
                            </>
                          ) : (
                            <>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                              <td>{0}</td>
                            </>
                          )}
                        </tr>

                        {/* <tr>
                        <th colspan="2">
                          <h6 className="mb-0 text-sm">Jumlah</h6>
                        </th>

                        <th>
                          <h6 className="mb-0 text-sm">{tampilKepuasanmhs.keandalan_4 + tampilKepuasanmhs.dayatanggap_4 + tampilKepuasanmhs.kepastian_4 + tampilKepuasanmhs.empati_4 + tampilKepuasanmhs.tangible_4}</h6>
                        </th>
                        <th>
                          <h6 className="mb-0 text-sm">{tampilKepuasanmhs.keandalan_3 + tampilKepuasanmhs.dayatanggap_3 + tampilKepuasanmhs.kepastian_3 + tampilKepuasanmhs.empati_3 + tampilKepuasanmhs.tangible_3}</h6>
                        </th>
                        <th>
                          <h6 className="mb-0 text-sm">{tampilKepuasanmhs.keandalan_2 + tampilKepuasanmhs.dayatanggap_2 + tampilKepuasanmhs.kepastian_2 + tampilKepuasanmhs.empati_2 + tampilKepuasanmhs.tangible_2}</h6>
                        </th>
                        <th>
                          <h6 className="mb-0 text-sm">{tampilKepuasanmhs.keandalan_1 + tampilKepuasanmhs.dayatanggap_1 + tampilKepuasanmhs.kepastian_1 + tampilKepuasanmhs.empati_1 + tampilKepuasanmhs.tangible_1}</h6>
                        </th>

                      </tr> */}
                      </tbody>
                    </table>
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
