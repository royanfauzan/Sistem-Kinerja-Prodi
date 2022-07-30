import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import TableToExcel from "@linways/table-to-excel";

export default function penerimaanMahasiswa() {
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

  const deletePenerimaan = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/delete_penerimaan_mahasiswa/${id}`,
    })
      .then(function (response) {
        router.reload();
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
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <style jsx>{`
                  table,
                  td,
                  th {
                    border: 1px solid;
                    text-align: center;
                  }

                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                `}</style>
                <table>
                  <thead>
                    <tr>
                      <th rowspan="2">No</th>
                      <th rowspan="2">Lembaga Mitra</th>
                      <th colspan="3">Tingkat</th>
                      <th rowspan="2">Judul Kegiatan Kerjasama</th>
                      <th rowspan="2">Manfaat Bagi PS yang Diakreditasi</th>
                      <th rowspan="2">Waktu dan Durasi</th>
                      <th rowspan="2">Bukti Kerjasama</th>
                      <th rowspan="2">Tahun Berakhirnya Kerjasama</th>
                    </tr>
                    <tr>
                      <th>Internasional</th>
                      <th>Nasional</th>
                      <th>Wilayah/Lokal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tampilKerjasama.map((tKjs, number) => {
                      return (
                        <tr key={`tkerjasama` + tKjs.id}>
                          <td>
                            <h6 className="mb-0 text-sm">{number+1}</h6>
                          </td>

                          <td>
                            <h6 className="mb-0 text-sm">
                              {tKjs.mitra.namamitra}
                            </h6>
                          </td>

                          {tKjs.tingkat == "Internasional" ? (
                            <>
                              {" "}
                              <td>
                                {" "}
                                <h6 className="mb-0 text-sm">internasional </h6>
                              </td>{" "}
                              <td></td> <td> </td>{" "}
                            </>
                          ) : (
                            ""
                          )}
                          {tKjs.tingkat == "Nasional" ? (
                            <>
                              {" "}
                              <td></td>{" "}
                              <td>
                                {" "}
                                <h6 className="mb-0 text-sm">Nasional </h6>
                              </td>{" "}
                              <td> </td>{" "}
                            </>
                          ) : (
                            ""
                          )}
                          {tKjs.tingkat == "Lokal" ? (
                            <>
                              {" "}
                              <td></td> <td> </td>{" "}
                              <td>
                                {" "}
                                <h6 className="mb-0 text-sm">Lokal </h6>
                              </td>
                            </>
                          ) : (
                            ""
                          )}
                          <td className="align-middle ">
                             <h6 className="mb-0 text-sm">
                              {tKjs.judul_kegiatan}
                            </h6>
                          </td>

                          <td className="align-middle text-center text-sm">
                              <h6 className="mb-0 text-sm">
                              {tKjs.manfaat}
                           </h6>
                          </td>
                          <td className="align-middle text-center">
                           
                                <h6 className="mb-0 text-sm">
                                {tKjs.tanggal_kegiatan}
                             </h6>
                           
                          </td>

                          <td className="align-middle text-center">
                           
                                <h6 className="mb-0 text-sm">
                                {tKjs.bukti_kerjasama}
                             </h6>
                           
                          </td>

                          <td className="align-middle text-center">
                           
                                <h6 className="mb-0 text-sm">
                                {tKjs.tahun_berakhir}
                             </h6>
                           
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <FooterUtama />
          </div>
        </LayoutForm>
      )}
    </>
  );
}
