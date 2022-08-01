import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
export default function daftarmatkul() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [matkul, setmatkul] = useState([]);

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Matkul",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_matkul } = response.data;
        setmatkul(all_matkul);

        console.log(all_matkul);
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
                <div className="row justify-content-between">
                  <div className="col-4">
                  <h6>Authors table</h6>
                  </div>
                    <div className="col-4 d-flex flex-row-reverse">
                    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success ms-3"
                    table="tabelmatkul"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export Excel"/>
                    </div>
                  </div>
                </div>

                
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table id="tabelmatkul" className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Nama Mata Kuliah
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            SKS
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {matkul.map((matakuliah) => {
                          return (
                            <tr key={`matakuliah`+matakuliah.id}>
                            
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                {matakuliah.nama_matkul}
                                </p>
                              </td>

                              <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {matakuliah.sks}
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