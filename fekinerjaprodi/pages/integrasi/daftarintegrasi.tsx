import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

export default function daftarintgrs() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [integrasi, setintegrasi] = useState([]);

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Integrasi",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_integrasi } = response.data;
        setintegrasi(all_integrasi);

        console.log(all_integrasi);
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
                  <h6>Tabel Integrasi</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Profil Dosen
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Penelitian
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            PkM
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Mata Kuliah
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Bentuk Integrasi 
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Tahun
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            File Bukti
                          </th>
                          
                         
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {integrasi.map((intgrs) => {
                          return (
                            <tr key={`intgrs`+intgrs.id}>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                {intgrs.profil_dosen.NamaDosen + ' ' + intgrs.profil_dosen.NIK}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                {intgrs.penelitian.tema_sesuai_roadmap + ' ' + intgrs.penelitian.judul}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                {intgrs.pkm.tema_sesuai_roadmap + ' ' + intgrs.pkm.judul_kegiatan}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                {intgrs.matkul.nama_matkul + ' ' + intgrs.matkul.sks}
                                </p>
                              </td>

                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                {intgrs.bentuk_integrasi}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {intgrs.tahun}
                                </p>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {intgrs.file_bukti}
                                </p>
                                </span>
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