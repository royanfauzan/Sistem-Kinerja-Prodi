import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"



export default function inputintegrasi() {
  const router = useRouter();

  const [userProfilDosens, setdataDosen] = useState([]);
  const [userPenelitians, setuserPenelitians] = useState([]);
  const [filebukti, setfilebuktis] = useState<File>([]);
  const penelitianref = useRef(null);
  const pkmref = useRef(null);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);

  const [dataRole, setRole] = useState('');


  const [PKMs, setPkMs] = useState([]);
  const [Matkuls, setMatkuls] = useState([]);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  const handleChangePenelitian = (e) => {
    pkmref.current.value = null
  };

  const handleChangePKM = (e) => {
    penelitianref.current.value = null
  };

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    // axios({
    //   method: "get",
    //   url: "http://127.0.0.1:8000/api/profildosens",
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     console.log("Sukses");
    //     const { profilDosens } = response.data;
    //     setuserProfilDosens(profilDosens);
    //     console.log(profilDosens);
    //   })
    //   .catch(function (err) {
    //     console.log("gagal");
    //     console.log(err.response);
    //   });
    const lgToken = localStorage.getItem('token');
    if (!lgToken) {
      router.push('/login')
    }


    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profildosens",
      headers: { "Authorization": `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log('Sukses');
        const { profilDosens } = response.data;
        setdataDosen(profilDosens);
      })
      .catch(function (err) {
        console.log('gagal');
        console.log(err.response);
        return router.push('/');
      })



    // pake ngambil data untuk halaman input

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Penelitian",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_penelitian } = response.data;
        setuserPenelitians(all_penelitian);
        console.log(all_penelitian);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });


    // pake ngambil data untuk halaman input

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/PKM",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_pkm } = response.data;
        setPkMs(all_pkm);
        console.log(all_pkm);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });


    // pake ngambil data untuk halaman input

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Matkul",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_matkul } = response.data;
        setMatkuls(all_matkul);
        console.log(all_matkul);
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
        
        const {role} = response.data.user;
        setRole(role);
        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 2) {
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
    formData.append("dosen_id", event.target.profil_dosen_id.value);
    formData.append("penelitian_id", event.target.penelitian.value);
    formData.append("PkM_id", event.target.pkm.value);
    formData.append("matkul_id", event.target.matkul.value);
    formData.append("bentuk_integrasi", event.target.bentuk.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("file_bukti", filebukti);


    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/Integrasi",
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

        router.push("/integrasi/daftarintegrasi")
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
                        <h6 className="mb-0">Input Data Integrasi</h6>
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
                              htmlFor="profil_dosen_id"
                              className={dataError.dosen_id ? "is-invalid" : ""}
                            >
                              Program Studi
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="profil_dosen_id"
                            >
                              <option value="">Pilih Program Studi</option>
                              {userProfilDosens.map((dataProfilDosen) => {
                                return (
                                  <option
                                    value={dataProfilDosen.id}
                                    key={dataProfilDosen.id}
                                  >
                                    {dataProfilDosen.NamaDosen + ' ' + dataProfilDosen.NIDK}
                                  </option>
                                )
                              })}
                            </select>
                            {dataError.dosen_id ? (
                              <div className="invalid-feedback">
                                {dataError.dosen_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="penelitian"
                              className={dataError.penelitian_id ? "is-invalid" : ""}>
                              Penelitian
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              ref={penelitianref}
                              onChange={handleChangePenelitian}
                              defaultValue="0"
                              id="penelitian"
                            >
                              <option>Pilih Penelitian</option>
                              {userPenelitians.map((userPenelitian) => {
                                {
                                  return (
                                    <option
                                      value={userPenelitian.id}
                                      key={userPenelitian.id}
                                    >
                                      {userPenelitian.tema_sesuai_roadmap + ' ' + userPenelitian.judul}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                            {dataError.penelitian_id ? (
                              <div className="invalid-feedback">
                                {dataError.penelitian_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="pkm"
                              className={dataError.PkM_id ? "is-invalid" : ""}>
                              PKM
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              ref={pkmref}
                              onChange={handleChangePKM}
                              defaultValue="0"
                              id="pkm"
                            >
                              <option>Pilih NIDK User</option>
                              {PKMs.map((pkm) => {
                                {
                                  return (
                                    <option
                                      value={pkm.id}
                                      key={pkm.id}
                                    >
                                      {pkm.tema_sesuai_roadmap + ' ' + pkm.judul_kegiatan}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                            {dataError.PkM_id ? (
                              <div className="invalid-feedback">
                                {dataError.PkM_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="matkul"
                              className={dataError.matkul_id ? "is-invalid" : ""}
                            >
                              Mata Kuliah
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="matkul"
                            >
                              <option value="">Pilih Mata Kuliah</option>
                              {Matkuls.map((dataMatkul) => {
                                return (
                                  <option
                                    value={dataMatkul.id}
                                    key={dataMatkul.id}
                                  >
                                    {dataMatkul.nama_matkul + ' ' + dataMatkul.sks}
                                  </option>
                                )
                              })}
                            </select>
                            {dataError.matkul_id ? (
                              <div className="invalid-feedback">
                                {dataError.matkul_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="bentuk"
                              className={dataError.bentuk_integrasi ? "is-invalid" : ""}>
                              Bentuk Integrasi
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Bentuk Integrasi"
                              id="bentuk"
                            />
                            {dataError.bentuk_integrasi ? (
                              <div className="invalid-feedback">
                                {dataError.bentuk_integrasi}
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
                            <label htmlFor="bukti"
                              className={dataError.file_bukti ? "is-invalid" : ""}>
                              File Bukti
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              onChange={handleChangeFile}
                              id="bukti"
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
