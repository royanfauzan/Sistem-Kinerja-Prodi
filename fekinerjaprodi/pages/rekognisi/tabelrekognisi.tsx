import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function tabelrekognisi() {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [stadmin, setStadmin] = useState(false);
  const apiurl = "http://127.0.0.1:8000/"

  const [dataRekognisis, setdataRekognisis] = useState([]);
  const [dataRole, setRole] = useState("");

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/search_rekognisi",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { datarekognisis } = response.data;
        setdataRekognisis(datarekognisis);

        console.log(datarekognisis);
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
        const { role } = response.data.user;
        setRole(role);

        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
          return router.push("/rekognisi/tabelrekognisidsn");
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true);
        pengambilData();
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
        return router.push("/rekognisi/tabelrekognisidsn");
      });

    
  }, []);

  const deleterekognisi = (id) => {
    MySwal.fire({
      title: "Yakin Hapus Data rekognisi?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak",
      confirmButtonText: "Ya",
    }).then((result) => {
      // <--
      if (result.isConfirmed) {
        // <-- if confirmed
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/delete_rekognisi/${id}`,
        })
          .then(function (response) {
            const { datarekognisis } = response.data;
            setdataRekognisis(datarekognisis);
          })
          .catch(function (err) {
            console.log("gagal");
            console.log(err.response);
          });
      }
    });
  };
 
  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/search_rekognisi/`);
      const res = await req.data.datarekognisis;
      setdataRekognisis(res);
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/search_rekognisi/${e.target.value}`
      );
      const res = await req.data.datarekognisis;
      setdataRekognisis(res);
    }
  };
  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className=" container-fluid pb-4">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="card-header pb-0 px-3">
                    <div className="row">
                      <div className="col-4">
                        <h4>Tabel Rekognisi Dosen</h4>
                      </div>
                    </div>

                    <div className="row justify-content-between mb-4">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-7">
                            <div className="form-group">
                              <input
                                className="form-control d-flex flex-row-reverse me-2 mt-3 mb-0"
                                type="search"
                                placeholder="Search.."
                                aria-label="Search"
                                defaultValue=""
                                id="search"
                                onChange={searchdata}
                              />
                            </div>
                          </div>
                          <div className="col-5 d-flex justify-content-start">
                            <button className=" btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-0 me-3 mt-3 ">
                              Tampil Data
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col-4 d-flex flex-row-reverse">
                            
                          </div>

                          <div className="col-8 d-flex justify-content-end">
                          <Link href={`/rekognisi/inputrekognisi/`}>
                              <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                                Tambah Data
                              </button>
                            </Link>
                            <Link
                              href={`/rekognisi/export/exportrekognisi`}
                            >
                              <button className=" btn btn-outline-success shadow-sm ps-3 ps-3 me-2 mt-3 mb-0">
                                Cek Laporan
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0 mx-4">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Nama Dosen
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Rekognisi
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Bidang
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                          Tahun
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Deskripsi
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                          File Bukti
                          </th>
                          <th className="text-uppercase text-dark text-xs text-center font-weight-bolder opacity-9 ps-2">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataRekognisis.map((rekognisi) => {
                          return (
                            <tr
                              className="text-center"
                              key={`tkerjasama` + rekognisi.id}
                            >
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {rekognisi.profil_dosen.NamaDosen}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {rekognisi.rekognisi}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {rekognisi.bidang}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {rekognisi.tahun}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {rekognisi.deskripsi}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  <a href={`${apiurl+rekognisi.fileBukti}`}>{rekognisi.fileBukti.split("/").slice(-1)[0] }</a>
                                </p>
                              </td>

                              <td className="align-middle pe-3 text-end">
                                <Link href={`/rekognisi/edit/${rekognisi.id}`}>
                                  <button className="btn btn-sm btn-warning border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deleterekognisi(rekognisi.id)}
                                  className="btn btn-sm btn-outline-danger border-0 shadow-sm ps-3 pe-3 mb-2 mt-2"
                                >
                                  Hapus
                                </button>
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
          <Toaster />
        </LayoutForm>
      )}
    </>
  );
}
