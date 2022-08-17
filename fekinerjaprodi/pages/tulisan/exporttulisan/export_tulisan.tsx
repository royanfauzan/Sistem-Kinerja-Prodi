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

export default function daftartulisan() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [profilDosen, setprofilDosen] = useState([]);
  const [allPublikasi, setallPublikasi] = useState();

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");
    const dateSekarang = new Date();
    const tahunSekarang = dateSekarang.getFullYear();

    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/tahun_tulisan/${tahunSekarang}`,
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { data } = response;
        setallPublikasi(data);

        console.log(data);
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

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <style jsx>{`
                  table,
                  td,
                  th {
                    border: 2px solid !important;
                  }

                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                `}</style>
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Authors table</h6>
                    </div>

                    <div className="row justify-content-between mb-4">
                      <div className="col-4">
                        <Link href={`/prestasi/daftarprestasi/`}>
                          <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                            Daftar Tabel
                          </button>
                        </Link>
                      </div>
                      <div className="col-4 d-flex flex-row-reverse">
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button btn btn-success mt-3"
                          table="tableprint"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Export Excel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-3">
                    {
                      <table
                        border="2"
                        className="table align-items-center mb-0"
                        id="tableprint"
                      >
                        <thead>
                          <tr>
                            <th className="text-center" rowspan="2">
                              No
                            </th>
                            <th rowspan="2">Jenis Publikasi</th>
                            <th className="text-center" colspan="3">
                              Jumlah Judul{" "}
                            </th>
                            <th className="text-center" rowspan="2">
                              Jumlah
                            </th>
                          </tr>
                          <tr>
                            <th className="text-center">TS-2</th>
                            <th className="text-center">TS-1</th>
                            <th className="text-center">TS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allPublikasi && (
                            <>
                              <tr>
                                <td className="text-center">{1}</td>
                                <td>Jurnal penelitian tidak terakreditasi</td>
                                {allPublikasi.publikasi_ts[2]
                                  .jurnal_tidak_akreditasi ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .jurnal_tidak_akreditasi
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .jurnal_tidak_akreditasi
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .jurnal_tidak_akreditasi
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.jumlah_publikasi_tidak_akreditasi
                                      }
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>
                              <tr>
                                <td className="text-center">{2}</td>
                                <td>
                                  Jurnal penelitian nasional terakreditasi
                                </td>
                                {allPublikasi.publikasi_ts[2]
                                  .jurnal_nasional ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .jurnal_nasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .jurnal_nasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .jurnal_nasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {allPublikasi.jumlah_publikasi_nasional}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>
                              <tr>
                                <td className="text-center">{3}</td>
                                <td>Jurnal penelitian internasiona</td>
                                {allPublikasi.publikasi_ts[2]
                                  .jurnal_internasional ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .jurnal_internasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .jurnal_internasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .jurnal_internasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.jumlah_publikasi_internasional
                                      }
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>

                              <tr>
                                <td className="text-center">{4}</td>
                                <td>
                                  Jurnal penelitian internasional bereputasi
                                </td>
                                {allPublikasi.publikasi_ts[2]
                                  .jurnal_internasional_bereputasi ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .jurnal_internasional_bereputasi
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .jurnal_internasional_bereputasi
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .jurnal_internasional_bereputasi
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.jumlah_publikasi_internasional_bereputasi
                                      }
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>

                              <tr>
                                <td className="text-center">{5}</td>
                                <td>Seminar wilayah/lokal/perguruan tinggi</td>
                                {allPublikasi.publikasi_ts[2]
                                  .seminar_wilayah ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .seminar_wilayah
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .seminar_wilayah
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .seminar_wilayah
                                      }
                                    </td>
                                    <td className="text-center">
                                      {allPublikasi.jumlah_seminar_wilayah}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>

                              <tr>
                                <td className="text-center">{6}</td>
                                <td>Seminar nasional</td>
                                {allPublikasi.publikasi_ts[2]
                                  .seminar_nasional ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .seminar_nasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .seminar_nasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .seminar_nasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {allPublikasi.jumlah_seminar_nasional}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>

                              <tr>
                                <td className="text-center">{7}</td>
                                <td>Seminar internasional</td>
                                {allPublikasi.publikasi_ts[2]
                                  .seminar_internasional ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .seminar_internasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .seminar_internasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .seminar_internasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.jumlah_seminar_internasional
                                      }
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>

                              <tr>
                                <td className="text-center">{8}</td>
                                <td>Tulisan di media massa wilayah</td>
                                {allPublikasi.publikasi_ts[2]
                                  .pagelaran_wilayah ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .pagelaran_wilayah
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .pagelaran_wilayah
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .pagelaran_wilayah
                                      }
                                    </td>
                                    <td className="text-center">
                                      {allPublikasi.jumlah_pagelaran_wilayah}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>

                              <tr>
                                <td className="text-center">{9}</td>
                                <td>Tulisan di media massa nasional</td>
                                {allPublikasi.publikasi_ts[2]
                                  .pagelaran_nasional ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .pagelaran_nasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .pagelaran_nasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .pagelaran_nasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {allPublikasi.jumlah_pagelaran_nasional}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>
                              <tr>
                                <td className="text-center">{10}</td>
                                <td>Tulisan di media massa internasional</td>
                                {allPublikasi.publikasi_ts[2]
                                  .pagelaran_internasional ? (
                                  <>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[2]
                                          .pagelaran_internasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[1]
                                          .pagelaran_internasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.publikasi_ts[0]
                                          .pagelaran_internasional
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        allPublikasi.jumlah_pagelaran_internasional
                                      }
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>

                              <tr>
                                <td className="text-center" colspan="2">
                                  Jumlah
                                </td>
                                {allPublikasi.publikasi_ts[2] ? (
                                  <>
                                    <td className="text-center">
                                      {allPublikasi.publikasi_ts[2].totalts}
                                    </td>
                                    <td className="text-center">
                                      {allPublikasi.publikasi_ts[1].totalts}
                                    </td>
                                    <td className="text-center">
                                      {allPublikasi.publikasi_ts[0].totalts}
                                    </td>
                                    <td className="text-center">{allPublikasi.jumlah_total}</td>
                                  </>
                                ) : (
                                  <>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                    <td className="text-center">{0}</td>
                                  </>
                                )}
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    }
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
