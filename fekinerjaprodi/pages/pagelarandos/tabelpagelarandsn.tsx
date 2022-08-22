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

export default function tabelpagelaran() {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [stadmin, setStadmin] = useState(false);
  const apiurl = "http://127.0.0.1:8000/"

  const [dataPagelarans, setdataPagelarans] = useState([]);
  const [dataRole, setRole] = useState("");

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/search_pagelarandosdsn/",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { datapagelarans } = response.data;
        setdataPagelarans(datapagelarans);

        console.log(datapagelarans);
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
        pengambilData();

        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 2) {
          return router.push("/pagelarandos/export/exportpagelaran");
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
        return router.push("/dashboard/dashboardadmin");
      });

    
  }, []);

  const deletepagelaran = (id) => {
    MySwal.fire({
      title: "Yakin Hapus Data pagelaran?",
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
          url: `http://127.0.0.1:8000/api/delete_pagelaran/${id}`,
        })
          .then(function (response) {
            const { datapagelarans } = response.data;
            setdataPagelarans(datapagelarans);
          })
          .catch(function (err) {
            console.log("gagal");
            console.log(err.response);
          });
      }
    });
  };
 
  const searchdata = async (e) => {
    const lgToken = localStorage.getItem("token");
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/search_pagelarandosdsn/`, {
        headers: {
          Authorization: `Bearer ${lgToken}`
        }
      });
      const res = await req.data.datapagelarans;
      setdataPagelarans(res);
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/search_pagelarandosdsn/${e.target.value}`, {
          headers: {
            Authorization: `Bearer ${lgToken}`
          }
        }
      );
      const res = await req.data.datapagelarans;
      setdataPagelarans(res);
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
                        <h4>Tabel Pagelaran</h4>
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
                          <Link href={`/pagelarandos/inputpagelarandsn/`}>
                              <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                                Tambah Data
                              </button>
                            </Link>
                            <Link
                              href={`/publikasidos/export/exportpublikasidos`}
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
                        <tr className={`text-center`}>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Nama Peserta
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Judul Kegiatan
                          </th>                          
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Lingkup Pagelaran
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Tahun
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-2">
                            Penyelenggara Pagelaran
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
                        {dataPagelarans.map((pagelaran) => {
                          return (
                            <tr
                              className="text-center"
                              key={`tpagelaran` + pagelaran.id}
                            >
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {pagelaran.anggota_dosens.map((anggota_dosen)=>{
                                    return (<span className={`d-block`} key={anggota_dosen.id+`anggta`}>
                                    {anggota_dosen.NamaDosen}
                                    </span>)
                                  })}
                                </p>
                              </td>
                              <td className="align-middle text-sm" >
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {`${pagelaran.judul.slice(0,40)}...`}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {pagelaran.ruang_lingkup}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {pagelaran.tahun}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                  {`${pagelaran.penyelenggara}`}
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0 pe-3">
                                <a href={`${apiurl+pagelaran.file_bukti}`}>{pagelaran.file_bukti.split("/").slice(-1)[0] }</a>
                                </p>
                              </td>
                              <td className="align-middle pe-3 text-end">
                                <Link href={`/pagelarandos/edit/${pagelaran.id}`}>
                                  <button className="btn btn-sm btn-warning border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deletepagelaran(pagelaran.id)}
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
