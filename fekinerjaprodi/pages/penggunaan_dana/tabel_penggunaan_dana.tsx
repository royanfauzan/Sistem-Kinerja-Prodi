import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

export default function daftarprofil() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [tampil_penggunaan_dana, settampilPenggunaanDana] = useState([]);

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_penggunaan_dana",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tampil_penggunaan_dana} = response.data;
        settampilPenggunaanDana(tampil_penggunaan_dana);

        console.log(tampil_penggunaan_dana);
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
                  <h6>Authors table</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Biaya Dosen Prodi
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                           Biaya Dosen UPPS
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Biaya Investasi Prasarana Prodi
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Biaya Investasi Prasarana UPPS
                          </th>
                        
                         

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Biaya Investasi Sarana Prodi
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Biaya Investasi Sarana UPPS
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Biaya Investasi SDM Prodi
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Biaya Investasi SDM UPPS
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Biaya Operasional Kemahasiswaan Prodi
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Biaya Operasional Kemahasiswaan UPPS
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Biaya Operasional Pembelajaran Prodi
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Biaya Operasional Pembelajaran UPPS
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Biaya Operasional Tidak Langsung Prodi
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Biaya Operasional Tidak Langsung UPPS
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Biaya Tenaga Kependidikan Prodi
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Biaya Tenaga Kependidikan UPPS
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Nama Prodi
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                     Tahun
                          </th>


                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {tampil_penggunaan_dana.map((tPenggunaanDana) => {
                          return (
                            <tr key={`tPenggunaanDana`+tampil_penggunaan_dana.id}>
                              <td>
                               
                                  <h6 className="mb-0 text-sm">
                                      {tPenggunaanDana.Biaya_Dosen_Prodi}
                                    </h6>
                                  
                              </td>
                              <td>
                              <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.Biaya_Dosen_UPPS}
                                    </h6>
                                   
                                  </div>
                              </td>
                              <td className="align-middle ">
                              <p className="text-xs text-secondary mb-0">
                              {tPenggunaanDana.Biaya_Investasi_Prasarana_Prodi}
                                    </p>
                              </td>
                          
                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                              {tPenggunaanDana.Biaya_Investasi_Prasarana_UPPS}
                                </p>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Investasi_Sarana_Prodi}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Investasi_Sarana_UPPS}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Investasi_SDM_Prodi}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Investasi_SDM_UPPS}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_Prodi}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_UPPS}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Pembelajaran_Prodi}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Pembelajaran_UPPS}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_TidakLangsung_Prodi}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_TidakLangsung_UPPS}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Tenaga_Kependidikan_Prodi}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Tenaga_Kependidikan_UPPS}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.prodi.nama_prodi}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Tahun}
                                </p>
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <a
                                  className="text-secondary  font-weight-bold text-xs"
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
