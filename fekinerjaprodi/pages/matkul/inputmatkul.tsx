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

interface Udosen {
  id: number;
  nama_matkul: string;
  sks: number;
  prodi_id: number;
  created_at: string;
  updated_at: string;
}

export default function inputmatkul() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState<Udosen[]>([]);
  const [dataError, setError] = useState([])
  const MySwal = withReactContent(Swal)

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/testuser",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { userdosen } = response.data;
        setuserDosens(userdosen);
        console.log(userdosen);
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



  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("kode_matkul", event.target.kode_matkul.value);
    formData.append("nama_matkul", event.target.nama_matkul.value);
    formData.append("sks", event.target.sks.value);
    formData.append("prodi_id", event.target.prodi_id.value);


    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/Matkul",
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

        router.push("../matkul/daftarmatkul")
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
        <LayoutForm>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-8">
                <form id="inputDetailDosen" onSubmit={submitForm}>
                  <div className="card">
                    <div className="card-header pb-0">
                      <div className="d-flex align-items-center">
                        <h6 className="mb-0">Input Data Mata Kuliah</h6>
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
                            <label
                              htmlFor="kode_matkul"
                              className={
                                dataError.kode_matkul ? "is-invalid" : ""
                              }
                            >
                              Kode Mata Kuliah
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="kode matkul"
                              id="kode_matkul"
                            />
                            {dataError.kode_matkul ? (
                              <div className="invalid-feedback">
                                {dataError.kode_matkul}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="nama_matkul"
                              className={
                                dataError.nama_matkul ? "is-invalid" : ""
                              }>
                              Nama Mata kuliah
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nama Matkul"
                              id="nama_matkul"
                            />
                            {dataError.nama_matkul ? (
                              <div className="invalid-feedback">
                                {dataError.nama_matkul}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="sks"
                              className={
                                dataError.sks ? "is-invalid" : ""
                              }>
                              SKS
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="SKS"
                              id="sks"
                            />
                            {dataError.sks ? (
                              <div className="invalid-feedback">
                                {dataError.sks}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="prodi_id"
                              className={
                                dataError.prodi_id ? "is-invalid" : ""
                              }>
                              Prodi ID
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Prodi ID"
                              id="prodi_id"
                            />
                            {dataError.prodi_id ? (
                              <div className="invalid-feedback">
                                {dataError.prodi_id}
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
