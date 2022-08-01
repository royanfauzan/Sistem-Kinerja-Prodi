<<<<<<< HEAD
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
=======
import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama"
import Link from "next/link"

export default function daftarprofil() {
  const router = useRouter()

  const [stadmin, setStadmin] = useState(false)
  const [tampil_penggunaan_dana, settampilPenggunaanDana] = useState([])

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")
>>>>>>> 616928e (validasi)

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_penggunaan_dana",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
<<<<<<< HEAD
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
=======
        console.log(response)
        console.log("Sukses")
        const { tampil_penggunaan_dana } = response.data
        settampilPenggunaanDana(tampil_penggunaan_dana)

        console.log(tampil_penggunaan_dana)
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
  }

  useEffect(() => {
    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem("token")
    if (!lgToken) {
      router.push("/login")
>>>>>>> 616928e (validasi)
    }

    // perjalanan validasi token
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_user",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
<<<<<<< HEAD
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
=======
        console.log(response)
        console.log("Sukses")
        const { level_akses } = response.data.user
        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
          return router.push("/")
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true)
        pengambilData()
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
        return router.push("/")
      })
  }, [])

  const deletePenggunaanDana = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/delete_penggunaan_dana/${id}`,
    })
      .then(function (response) {
        router.reload()
      })
      .catch(function (err) {
        console.log("gagal")
        console.log(err.response)
      })
  }
>>>>>>> 616928e (validasi)

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
<<<<<<< HEAD
                  <h6>Authors table</h6>
=======
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Authors table</h6>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      <Link href={"/exportPenggunaanDana/selectexport"}>
                        <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">
                          EXPORT
                        </button>
                      </Link>
                    </div>
                  </div>
>>>>>>> 616928e (validasi)
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
<<<<<<< HEAD

=======
>>>>>>> 616928e (validasi)
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Biaya Dosen Prodi
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
<<<<<<< HEAD
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


=======
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

>>>>>>> 616928e (validasi)
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {tampil_penggunaan_dana.map((tPenggunaanDana) => {
                          return (
<<<<<<< HEAD
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
=======
                            <tr
                              key={
                                `tPenggunaanDana` + tampil_penggunaan_dana.id
                              }
                            >
                              <td className="align-middle  text-center text-sm">
                                <h6 className="mb-0 text-sm">
                                  {tPenggunaanDana.Biaya_Dosen_Prodi}
                                </h6>
                              </td>
                              <td className="align-middle text-center text-sm ">
                                <h6 className="mb-0 text-sm">
                                  {tPenggunaanDana.Biaya_Dosen_UPPS}
                                </h6>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <h6 className="mb-0 text-sm">
                                  {
                                    tPenggunaanDana.Biaya_Investasi_Prasarana_Prodi
                                  }
                                </h6>
                              </td>

                              <td className="align-middle text-center text-sm">
                                <h6 className="mb-0 text-sm">
                                  {
                                    tPenggunaanDana.Biaya_Investasi_Prasarana_UPPS
                                  }
                                </h6>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Investasi_Sarana_Prodi
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Investasi_Sarana_UPPS}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Investasi_Sarana_UPPS
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Investasi_SDM_Prodi}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.Biaya_Investasi_SDM_Prodi}
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Investasi_SDM_UPPS}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.Biaya_Investasi_SDM_UPPS}
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_Prodi}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_Prodi
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_UPPS}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_UPPS
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Pembelajaran_Prodi}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_Pembelajaran_Prodi
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Pembelajaran_UPPS}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_Pembelajaran_UPPS
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_TidakLangsung_Prodi}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_TidakLangsung_Prodi
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_TidakLangsung_UPPS}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_TidakLangsung_UPPS
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Tenaga_Kependidikan_Prodi}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Tenaga_Kependidikan_Prodi
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Tenaga_Kependidikan_UPPS}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Tenaga_Kependidikan_UPPS
                                    }
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.prodi.nama_prodi}
                                </p>
=======
                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.prodi.nama_prodi}
                                  </h6>
>>>>>>> 616928e (validasi)
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
<<<<<<< HEAD
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
=======
                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.Tahun}
                                  </h6>
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <Link
                                  href={`/penggunaan_dana/edit/${tPenggunaanDana.id}`}
                                >
                                  <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">
                                    EDIT
                                  </button>
                                </Link>

                                <button
                                  onClick={() =>
                                    deletePenggunaanDana(tPenggunaanDana.id)
                                  }
                                  className="btn btn-sm btn-danger border-0 shadow-sm mb-3 me-3"
                                >
                                  HAPUS
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
>>>>>>> 616928e (validasi)
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
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 616928e (validasi)
}
