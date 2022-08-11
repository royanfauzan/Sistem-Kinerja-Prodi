import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function daftarprodkmhs() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [produkmhs, setprodukmhs] = useState([]);
  const MySwal = withReactContent(Swal)

  const pengambilData = async () => {
    const lgToken = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/ProdukMHS",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_produk } = response.data;
        setprodukmhs(all_produk);

        console.log(all_produk);
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

  const deleteprodukMHS = (id) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/ProdukMHS_Delete/${id}`,
    })
      .then(function (response) {
        router.reload();
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  };

  const searchdata= async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/ProdukMHS/`)
      const res = await req.data.all_produk
      setprodukmhs(res)
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/ProdukMHS_search/${e.target.value}`
      )
      const res = await req.data.searchprodukmhs
      setprodukmhs(res)
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
                  <h6>Tabel Produk Mahasiswa</h6>
                </div>
                <div className="row justify-content-end">
                  <div className="col-3 d-flex flex-row-reverse pe-2">
                    <input
                      className="form-control d-flex flex-row-reverse me-3"
                      type="search"
                      placeholder="Search.."
                      aria-label="Search"
                      defaultValue=""
                      id="search"
                      onChange={searchdata}
                    />
                  </div>
                  </div>
                <div className="row justify-content-between mb-4">
                  <div className="col-4 ms-3">
                    <div className="align-middle">
                      <Link href={`/produkMHS/produkmhs/`}>
                        <button className=" btn btn-primary border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                          Tambah Data
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="table-responsive p-0">
                    <table  className="table align-items-center mb-0 table table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-7 ps-3">
                            NO
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-7 ps-2">
                            Nama Produk
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-7 ps-2">
                            Deskripsi
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-7 ps-2">
                            Tahun
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-7 ps-2">
                            Deskripsi Bukti
                          </th>
                          <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-7 ps-2">
                            File Bukti
                          </th>
                          <th className="text-dark opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {produkmhs.map((prodkmhs, number) => {
                          return (
                            <tr key={`prodkmhs` + prodkmhs.id}>

                              <td className="ps-3">
                                <h6 className="mb-0 text-sm ">{number + 1}</h6>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prodkmhs.nama_produk}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prodkmhs.deskripsi}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prodkmhs.tahun}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prodkmhs.deskripsi_bukti}
                                </p>
                              </td>

                              <td className="align-middle text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {prodkmhs.file_bukti}
                                </p>
                              </td>

                              <td className="align-middle pe-3 text-end">
                                <Link href={`/produkMHS/edit/${prodkmhs.id}`}>
                                  <button className="btn btn-sm btn-primary border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => deleteprodukMHS(prodkmhs.id)}
                                  className="btn btn-sm btn-danger border-0 shadow-sm ps-3 pe-3 mb-2 mt-2"
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
        </LayoutForm>
      )}
    </>
  );
}