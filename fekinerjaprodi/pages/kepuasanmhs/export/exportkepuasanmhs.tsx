import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Link from "next/link";

export default function kepuasanmahasiswa() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [tampilKepuasanmhs, settampilKepuasanmhs] = useState([]);

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/KepuasanMHS",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_mhs } = response.data;
        settampilKepuasanmhs(all_mhs);

        console.log(tampilKepuasanmhs);
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

  // const deletePenerimaan = (id) => {
  //   axios({
  //     method: "post",
  //     url: `http://127.0.0.1:8000/api/delete_penerimaan_mahasiswa/${id}`,
  //   })
  //     .then(function (response) {
  //       router.reload();
  //     })
  //     .catch(function (err) {
  //       console.log("gagal");
  //       console.log(err.response);
  //     });
  // };

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Export Kepuasan Mahasiswa</h6>
                    </div>
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
                          buttonText="Export Excel" />
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
                          <th width="40px" rowspan="2">No</th>
                          <th rowspan="2">Aspek Yang Diukur</th>
                          <th colspan="4">Tingkat Kepuasan Mahasiswa (%)</th>
                          <th rowspan="2">Rencana Tindak Lanjut oleh UPPS/PS</th>
                        </tr>
                        <tr>
                          <th width="100px">Sangat Baik</th>
                          <th width="100px">Baik</th>
                          <th width="100px">Cukup</th>
                          <th width="100px">Kurang</th>
                        </tr>
                      </thead>



                      {tampilKepuasanmhs.map((kepuasanmap) => {
                        {
                          return (
                            <tbody key="aaaaa">
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
                                <th>
                                  <p className="text-start" data-a-wrap="true" data-b-a-s="thin" data-f-sz="10" data-t="">
                                    Keandalan (<i data-f-italic="true">reliability</i>): kemampuan dosen, tenaga kependidikan, dan pengelolaan dalam memberikan pelayanan.
                                  </p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm ">{kepuasanmap.keandalan_4}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.keandalan_3}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.keandalan_2}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.keandalan_1}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.tl_keandalan}</p>
                                </th>
                              </tr>

                              <tr>
                                <th>
                                  <p className="mb-0 text-sm">2</p>
                                </th>
                                <th>
                                  <p className="text-start" data-a-wrap="true" data-b-a-s="thin" data-f-sz="10" data-t="">
                                    Daya tanggap  (<i data-f-italic="true">responsiveness</i>): kemauan dari dosen, tenaga kependidikan, dan pengelola dalam membantu mahasiswa dan memberikan jasa dengan cepat.
                                  </p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.dayatanggap_4}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.dayatanggap_3}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.dayatanggap_2}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.dayatanggap_1}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.tl_dayatanggap}</p>
                                </th>
                              </tr>

                              <tr>
                                <th>
                                  <p className="mb-0 text-sm">3</p>
                                </th>
                                <th>
                                  <p className="text-start" data-a-wrap="true" data-b-a-s="thin" data-f-sz="10" data-t="">
                                    Kepastian  (<i data-f-italic="true">assurance</i>): kemampuan dosen, tenaga kependidikan, dan pengelola untuk memberi keyakinan kepada mahasiswa bahwa pelayanan yang diberikan telah sesuai dengan ketentuan.
                                  </p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.kepastian_4}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.kepastian_3}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.kepastian_2}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.kepastian_1}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.tl_kepastian}</p>
                                </th>
                              </tr>

                              <tr>
                                <th>
                                  <p className="mb-0 text-sm">4</p>
                                </th>
                                <th>
                                  <p className="text-start" data-a-wrap="true" data-b-a-s="thin" data-f-sz="10" data-t="">
                                    Empati  (<i data-f-italic="true">empathy</i>): kesediaan/kepedulian dosen, tenaga kependidikan, dan pengelola untuk memberi perhatian kepada mahasiswa.
                                  </p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.empati_4}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.empati_3}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.empati_2}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.empati_1}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.tl_empati}</p>
                                </th>
                              </tr>

                              <tr>
                                <th>
                                  <p className="mb-0 text-sm">5</p>
                                </th>
                                <th>
                                  <p className="text-start" data-a-wrap="true" data-b-a-s="thin" data-f-sz="10" data-t="">
                                    (<i data-f-italic="true">Tangible</i>): penilaian mahasiswa terhadap kecukupan, aksesibitas, kualitas sarana dan prasarana.
                                  </p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.tangible_4}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.tangible_3}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.tangible_2}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.tangible_1}</p>
                                </th>
                                <th>
                                  <p className="mb-0 text-sm">{kepuasanmap.tl_tangible}</p>
                                </th>
                              </tr>
                              <tr>
                                <th colspan="2">
                                  <h6 className="mb-0 text-sm">Jumlah</h6>
                                </th>
                                
                                <th>
                                  <h6 className="mb-0 text-sm">{kepuasanmap.keandalan_4 + kepuasanmap.dayatanggap_4 + kepuasanmap.kepastian_4 + kepuasanmap.empati_4 + kepuasanmap.tangible_4}</h6>
                                </th>
                                <th>
                                  <h6 className="mb-0 text-sm">{kepuasanmap.keandalan_3 + kepuasanmap.dayatanggap_3 + kepuasanmap.kepastian_3 + kepuasanmap.empati_3 + kepuasanmap.tangible_3}</h6>
                                </th>
                                <th>
                                  <h6 className="mb-0 text-sm">{kepuasanmap.keandalan_2 + kepuasanmap.dayatanggap_2 + kepuasanmap.kepastian_2 + kepuasanmap.empati_2 + kepuasanmap.tangible_2}</h6>
                                </th>
                                <th>
                                  <h6 className="mb-0 text-sm">{kepuasanmap.keandalan_1 + kepuasanmap.dayatanggap_1 + kepuasanmap.kepastian_1 + kepuasanmap.empati_1 + kepuasanmap.tangible_1}</h6>
                                </th>
                                <th>
                                  <h6 className="mb-0 text-sm"></h6>
                                </th>
                              </tr>
                            </tbody>
                          );
                        }
                      })}


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
