import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from 'next/link';

export default function penerimaanMahasiswa() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [tampilPenerimaan, settampilPenerimaan] = useState([]);

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_penerimaan_mahasiswa",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { Seleksi} = response.data;
        settampilPenerimaan(Seleksi);

        console.log(Seleksi);
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

  const deletePenerimaan = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/delete_penerimaan_mahasiswa/${id}`,
    
    })
    .then(function (response) {
   
      router.reload();    
    })
    .catch(function (err) {
        console.log('gagal');
        console.log(err.response);
    })
   
  };

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
                          Daya Tampung
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Pendaftaran
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                           Lulus Seleksi
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                           Maba Reguler
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Maba Transfer
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                         Mahasiswa Aktif Reguler
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                         Mahasiswa Aktif Transfer
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
                        {tampilPenerimaan.map((tPenerimaan) => {
                          return (
                            <tr key={`tpenerimaan`+tPenerimaan.id}>
                              <td>
                               
                                  <h6 className="mb-0 text-sm">
                                      {tPenerimaan.Tahun_Akademik}
                                    </h6>
                                  
                              </td>
                              <td>
                              <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                    {tPenerimaan.Daya_Tampung}
                                    </h6>
                                   
                                  </div>
                              </td>
                              <td className="align-middle ">
                              <p className="text-xs text-secondary mb-0">
                              {tPenerimaan.Pendaftaran}
                                    </p>
                              </td>
                          
                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                              {tPenerimaan.Lulus_Seleksi}
                                </p>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenerimaan.Maba_Reguler}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenerimaan.Maba_Transfer}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenerimaan.Mahasiswa_Aktif_Reguler}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenerimaan.Mahasiswa_Aktif_Transfer}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenerimaan.prodi.nama_prodi}
                                </p>
                                </span>
                              </td>


                              <td className="align-middle text-center">
                              <Link href={`/MahasiswaBaru_Asing/edit_penerimaan/${tPenerimaan.id}`}>
                              <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">EDIT</button>
                              </Link>
                             
                              <button onClick={() => deletePenerimaan(tPenerimaan.id)} className="btn btn-sm btn-danger border-0 shadow-sm mb-3 me-3">HAPUS</button>
                             
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
