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
  const reqcapkurikulum  = await axios.get(`http://127.0.0.1:8000/api/tampil_CapaianKurikulum/${context.query.id_capkurikulum}`)
  const res  = await reqcapkurikulum.data.all_capkurikulum

  const reqprodi = await axios.get(`http://127.0.0.1:8000/api/Prodi/`)
  const prodi = await reqprodi.data.Prodi

  const reqmatkul  = await axios.get(`http://127.0.0.1:8000/api/Matkul/`)
  const matkul  = await reqmatkul.data.all_matkul

  return {
    props: { 
      capkurikulum: res, // <-- assign response
      prodi: prodi,
      matkul: matkul
    },
  }
}
// interface Kategori {
//   id: number;
//   nama: string;
//   created_at: string;
//   updated_at: string;
// }


export default function update_datacapkurikulum(props) {
  const {capkurikulum} = props;
  console.log(capkurikulum);

  const {prodi} = props;
  console.log(prodi);

  const {matkul} = props;
  console.log(matkul);
  
  const router = useRouter();
  

  const [datacapkurikulum, setdatacapkurikulum] = useState(capkurikulum);
  const [dataprodi, setdataprodi] = useState(prodi);
  const [datamatkul, setdatamatkul] = useState(matkul);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);
  const [selectProdi, setselectProdi] = useState(capkurikulum.prodi_ID);
  const [selectMatkul, setselectMatkul] = useState(capkurikulum.matkul_ID);
  
  

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
  
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
  
  //HAPUS DATA
 

  // Insert Update Data
  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("prodi_ID", event.target.prodi.value);
    formData.append("matkul_ID", event.target.matkul.value);
    formData.append("semester", event.target.semester.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("mata_kuliah_kompetensi", event.target.matkul_kompetensi.value);
    formData.append("kuliah_responsi_tutorial", event.target.kuliah_responsi_tutorial.value);
    formData.append("seminar", event.target.seminar.value);
    formData.append("praktikum", event.target.praktikum.value);
    formData.append("konversi_kredit_jam", event.target.konv_kredit_jam.value);
    formData.append("sikap", event.target.sikap.value);
    formData.append("pengetahuan", event.target.pengetahuan.value);
    formData.append("ketrampilan_umum", event.target.ketrampilan_umum.value);
    formData.append("ketrampilan_khusus", event.target.ketrampilan_khusus.value);
    formData.append("dok_ren_pembelajaran", event.target.dok_ren_pembelajaran.value);
    formData.append("unit_penyelenggara", event.target.unit_penyelenggara.value);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/CapaianKurikulum_Update/${datacapkurikulum.id}`+`?_method=PUT`,
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
        router.push("../../capkurikulum/daftarkurikulum");
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

  const handleChangeProdi = (e) => {
    setselectProdi(e.target.value);
  };

  const handleChangeMatkul = (e) => {
    setselectMatkul(e.target.value);
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
                      <p className="mb-0">Edit Data Capaian Kurikulum</p>
                      <button
                        className="btn btn-primary btn-sm ms-auto"
                        type="submit"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-uppercase text-sm"> CAPAIAN KURIKULUM </p>
                    <div className="row">

                    <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="prodi" className="form-control-label">
                            Program Studi
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={selectProdi}
                            id="prodi"
                            onChange={handleChangeProdi}
                          >
                            <option>Pilih Program Studi</option>
                            {dataprodi.map((userProdi) => {
                              {
                                return (
                                  <option
                                    value={userProdi.id}
                                    key={userProdi.id}
                                  >
                                    {userProdi.prodi + ' ' + userProdi.nama_prodi}
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
                            <option>Pilih Mata Kuliah</option>
                            {datamatkul.map((userMatkul) => {
                              {
                                return (
                                  <option
                                    value={userMatkul.id}
                                    key={userMatkul.id}
                                  >
                                    {userMatkul.nama_matkul + ' ' + userMatkul.sks}
                                  </option>
                                );
                              }
                            })}
                          </select>
                        </div>
                      </div>

                    
                    <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="semester" className="form-control-label">
                            Semester
                          </label>
                          <input
                          defaultValue={datacapkurikulum.semester}
                            className="form-control"
                            type="text"
                            placeholder="Semester"
                            id="semester"
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
                            defaultValue={datacapkurikulum.tahun}
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
                          <label htmlFor="matkul_kompetensi" className="form-control-label">
                            Mata Kuliah Kompetensi
                          </label>
                          <input
                          defaultValue={datacapkurikulum.mata_kuliah_kompetensi}
                            className="form-control"
                            type="text"
                            placeholder="Mata Kuliah Kompetensi"
                            id="matkul_kompetensi"
                            required
                          />
                        </div>
                      </div>       

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="kuliah_responsi_tutorial" className="form-control-label">
                            Kuliah Responsi Tutorial
                          </label>
                          <input
                          defaultValue={datacapkurikulum.kuliah_responsi_tutorial}
                            className="form-control"
                            type="text"
                            placeholder="Kuliah Responsi Tutorial"
                            id="kuliah_responsi_tutorial"
                            required
                          />
                        </div>
                      </div>             

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="seminar" className="form-control-label">
                            Seminar
                          </label>
                          <input
                          defaultValue={datacapkurikulum.seminar}
                            className="form-control"
                            type="text"
                            placeholder="Seminar"
                            id="seminar"
                            required
                          />
                        </div>
                      </div>            

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="praktikum" className="form-control-label">
                            Praktikum
                          </label>
                          <input
                          defaultValue={datacapkurikulum.praktikum}
                            className="form-control"
                            type="text"
                            placeholder="Praktikum"
                            id="praktikum"
                            required
                          />
                        </div>
                      </div>     

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="konv_kredit_jam" className="form-control-label">
                            Konversi Kredit Jam
                          </label>
                          <input
                          defaultValue={datacapkurikulum.konversi_kredit_jam}
                            className="form-control"
                            type="text"
                            placeholder="Konversi Kredit Jam"
                            id="konv_kredit_jam"
                            required
                          />
                        </div>
                      </div>         

                        <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="sikap" className="form-control-label">
                            Sikap
                          </label>
                          <input
                          defaultValue={datacapkurikulum.sikap}
                            className="form-control"
                            type="text"
                            placeholder="Sikap"
                            id="sikap"
                            required
                          />
                        </div>
                      </div> 

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="pengetahuan" className="form-control-label">
                            Pengetahuan
                          </label>
                          <input
                          defaultValue={datacapkurikulum.pengetahuan}
                            className="form-control"
                            type="text"
                            placeholder="Pengetahuan"
                            id="pengetahuan"
                            required
                          />
                        </div>
                      </div>              

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="ketrampilan_umum" className="form-control-label">
                            Ketrampilan Umum
                          </label>
                          <input
                          defaultValue={datacapkurikulum.ketrampilan_umum}
                            className="form-control"
                            type="text"
                            placeholder="Ketrampilan Umum"
                            id="ketrampilan_umum"
                            required
                          />
                        </div>
                      </div>            

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="khusus" className="form-control-label">
                            Ketrampilan Khusus
                          </label>
                          <input
                          defaultValue={datacapkurikulum.ketrampilan_khusus}
                            className="form-control"
                            type="text"
                            placeholder="Ketrampilan Khusus"
                            id="ketrampilan_khusus"
                            required
                          />
                        </div>
                      </div>          

                         <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dok_ren_pembelajaran" className="form-control-label">
                            Dokumen Rencana Pembelajaran
                          </label>
                          <input
                          defaultValue={datacapkurikulum.dok_ren_pembelajaran}
                            className="form-control"
                            type="text"
                            placeholder="Dokumen Rencana Pembelajaran"
                            id="dok_ren_pembelajaran"
                            required
                          />
                        </div>
                      </div>      

                          <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="unit_penyelenggara" className="form-control-label">
                            Unit Penyelenggara
                          </label>
                          <input
                          defaultValue={datacapkurikulum.unit_penyelenggara}
                            className="form-control"
                            type="text"
                            placeholder="Unit Penyelenggara"
                            id="unit_penyelenggara"
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
