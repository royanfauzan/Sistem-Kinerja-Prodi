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


export default function inputtulisan() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);
  const [filebukti, setfilebuktis] = useState<File>([]);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{

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
        setuserDosens(profilDosens);
      })
      .catch(function (err) {
        console.log('gagal');
        console.log(err.response);
        return router.push('/');
      })
    
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

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    // let formData = new FormData();
    let formData = new FormData();
    formData.append("dosen_id", event.target.dosen.value);
    formData.append("judul", event.target.judul.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("nm_media", event.target.media.value);
    formData.append("ruang_lingkup", event.target.ruang.value);
    formData.append("file_bukti", filebukti);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/tulisan",
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

      router.push("../tulisan/daftartulisan");
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
        <LayoutForm>
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
                    <p className="text-uppercase text-sm">Tulisan Mahasiswa</p>
                    <div className="row">

                    <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="dosen"
                              className={dataError.dosen_id ? "is-invalid" : ""}
                            >
                              Dosen
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="dosen"
                            >
                              <option value="">Pilih Dosen</option>
                              {userDosens.map((userdosen) => {
                                return (
                                  <option
                                    value={userdosen.id}
                                    key={userdosen.id}
                                  >
                                    {userdosen.NamaDosen +
                                      ` ` +
                                      userdosen.NIDK}
                                  </option>
                                );
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
                          <label htmlFor="judul" className="form-control-label">
                            Judul Tulisan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Judul Tulisan"
                            id="judul"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tahun" className="form-control-label">
                            Tahun
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Tahun"
                            id="tahun"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="media" className="form-control-label">
                          Nama Media
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nama Media"
                            id="media"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="ruang"
                              className={dataError.ruang_lingkup ? "is-invalid" : ""}
                            >
                              Ruang Lingkup
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="ruang"
                            >
                              <option value="">Pilih Ruang Lingkup</option>
                              <option value="internasional">
                                Internasional
                              </option>
                              <option value="nasional">Nasional</option>
                              <option value="wilayah">Wilayah</option>
                            </select>
                            {dataError.ruang_lingkup ? (
                              <div className="invalid-feedback">
                                {dataError.ruang_lingkup}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="bukti" className="form-control-label">
                            File Bukti
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            onChange={handleChangeFile}
                            id="bukti"
                            required
                          />
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
