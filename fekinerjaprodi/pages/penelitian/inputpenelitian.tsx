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



export default function inputpenelitian() {
  const router = useRouter();

  const [userpenelitian, setuserpenelitian] = useState([]);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);

  const [dataRole, setRole] = useState("");

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Penelitian",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_penelitian } = response.data;
        setuserpenelitian(all_penelitian);
        console.log(all_penelitian);
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
        if (level_akses < 2) {
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
    formData.append("tema_sesuai_roadmap", event.target.tema_sesuai_roadmap.value);
    formData.append("judul", event.target.judul_kegiatan.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("sumber_dana_PT_mandiri", event.target.sumber_dana_pt_mandiri.value);
    formData.append("dana_PT_Mandiri", event.target.dana_pt_mandiri.value);
    formData.append("sumber_dalam_negri", event.target.sumber_dlm_negri.value);
    formData.append("dana_dalam_negri", event.target.dana_dlm_negri.value);
    formData.append("sumber_luar_negri", event.target.sumber_luar_negri.value);
    formData.append("dana_luar_negri", event.target.dana_luar_negri.value);



    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/Penelitian",
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

        router.push("/penelitian/daftarpenelitian")
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
                        <h6 className="mb-0">Input Data Penelitian</h6>
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
                            <label htmlFor="tema_sesuai_roadmap"
                              className={dataError.tema_sesuai_roadmap ? "is-invalid" : ""}>
                              Tema Sesuai Roadmap
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tema Sesuai Roadmap"
                              id="tema_sesuai_roadmap"
                            />
                            {dataError.tema_sesuai_roadmap ? (
                              <div className="invalid-feedback">
                                {dataError.tema_sesuai_roadmap}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="judul_kegiatan"
                              className={dataError.judul ? "is-invalid" : ""}>
                              Judul kegiatan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Judul kegiatan"
                              id="judul_kegiatan"
                            />
                            {dataError.judul ? (
                              <div className="invalid-feedback">
                                {dataError.judul}
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
                            <label htmlFor="sumber_dana_pt_mandiri"
                              className={dataError.sumber_dana_PT_mandiri ? "is-invalid" : ""}>
                              Sumber Dana PT Mandiri
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Sumber Dana PT Mandiri"
                              id="sumber_dana_pt_mandiri"
                            />
                            {dataError.sumber_dana_PT_mandiri ? (
                              <div className="invalid-feedback">
                                {dataError.sumber_dana_PT_mandiri}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dana_pt_mandiri"
                              className={dataError.dana_PT_Mandiri ? "is-invalid" : ""}>
                              Dana PT Mandiri
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Dana PT Mandiri"
                              id="dana_pt_mandiri"
                            />
                            {dataError.dana_PT_Mandiri ? (
                              <div className="invalid-feedback">
                                {dataError.dana_PT_Mandiri}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="sumber_dlm_negri"
                              className={dataError.sumber_dalam_negri ? "is-invalid" : ""}>
                              Sumber Dalam Negri
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Sumber Dalam Negri"
                              id="sumber_dlm_negri"
                            />
                            {dataError.sumber_dalam_negri ? (
                              <div className="invalid-feedback">
                                {dataError.sumber_dalam_negri}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dana_dlm_negri"
                              className={dataError.dana_dalam_negri ? "is-invalid" : ""}>
                              Dana Dalam Negri
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Dana Dalam Negri"
                              id="dana_dlm_negri"
                            />
                            {dataError.dana_dalam_negri ? (
                              <div className="invalid-feedback">
                                {dataError.dana_dalam_negri}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="sumber_luar_negri"
                              className={dataError.sumber_luar_negri ? "is-invalid" : ""}>
                              Sumber Luar Negri
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Sumber Luar Negri"
                              id="sumber_luar_negri"
                            />
                            {dataError.sumber_luar_negri ? (
                              <div className="invalid-feedback">
                                {dataError.sumber_luar_negri}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dana_luar_negri"
                              className={dataError.dana_luar_negri ? "is-invalid" : ""}>
                              Dana Luar Negri
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Dana Luar Negri"
                              id="dana_luar_negri"
                            />
                            {dataError.dana_luar_negri ? (
                              <div className="invalid-feedback">
                                {dataError.dana_luar_negri}
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
