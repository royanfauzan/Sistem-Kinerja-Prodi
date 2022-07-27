import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";


// Untuk Ngambil Data Berdasarkan ID
export async function getServerSideProps(context) {

  //http request
  const req  = await axios.get(`http://127.0.0.1:8000/api/tampil_Integrasi/${context.query.id_integrasi}`)
  const integrasi  = await req.data.all_integrasi

  

  const reqpenelitian  = await axios.get(`http://127.0.0.1:8000/api/Penelitian/`)
  const penelitian  = await reqpenelitian.data.all_penelitian

  const reqPKM  = await axios.get(`http://127.0.0.1:8000/api/PKM/`)
  const PKM  = await reqPKM.data.all_pkm

  const reqmatkul  = await axios.get(`http://127.0.0.1:8000/api/Matkul/`)
  const matkul  = await reqmatkul.data.all_matkul

  return {
    props: { 
        integrasi: integrasi, 
        penelitian: penelitian,
        PKM: PKM,
        matkul: matkul// <-- assign response
    },
  }
}
// interface Kategori {
//   id: number;
//   nama: string;
//   created_at: string;
//   updated_at: string;
// }


export default function update_dataintegrasi(props) {
  const {integrasi} = props;
  console.log(integrasi);

  const {dosen} = props;
  console.log(dosen);

  const {penelitian} = props;
  console.log(penelitian);

  const {PKM} = props;
  console.log(PKM);

  const {matkul} = props;
  console.log(matkul);
  
  const router = useRouter();
  

  const [dataIntegrasi, setdataIntegrasi] = useState(integrasi);
  const [dataDosen, setdataDosen] = useState(dosen);
  const [dataPenelitian, setdataPenelitian] = useState(penelitian);
  const [dataPKM, setdataPKM] = useState(PKM);
  const [datamatkul, setdatamatkul] = useState(matkul);
  

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
    
  }

  const [selectDosen, setSelectDosen] = useState(integrasi.dosen_id);
  const [selectPenelitian, setSelectPenelitian] = useState(integrasi.penelitian_id);
  const [selectPKM, setselectPKM] = useState(integrasi.PkM_id);
  const [selectMatkul, setselectMatkul] = useState(integrasi.matkul_id);



  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
  useEffect(()=>{
    
    
    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem('token');
    if(!lgToken){
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
              const {profilDosens} = response.data;
             setdataDosen(profilDosens);
      })
      .catch(function (err) {
          console.log('gagal');
          console.log(err.response);
          return router.push('/');
      })
    
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
  
  //HAPUS DATA
 

  // Insert Update Data
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
      url: `http://127.0.0.1:8000/api/Integrasi_Update/${dataIntegrasi.id}`+`?_method=PUT`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { profil } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(response.data);
        // router.push("/");
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

  const handleChangeDosen = (e) => {
    setSelectDosen(e.target.value);
   
  };

  const handleChangePenelitian = (e) => {
    setSelectPenelitian(e.target.value);
   
  };

  const handleChangePKM = (e) => {
    setSelectPKM(e.target.value);
   
  };

  const handleChangeMatkul = (e) => {
    setSelectMatkul(e.target.value);
   
  };

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);
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
                      <p className="mb-0">Input Data Mitra</p>
                      <button
                        className="btn btn-primary btn-sm ms-auto"
                        type="submit"
                      >
                        Simpan
                      </button>
                     
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-uppercase text-sm"> MITRA </p>
                    <div className="row">

                    <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="profil_dosen_id" className="form-control-label">
                            Profil Dosen
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={selectDosen}
                            id="profil_dosen_id"
                            onChange={handleChangeDosen}
                          >
                            <option>Pilih NIDK User</option>
                            {dataDosen.map((profil_dosen) => {
                              {
                                return (
                                  <option
                                    value={profil_dosen.id}
                                    key={profil_dosen.id}
                                  >
                                    {profil_dosen.NamaDosen + ' ' + profil_dosen.NIK}
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
                            value={selectPenelitian}
                            id="penelitian"
                            onChange={handleChangePenelitian}
                          >
                            <option>Pilih Penelitian</option>
                            {dataPenelitian.map((Integrasi) => {
                               {
                                return (
                                  <option
                                    value={Integrasi.id}
                                    key={Integrasi.id}
                                  >
                                    {Integrasi.tema_sesuai_roadmap + ' ' + Integrasi.judul}
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
                            value={selectPKM}
                            id="pkm"
                            onChange={handleChangePKM}
                          >
                            <option>Pilih NIDK User</option>
                            {dataPKM.map((dataPKM) => {
                              {
                                return (
                                  <option
                                    value={dataPKM.id}
                                    key={dataPKM.id}
                                  >
                                    {dataPKM.tema_sesuai_roadmap + ' ' + dataPKM.judul_kegiatan}
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
                            value={selectMatkul}
                            id="matkul"
                            onChange={handleChangeMatkul}
                          >
                            <option>Pilih nama matkul</option>
                            {datamatkul.map((matkul) => {
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
                          defaultValue={dataIntegrasi.bentuk_integrasi}
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
                          defaultValue={dataIntegrasi.tahun}
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
