import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";



export default function inputintegrasi() {
  const router = useRouter();

  const [userProfilDosens, setuserProfilDosens] = useState([]);
  const [userPenelitians, setuserPenelitians] = useState([]);
  const [filebukti, setfilebuktis] = useState<File>([]);

  const [PKMs, setPkMs] = useState([]);
  const [Matkuls, setMatkuls] = useState([]);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/testaxios",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { profil } = response.data;
        setuserProfilDosens(profil);
        console.log(profil);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });

      
  
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
        const { all_integrasi } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Input Sukses!");
        // console.log(token);
        console.log(all_integrasi);
        router.push("/");
      })
      .catch(function (error) {
        //handle error
        toast.dismiss();
        if (error.response.status == 400) {
          toast.error("Gagal Menyimpan Data!!");
        } else {
          toast.error("Gagal Menyimpan Data");
        }

        console.log("tidak success");
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
              <form id="inputDetailDosen" onSubmit={submitForm}>
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
                    <p className="text-uppercase text-sm">Integrasi</p>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="profil_dosen_id" className="form-control-label">
                            Profil Dosen
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="0"
                            id="profil_dosen_id"
                          >
                            <option>Pilih NIDK User</option>
                            {userProfilDosens.map((userProfilDosen) => {
                              {
                                return (
                                  <option
                                    value={userProfilDosen.id}
                                    key={userProfilDosen.id}
                                  >
                                    {userProfilDosen.NamaDosen + ' ' + userProfilDosen.NIK}
                                  </option>
                                );
                              }
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="penelitian" className="form-control-label">
                            Penelitian
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
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
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="pkm" className="form-control-label">
                            PKM
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
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
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="matkul" className="form-control-label">
                           Mata Kuliah
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="0"
                            id="matkul"
                          >
                            <option>Pilih nama matkul</option>
                            {Matkuls.map((matkul) => {
                               {
                                return (
                                  <option
                                    value={matkul.id}
                                    key={matkul.id}
                                  >
                                    {matkul.nama_matkul}
                                  </option>
                                );
                              }
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="bentuk" className="form-control-label">
                            Bentuk Integrasi
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Bentuk Integrasi"
                            id="bentuk"
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
