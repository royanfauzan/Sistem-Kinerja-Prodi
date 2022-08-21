import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export default function inputwaktu() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);
  const [dataRole, setRole] = useState('');

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/kepuasan",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_prodi } = response.data;
        setuserDosens(all_prodi);
        console.log(all_prodi);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  }

  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
  useEffect(()=>{
    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem('token');
    if(!lgToken){
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
            const {level_akses} = response.data.user;
            const { role } = response.data.user;
            setRole(role);
            // kalo ga admin dipindah ke halaman lain
            if(level_akses !== 3){
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
  },[]);



  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("kepuasan_id", event.target.kepuasan.value);
    formData.append("jmlh_lls_dipesan", event.target.dipesan.value);
    formData.append("jmlh_tunggu_lls_3bln", event.target.tiga.value);
    formData.append("jmlh_tunggu_lls_6bln", event.target.enam.value);
    formData.append("jmlh_tunggu_lls_lebih_6bln", event.target.enamlebih.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/waktutunggu",
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
      });

      router.push("../waktutunggu/daftarwaktu");
    })

    .catch(function (error) {
      //handle error
      setError(error.response.data.error);
      console.log(error.response.data.error);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Data Gagal Di Input",
      });
      console.log(error.response);
    });
  };

  return (
    <>
    <LoadingUtama loadStatus={stadmin}/>
      {stadmin  &&(
        <LayoutForm rlUser={dataRole}>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-md-8">
              <form id="inputDetilDosen" onSubmit={submitForm}>
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                      <p className="mb-0">Input Data</p>
                      <button
                        className="btn btn-primary btn-sm ms-auto"
                        type="submit"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-uppercase text-sm">Prestasi Mahasiswa</p>
                    <div className="row">
                    <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="kepuasan"
                              className={
                                dataError.kepuasan_id ? "is-invalid" : ""
                              }
                            >
                              Tahun Kepuasan
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="kepuasan"
                            >
                              <option value="">Pilih Tahun Kepuasan</option>
                              {userDosens.map((userkepuasan) => {
                                return (
                                  <option
                                    value={userkepuasan.id}
                                    key={userkepuasan.id}
                                  >
                                    {userkepuasan.tahun}
                                  </option>
                                );
                              })}
                            </select>
                            {dataError.kepuasan_id ? (
                              <div className="invalid-feedback">
                                {dataError.kepuasan_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dipesan" 
                           className={
                            dataError.jmlh_lls_dipesan ? "is-invalid" : ""
                          }>
                            Jumlah Lulusan Dipesan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Jumlah Lulusan Dipesan"
                            id="dipesan"
                          />
                          {dataError.jmlh_lls_dipesan ? (
                              <div className="invalid-feedback">
                                {dataError.jmlh_lls_dipesan}
                              </div>
                            ) : (
                              ""
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tiga" 
                          className={
                            dataError.jmlh_tunggu_lls_3bln ? "is-invalid" : ""
                          }>
                            Jumlah tunggu lulusan 3 bulan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Jumlah tunggu lulusan 3 bulan"
                            id="tiga"
                          />
                          {dataError.jmlh_tunggu_lls_3bln ? (
                              <div className="invalid-feedback">
                                {dataError.jmlh_tunggu_lls_3bln}
                              </div>
                            ) : (
                              ""
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="enam" 
                          className={
                            dataError.jmlh_tunggu_lls_6bln ? "is-invalid" : ""
                          }>
                          Jumlah tunggu lulusan 6 bulan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Jumlah tunggu lulusan 6 bulan"
                            id="enam"
                          />
                          {dataError.jmlh_tunggu_lls_6bln ? (
                              <div className="invalid-feedback">
                                {dataError.jmlh_tunggu_lls_6bln}
                              </div>
                            ) : (
                              ""
                            )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="enamlebih" className={
                            dataError.jmlh_tunggu_lls_lebih_6bln ? "is-invalid" : ""
                          }>
                          Jumlah tunggu lulusan lebih 6 bulan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Jumlah tunggu lulusan lebih 6 bulan"
                            id="enamlebih"
                          />
                          {dataError.jmlh_tunggu_lls_lebih_6bln ? (
                              <div className="invalid-feedback">
                                {dataError.jmlh_tunggu_lls_lebih_6bln}
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
