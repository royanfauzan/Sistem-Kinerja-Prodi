import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from 'next/link';

export default function daftarprofil() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [tampilKerjasama, settampilKerjasama] = useState([]);

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_kjs",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tampilkerjasama } = response.data;
        settampilKerjasama(tampilkerjasama);

        console.log(tampilkerjasama);
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

  const deleteKjs = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/delete_kjs/${id}`,
    
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
          <div className=" container-fluid py-4">
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
                            Lembaga Mitra
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Tingkat
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Judul Kegiatan Kerjasama
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                           Manfaat Bagi PS Yang Diakreditasi
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                           Waktu dan Durasi
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                         Bukti Kerjasama
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                         Tahun Berakhirnya Kerjasama
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Bidang
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tampilKerjasama.map((tKjs) => {
                          return (
                            <tr key={`tkerjasama`+tKjs.id}>
                              <td>
                               
                                  <h6 className="mb-0 text-sm">
                                      {tKjs.mitra.namamitra}
                                    </h6>
                                  
                              </td>
                              <td>
                              <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                    {tKjs.tingkat}
                                    </h6>
                                   
                                  </div>
                              </td>
                              <td className="align-middle ">
                              <p className="text-xs text-secondary mb-0">
                              {tKjs.judul_kegiatan}
                                    </p>
                              </td>
                          
                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                              {tKjs.manfaat}
                                </p>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tKjs.tanggal_kegiatan}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tKjs.bukti_kerjasama}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tKjs.tahun_berakhir}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                <p className="text-xs font-weight-bold mb-0">
                                {tKjs.mitra.bidang}
                                </p>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                              <Link href={`/kerjasama/edit/${tKjs.id}`}>
                              <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">EDIT</button>
                              </Link>
                             
                              <button onClick={() => deleteKjs(tKjs.id)} className="btn btn-sm btn-danger border-0 shadow-sm mb-3 me-3">HAPUS</button>
                             
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
