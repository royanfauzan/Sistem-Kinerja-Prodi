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
  const [tampilMahasiswaAsing, settampilMahasiswaAsing] = useState([]);

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_mahasiswa_asing",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { mahasiswa_asing} = response.data;
        settampilMahasiswaAsing(mahasiswa_asing);

        console.log(mahasiswa_asing);
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
                            Tahun Akademik
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Program Studi
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Mahasiswa Aktif
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                           Mahasiswa Aktif Full Time
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                           Mahasiswa Aktif Part Time
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Nama Prodi
                          </th>

                       
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tampilMahasiswaAsing.map((tAsing) => {
                          return (
                            <tr key={`tasing`+tAsing.id}>
                             
                              <td>
                              <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                    {tAsing.Tahun_Akademik}
                                    </h6>
                                   
                                  </div>
                              </td>
                              <td className="align-middle ">
                              <p className="text-xs text-secondary mb-0">
                              {tAsing.Program_Studi}
                                    </p>
                              </td>
                          
                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                              {tAsing.Mahasiswa_Aktif}
                                </p>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tAsing.Mahasiswa_Aktif_Fulltime}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tAsing.Mahasiswa_Aktif_Parttime}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tAsing.prodi.nama_prodi}
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
