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
        const { Seleksi } = response.data;
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

  const exportExcel = () => {
    TableToExcel.convert(document.getElementById("table1"), {
      name: "table1.xlsx",
      sheet: {
        name: "Sheet 1"
      }
    });
  };

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
              <button onClick={() => exportExcel()} className="btn btn-sm btn-danger border-0 shadow-sm mb-3 me-3">HAPUS</button>
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
                <table id="table1">
                  <thead>
                    <tr>
                      <th rowspan="2">Tahun Akademik</th>
                      <th rowspan="2">Daya Tampung</th>
                      <th colspan="2">Jumlah Calon Mahasiswa</th>
                      <th colspan="2">Jumlah Mahasiswa Baru</th>
                      <th colspan="2">Jumlah Mahasiswa Aktif</th>
                    </tr>
                    <tr>
                      <th>Pendaftar</th>
                      <th>Lulus Seleksi</th>
                      <th>Reguler</th>
                      <th>Transfer</th>
                      <th>Reguler</th>
                      <th>Transfer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tampilPenerimaan.map((tPenerimaan) => {
                      return (
                        <tr key={`tpenerimaan` + tPenerimaan.id}>
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
                          <h6 className="mb-0 text-sm">
                              {tPenerimaan.Pendaftaran}
                           </h6>
                          </td>

                          <td className="align-middle text-center text-sm">
                            <h6 className="mb-0 text-sm">
                              {tPenerimaan.Lulus_Seleksi}
                            </h6>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              <h6 className="mb-0 text-sm">
                                {tPenerimaan.Maba_Reguler}
                              </h6>
                            </span>
                          </td>

                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              <h6 className="mb-0 text-sm">
                                {tPenerimaan.Maba_Transfer}
                              </h6>
                            </span>
                          </td>

                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              <h6 className="mb-0 text-sm">
                                {tPenerimaan.Mahasiswa_Aktif_Reguler}
                              </h6>
                            </span>
                          </td>

                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              <h6 className="mb-0 text-sm">
                                {tPenerimaan.Mahasiswa_Aktif_Transfer}
                              </h6>
                            </span>
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
