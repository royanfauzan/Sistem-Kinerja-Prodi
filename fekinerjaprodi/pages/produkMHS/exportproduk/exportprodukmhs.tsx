import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function daftarprodkmhs() {
  const router = useRouter();

  const [stadmin, setStadmin] = useState(false);
  const [produkmhs, setprodukmhs] = useState([]);
  const MySwal = withReactContent(Swal);
  const [dataRole, setRole] = useState("");

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
        const { role } = response.data.user;
        setRole(role);
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

  const tambahproduk = () => {
    MySwal.fire({
      title: "Tambah Data",
      text: "Apakah anda yakin? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/produkMHS/produkmhs`);
      }
    });
  };

  const editproduk = (id) => {
    MySwal.fire({
      title: "Edit Data",
      text: "Apakah kalian yakin? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Iya !",
    }).then((result) => {
      // <--
      if (result.value) {
        // <-- if confirmed
        router.push(`/produkMHS/edit/${id}`);
      }
    });
  };

  const deleteprodukMHS = (id) => {
    MySwal.fire({
      title: "Apakah anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, hapus ini!",
    }).then((result) => {
      // <--
      if (result.isConfirmed) {
        // <-- if confirmed
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
      }
    });
  };

  const searchdata = async (e) => {
    if (e.target.value == "") {
      const req = await axios.get(`http://127.0.0.1:8000/api/ProdukMHS/`);
      const res = await req.data.all_produk;
      setprodukmhs(res);
    } else {
      const req = await axios.get(
        `http://127.0.0.1:8000/api/ProdukMHS_search/${e.target.value}`
      );
      const res = await req.data.searchprodukmhs;
      setprodukmhs(res);
    }
  };

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="col-12">
              <div className="card mb-4">
                <style jsx>{`
                  table,
                  td,
                  th {
                    border: 2px solid !important;
                    text-align: center;
                  }

                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                `}</style>
                <div className="card-header pb-0">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <h6>Authors table</h6>
                    </div>

                    <div className="row justify-content-between mb-4">
                      <div className="col-4">
                        <Link href={`/produkMHS/daftarprodukmhs/`}>
                          <button className=" btn btn-success border-0 shadow-sm ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                            Daftar Tabel
                          </button>
                        </Link>
                      </div>
                      <div className="col-4 d-flex flex-row-reverse">
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button btn btn-success mt-3"
                          table="tableprint"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Export Excel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-3">
                    {
                      <table
                        border="2"
                        className="table align-items-center mb-0"
                        id="tableprint"
                      >
                        <thead>
                          <tr>
                            <th rowspan="2">No</th>
                            <th rowspan="2">Nama Mahasiswa</th>
                            <th rowspan="2">Nama Produk / Jasa</th>
                            <th rowspan="2">Deskripsi Produk / Jasa</th>
                            <th rowspan="2">Bukti</th>
                            <th rowspan="2">Tahun (YYYY)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {produkmhs.map((kpsn, number) => {
                            return (
                              <tr key={`kpsn` + kpsn.id}>
                                <th>
                                  <p className="mb-0 text-sm font-weight-bold">
                                    {number + 1}
                                  </p>
                                </th>

                                <td>
                                  {kpsn.anggota_mahasiswas.map(
                                    (anggota_mahasiswas) => {
                                      return (
                                        <p
                                          className="mb-0 text-sm"
                                          key="anggota.id"
                                        >
                                          {anggota_mahasiswas.nama}
                                        </p>
                                      );
                                    }
                                  )}
                                </td>

                                <th className="align-middle  text-sm">
                                  <p className="text-xs font-weight-bold mb-0">
                                    {kpsn.nama_produk}
                                  </p>
                                </th>

                                <th className="align-middle  text-sm">
                                  <p className="text-xs text-center font-weight-bold mb-0">
                                    {kpsn.deskripsi}
                                  </p>
                                </th>

                                <th className="align-middle  text-sm">
                                  <p className="text-xs text-center font-weight-bold mb-0">
                                    {kpsn.tahun}
                                  </p>
                                </th>

                                <th className="align-middle  text-sm">
                                  <p className="text-xs text-center font-weight-bold mb-0">
                                    {kpsn.deskripsi}
                                  </p>
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    }
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
