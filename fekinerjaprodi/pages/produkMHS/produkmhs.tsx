import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"


export default function inputmhs() {
  const router = useRouter();

  const [userprodukmhss, setuserprodukmhss] = useState([]);
  const [filebukti, setfilebuktis] = useState<File>([]);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);

  const [dataRole, setRole] = useState("");

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/ProdukMHS",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_produk } = response.data;
        setuserprodukmhss(all_produk);
        console.log(all_produk);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  }



  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
  useEffect(() => {
    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem('token');
    if (!lgToken) {
      router.push('/login')
    }

    // perjalanan validasi token 
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_user",
      headers: { "Authorization": `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log('Sukses');
        const { level_akses } = response.data.user;
        const { role } = response.data.user;
        setRole(role);
        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
          return router.push('/');
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true);
        pengambilData();
      })
      .catch(function (err) {
        console.log('gagal');
        console.log(err.response);
        return router.push('/');
      })
  }, []);

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);
  };
  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("nama_produk", event.target.nama_produk.value);
    formData.append("deskripsi", event.target.deskripsi.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("deskripsi_bukti", event.target.deskripsi_bukti.value);
    formData.append("file_bukti", filebukti);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/ProdukMHS",
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data Berhasil Di Input",
        })

        router.push("/produkMHS/daftarprodukmhs")
      })
      .catch(function (error) {
        //handle error
        setError(error.response.data.error)
        console.log(error.response.data.error)
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Gagal Di Input",
        })
        console.log(error.response)
      })
  };

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-8">
                <form id="inputDetailDosen" onSubmit={submitForm}>
                  <div className="card">
                    <div className="card-header pb-0">
                      <div className="d-flex align-items-center">
                        <h6 className="mb-0">Input Data Produk Mahasiswa</h6>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="nama_produk"
                              className={dataError.nama_produk ? "is-invalid" : ""}>
                              Nama Produk
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nama Produk"
                              id="nama_produk"
                            />
                            {dataError.nama_produk ? (
                              <div className="invalid-feedback">
                                {dataError.nama_produk}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="deskripsi"
                              className={dataError.deskripsi ? "is-invalid" : ""}>
                              Deskripsi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Deskripsi"
                              id="deskripsi"
                            />
                            {dataError.deskripsi ? (
                              <div className="invalid-feedback">
                                {dataError.deskripsi}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tahun"
                              className={dataError.tahun ? "is-invalid" : ""}>
                              Tahun
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tahun"
                              id="tahun"
                            />
                            {dataError.tahun ? (
                              <div className="invalid-feedback">
                                {dataError.tahun}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="deskripsi_bukti"
                              className={dataError.deskripsi_bukti ? "is-invalid" : ""}>
                              Deskripsi Bukti
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Deskripsi Bukti"
                              id="deskripsi_bukti"
                            />
                            {dataError.deskripsi_bukti ? (
                              <div className="invalid-feedback">
                                {dataError.deskripsi_bukti}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="file_bukti"
                              className={dataError.file_bukti ? "is-invalid" : ""}>
                              File Bukti
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              onChange={handleChangeFile}
                              id="file_bukti"
                            />
                            {dataError.file_bukti ? (
                              <div className="invalid-feedback">
                                {dataError.file_bukti}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4">
                <CardUtama />
              </div>
            </div>
            <FooterUtama />
          </div>
        </LayoutForm>
      )}
    </>
  );
}
