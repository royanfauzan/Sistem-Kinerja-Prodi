import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

export default function daftarkepuasanmhs() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [kepuasanmhs, setkepuasanmhs] = useState([]);

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
        setkepuasanmhs(all_mhs);

        console.log(all_mhs);
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
                <div className="card-header pb-0">
                  <h6>Tabel Kepuasan Mahasiswa</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Prodi
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Tahun
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Keandalan : Buruk
                          </th>
                          
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Keandalan : Cukup
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Keandalan : Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Keandalan : Sangat Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Keandalan : Tindakan Yang Dilakukan
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Daya Tanggap : Buruk
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Daya Tanggap : Cukup
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Daya Tanggap : Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Daya Tanggap : Sangat Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Daya Tanggap : Tindakan Yang Dilakukan
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Kepastian : Buruk
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Kepastian : Cukup
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Kepastian : Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Kepastian : Sangat Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Kepastian : Tindakan Yang Dilakukan
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Empati : Buruk
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Empati : Cukup
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Empati : Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Empati : Sangat Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Empati : Tindakan Yang Dilakukan
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Tangible : Buruk
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Tangible : Cukup
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Tangible : Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Tangible : Sangat Baik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Tangible : Tindakan Yang Dilakukan
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {kepuasanmhs.map((kpsnmhs) => {
                          return (
                            <tr key={`kpsnmhs`+kpsnmhs.id}>
                            
                            <td>
                                <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.prodi.prodi + ' ' + kpsnmhs.prodi.nama_prodi}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tahun}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.keandalan_4}
                                </p>
                              </td>

                             

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.keandalan_3}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.keandalan_2}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.keandalan_1}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_keandalan}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.dayatanggap_4}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.dayatanggap_3}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.dayatanggap_2}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.dayatanggap_1}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_dayatanggap}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.kepastian_4}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.kepastian_3}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.kepastian_2}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.kepastian_1}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_kepastian}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.empati_4}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.empati_3}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.empati_2}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.empati_1}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_empati}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tangible_4}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tangible_3}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tangible_2}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tangible_1}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {kpsnmhs.tl_tangible}
                                </p>
                              </td>
                             
                             
                              <td className="align-middle">
                                <a
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                          );
                        })}
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