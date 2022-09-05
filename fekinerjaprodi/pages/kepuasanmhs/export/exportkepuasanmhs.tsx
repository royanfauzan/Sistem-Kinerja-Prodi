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

export default function kepuasanmahasiswa() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [tampilKepuasanmhs, settampilKepuasanmhs] = useState([]);
  const [dataSelectTahun, setSelectTahun] = useState([]);
  const [dataRole, setRole] = useState("");

  console.log(dataSelectTahun);

  const [Listtahun, setListtahun] = useState([]);

  const handleChangekepuasanMhs = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (options) => options.value
    );
    setListtahun(value);
  };

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/KepuasanMHS_Tahun",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tahunkepuasanmhs } = response.data;
        setListtahun(tahunkepuasanmhs);
        tampildata(tahunkepuasanmhs[0]);

        console.log(tampilKepuasanmhs);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  };

  const handleChangeExportData = (e) => {
    const value = e.target.value;
    tampildata(value);
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
      url: `http://127.0.0.1:8000/api/KepuasanMHS_Export/${tahun}`,
    })
      .then(function (response) {
        const { exportkepuasanmhs } = response.data;
        settampilKepuasanmhs(exportkepuasanmhs);
        console.log(exportkepuasanmhs);
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
                    <div className="col-md-5 pe-0">
                      <div className="row">
                        <div className="col-6">
                          <h6>Pilih Tahun</h6>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={dataSelectTahun}
                              id="tahun"
                              onChange={handleChangeExportData}
                            >
                              {Listtahun.map((dataTahun) => {
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
                          <th rowspan="2">Aspek Yang Diukur</th>
                          <th colspan="4">Tingkat Kepuasan Mahasiswa (%)</th>
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
                            Keandalan (<i data-f-italic="true">reliability</i>):
                            kemampuan dosen, tenaga kependidikan, dan
                            pengelolaan dalam memberikan pelayanan.
                          </p>
                        </td>

                        {tampilKepuasanmhs ? (
                          <>
                            <th>
                              <p className="mb-0 text-sm ">
                                {tampilKepuasanmhs.keandalan_4}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.keandalan_3}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.keandalan_2}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.keandalan_1}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.tl_keandalan}
                              </p>
                            </th>
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
                          <p className="mb-0 text-sm">2</p>
                        </th>
                        <td>
                          <p
                            className="text-start"
                            data-a-wrap="true"
                            data-b-a-s="thin"
                            data-f-sz="10"
                            data-t=""
                          >
                            Daya tanggap (
                            <i data-f-italic="true">responsiveness</i>): kemauan
                            dari dosen, tenaga kependidikan, dan pengelola dalam
                            membantu mahasiswa dan memberikan jasa dengan cepat.
                          </p>
                        </td>
                        {tampilKepuasanmhs ? (
                          <>
                            <th>
                              <p className="mb-0 text-sm ">
                                {tampilKepuasanmhs.dayatanggap_4}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.dayatanggap_3}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.dayatanggap_2}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.dayatanggap_1}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.tl_dayatanggap}
                              </p>
                            </th>
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
                          <p className="mb-0 text-sm">3</p>
                        </th>
                        <td>
                          <p
                            className="text-start"
                            data-a-wrap="true"
                            data-b-a-s="thin"
                            data-f-sz="10"
                            data-t=""
                          >
                            Kepastian (<i data-f-italic="true">assurance</i>):
                            kemampuan dosen, tenaga kependidikan, dan pengelola
                            untuk memberi keyakinan kepada mahasiswa bahwa
                            pelayanan yang diberikan telah sesuai dengan
                            ketentuan.
                          </p>
                        </td>
                        {tampilKepuasanmhs ? (
                          <>
                            <th>
                              <p className="mb-0 text-sm ">
                                {tampilKepuasanmhs.kepastian_4}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.kepastian_3}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.kepastian_2}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.kepastian_1}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.tl_kepastian}
                              </p>
                            </th>
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
                          <p className="mb-0 text-sm">4</p>
                        </th>
                        <td>
                          <p
                            className="text-start"
                            data-a-wrap="true"
                            data-b-a-s="thin"
                            data-f-sz="10"
                            data-t=""
                          >
                            Empati (<i data-f-italic="true">empathy</i>):
                            kesediaan/kepedulian dosen, tenaga kependidikan, dan
                            pengelola untuk memberi perhatian kepada mahasiswa.
                          </p>
                        </td>
                        {tampilKepuasanmhs ? (
                          <>
                            <th>
                              <p className="mb-0 text-sm ">
                                {tampilKepuasanmhs.empati_4}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.empati_3}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.empati_2}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.empati_1}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.tl_empati}
                              </p>
                            </th>
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
                          <p className="mb-0 text-sm">5</p>
                        </th>
                        <td>
                          <p
                            className="text-start"
                            data-a-wrap="true"
                            data-b-a-s="thin"
                            data-f-sz="10"
                            data-t=""
                          >
                            (<i data-f-italic="true">Tangible</i>): penilaian
                            mahasiswa terhadap kecukupan, aksesibitas, kualitas
                            sarana dan prasarana.
                          </p>
                        </td>
                        {tampilKepuasanmhs ? (
                          <>
                            <th>
                              <p className="mb-0 text-sm ">
                                {tampilKepuasanmhs.tangible_4}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.tangible_3}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.tangible_2}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.tangible_1}
                              </p>
                            </th>
                            <th>
                              <p className="mb-0 text-sm">
                                {tampilKepuasanmhs.tl_tangible}
                              </p>
                            </th>
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
                        <th colspan="2">
                          <h6 className="mb-0 text-sm">Jumlah</h6>
                        </th>

                        {tampilKepuasanmhs ? (
                          <>
                            <th>
                              <h6 className="mb-0 text-sm"></h6>
                              {(parseFloat(tampilKepuasanmhs.keandalan_4) +
                                parseFloat(tampilKepuasanmhs.dayatanggap_4) +
                                parseFloat(tampilKepuasanmhs.kepastian_4 )+
                                parseFloat(tampilKepuasanmhs.empati_4 )+
                                parseFloat(tampilKepuasanmhs.tangible_4)).toFixed(2)}
                            </th>
                          </>
                        ) : (
                          <>
                            <td>{0}</td>
                          </>
                        )}

                        {tampilKepuasanmhs ? (
                          <>
                            <th>
                              <h6 className="mb-0 text-sm"></h6>
                              {(parseFloat(tampilKepuasanmhs.keandalan_3) +
                                parseFloat(tampilKepuasanmhs.dayatanggap_3) +
                                parseFloat(tampilKepuasanmhs.kepastian_3 )+
                                parseFloat(tampilKepuasanmhs.empati_3 )+
                                parseFloat(tampilKepuasanmhs.tangible_3)).toFixed(2)}
                            </th>
                          </>
                        ) : (
                          <>
                            <td>{0}</td>
                          </>
                        )}

                        {tampilKepuasanmhs ? (
                          <>
                            <th>
                              <h6 className="mb-0 text-sm"></h6>
                              {(parseFloat(tampilKepuasanmhs.keandalan_2) +
                                parseFloat(tampilKepuasanmhs.dayatanggap_2) +
                                parseFloat(tampilKepuasanmhs.kepastian_2 )+
                                parseFloat(tampilKepuasanmhs.empati_2 )+
                                parseFloat(tampilKepuasanmhs.tangible_2)).toFixed(2)}
                            </th>
                          </>
                        ) : (
                          <>
                            <td>{0}</td>
                          </>
                        )}

                        {tampilKepuasanmhs ? (
                          <>
                            <th>
                              <h6 className="mb-0 text-sm"></h6>
                              {(parseFloat(tampilKepuasanmhs.keandalan_1) +
                                parseFloat(tampilKepuasanmhs.dayatanggap_1) +
                                parseFloat(tampilKepuasanmhs.kepastian_1 )+
                                parseFloat(tampilKepuasanmhs.empati_1 )+
                                parseFloat(tampilKepuasanmhs.tangible_1)).toFixed(2)}
                            </th>
                          </>
                        ) : (
                          <>
                            <td>{0}</td>
                          </>
                        )}
                      </tr>
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