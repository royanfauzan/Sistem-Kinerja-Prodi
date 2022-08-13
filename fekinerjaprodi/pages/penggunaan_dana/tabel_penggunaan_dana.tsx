import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FooterUtama from "../../components/Molecule/Footer/FooterUtama"
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama"
import LayoutForm from "../../components/Organism/Layout/LayoutForm"
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama"
import Link from "next/link"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function daftarprofil() {
  const router = useRouter()
  const MySwal = withReactContent(Swal)
  const [stadmin, setStadmin] = useState(false)
  const [tampil_penggunaan_dana, settampilPenggunaanDana] = useState([])

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token")

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


  const deletePenggunaanDana = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // <--
      if (result.isConfirmed) {
        // <-- if confirmed
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
    })
  }
  const tambahDana = () => {
    MySwal.fire({
      title: "Tambah",
      text: "Are you sure? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/penggunaan_dana/insert_penggunaan_dana`)
      }
    })
  }
  const exportDana = () => {
    MySwal.fire({
      title: "EXport",
      text: "Are you sure? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/penggunaan_dana/exportPenggunaanDana/export_dana`)
      }
    })
  }
  const editDana = (id) => {
    MySwal.fire({
      title: "Edit",
      text: "Are you sure? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/penggunaan_dana/edit/${id}`)
      }
    })
  }
  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/read_penggunaan_dana/`
      )
      const res = await req.data.tampil_penggunaan_dana
      settampilPenggunaanDana(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/read_penggunaan_dana/${e.target.value}`
      )
      const res = await req.data.searchdana
      console.log(req.data.searchdana)
      settampilPenggunaanDana(res)
    }
  }
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
                    <div className="col-8">
                      <button
                        onClick={() => tambahDana()}
                        className="btn btn-sm btn-success border-0 shadow-sm  m-0"
                      >
                        Tambah
                      </button>

                      <button
                        onClick={() => exportDana()}
                        className="btn ms-2 btn-sm btn-success border-0 shadow-sm  m-0"
                      >
                        Export
                      </button>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                      <input
                        className="rounded-3"
                        type="text"
                        placeholder="search.."
                        defaultValue=""
                        id="search"
                        onChange={searchdata}
                      />
                    </div>
                  </div>

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

                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5>Biaya Dosen Prodi</h5>
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h5>Biaya Dosen UPPS</h5>
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h5> Biaya Investasi Prasarana Prodi</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Investasi Prasarana UPPS</h5>
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                            <h5> Biaya Investasi Sarana Prodi</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Investasi Sarana UPPS</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Investasi SDM Prodi</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Investasi SDM UPPS</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Operasional Kemahasiswaan Prodi</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Operasional Kemahasiswaan UPPS</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Operasional Pembelajaran Prodi</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Operasional Pembelajaran UPPS</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Operasional Tidak Langsung Prodi</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Operasional Tidak Langsung UPPS</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Tenaga Kependidikan Prodi</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Biaya Tenaga Kependidikan UPPS</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Nama Prodi</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5>Tahun</h5>
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">
                            <h5> Aksi</h5>

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

                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Investasi_Sarana_UPPS
                                    }
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.Biaya_Investasi_SDM_Prodi}
                                  </h6>


                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Investasi_SDM_Prodi}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.Biaya_Investasi_SDM_Prodi}
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.Biaya_Investasi_SDM_UPPS}
                                  </h6>

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Investasi_SDM_UPPS}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.Biaya_Investasi_SDM_UPPS}
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_Prodi}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_Prodi
                                    }
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_UPPS}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_Kemahasiswaan_UPPS
                                    }
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Pembelajaran_Prodi}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_Pembelajaran_Prodi
                                    }
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_Pembelajaran_UPPS}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_Pembelajaran_UPPS
                                    }
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_TidakLangsung_Prodi}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_TidakLangsung_Prodi
                                    }
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Operasional_TidakLangsung_UPPS}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Operasional_TidakLangsung_UPPS
                                    }
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Tenaga_Kependidikan_Prodi}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Tenaga_Kependidikan_Prodi
                                    }
                                  </h6>

                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.Biaya_Tenaga_Kependidikan_UPPS}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {
                                      tPenggunaanDana.Biaya_Tenaga_Kependidikan_UPPS
                                    }
                                  </h6>
                                </span>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.prodi.nama_prodi}
                                  </h6>

                                <p className="text-xs font-weight-bold mb-0">
                                {tPenggunaanDana.prodi.nama_prodi}
                                </p>

                                  <h6 className="mb-0 text-sm">
                                    {tPenggunaanDana.prodi.nama_prodi}
                                  </h6>

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
    )
}
