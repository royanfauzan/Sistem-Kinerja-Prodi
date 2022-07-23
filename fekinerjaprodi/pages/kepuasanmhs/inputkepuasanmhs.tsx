import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";



export default function inputkepuasanmhs() {
  const router = useRouter();

  const [userProdis, setuserProdis] = useState([]);
  

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Prodi",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_prodi } = response.data;
        setuserProdis(all_prodi);
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
    formData.append("prodi_id", event.target.prodi.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("keandalan_4", event.target.keandalan_4.value);
    formData.append("keandalan_3", event.target.keandalan_3.value);
    formData.append("keandalan_2", event.target.keandalan_2.value);
    formData.append("keandalan_1", event.target.keandalan_1.value);
    formData.append("tl_keandalan", event.target.tl_keandalan.value);
    formData.append("dayatanggap_4", event.target.dayatanggap_4.value);
    formData.append("dayatanggap_3", event.target.dayatanggap_3.value);
    formData.append("dayatanggap_2", event.target.dayatanggap_2.value);
    formData.append("dayatanggap_1", event.target.dayatanggap_1.value);
    formData.append("tl_dayatanggap", event.target.tl_dayatanggap.value);
    formData.append("kepastian_4", event.target.kepastian_4.value);
    formData.append("kepastian_3", event.target.kepastian_3.value);
    formData.append("kepastian_2", event.target.kepastian_2.value);
    formData.append("kepastian_1", event.target.kepastian_1.value);
    formData.append("tl_kepastian", event.target.tl_kepastian.value);
    formData.append("empati_4", event.target.empati_4.value);
    formData.append("empati_3", event.target.empati_3.value);
    formData.append("empati_2", event.target.empati_2.value);
    formData.append("empati_1", event.target.empati_1.value);
    formData.append("tl_empati", event.target.tl_empati.value);
    formData.append("tangible_4", event.target.tangible_4.value);
    formData.append("tangible_3", event.target.tangible_3.value);
    formData.append("tangible_2", event.target.tangible_2.value);
    formData.append("tangible_1", event.target.tangible_1.value);
    formData.append("tl_tangible", event.target.tl_tangible.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/KepuasanMHS",
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { all_capkurikulum } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Input Sukses!");
        // console.log(token);
        console.log(all_capkurikulum);
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
                    <p className="text-uppercase text-sm">Capaian Kurikulum</p>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="prodi" className="form-control-label">
                            Program Studi
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="0"
                            id="prodi"
                          >
                            <option>Pilih Program Studi</option>
                            {userProdis.map((userProdi) => {
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
                          <label htmlFor="keandalan_4" className="form-control-label">
                            Keandalan : Buruk
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="4"
                            id="keandalan_4"
                            required
                          />
                        </div>
                      </div>   

                         

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="keandalan_3" className="form-control-label">
                            Keandalan : Cukup
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="3"
                            id="keandalan_3"
                            required
                          />
                        </div>
                      </div>       

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="keandalan_2" className="form-control-label">
                            Keandalan : Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="2"
                            id="keandalan_2"
                            required
                          />
                        </div>
                      </div>             

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="keandalan_1" className="form-control-label">
                            Keandalan : Sangat Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="1"
                            id="keandalan_1"
                            required
                          />
                        </div>
                      </div>            

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tl_keandalan" className="form-control-label">
                            TL Keandalan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Tindakan yang Dilakukan"
                            id="tl_keandalan"
                            required
                          />
                        </div>
                      </div>     

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dayatanggap_4" className="form-control-label">
                            Daya Tanggap : Buruk
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="4"
                            id="dayatanggap_4"
                            required
                          />
                        </div>
                      </div>         

                        <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dayatanggap_3" className="form-control-label">
                            Daya Tanggap : Cukup
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="3"
                            id="dayatanggap_3"
                            required
                          />
                        </div>
                      </div> 

                       <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dayatanggap_2" className="form-control-label">
                            Daya Tanggap : Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="2"
                            id="dayatanggap_2"
                            required
                          />
                        </div>
                      </div>              

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dayatanggap_1" className="form-control-label">
                            Daya Tanggap : Sangat Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="1"
                            id="dayatanggap_1"
                            required
                          />
                        </div>
                      </div>            

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tl_dayatanggap" className="form-control-label">
                          TL Daya Tanggap
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Tindakan yang Dilakukan"
                            id="tl_dayatanggap"
                            required
                          />
                        </div>
                      </div>          

                         <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="kepastian_4" className="form-control-label">
                            Kepastian : Buruk
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="4"
                            id="kepastian_4"
                            required
                          />
                        </div>
                      </div>      

                        <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="kepastian_3" className="form-control-label">
                            Kepastian : Cukup
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="3"
                            id="kepastian_3"
                            required
                          />
                        </div>
                      </div>         

                       <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="kepastian_2" className="form-control-label">
                            Kepastian : Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="2"
                            id="kepastian_2"
                            required
                          />
                        </div>
                      </div>       

                       <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="kepastian_1" className="form-control-label">
                            Kepastian : Sangat Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="1"
                            id="kepastian_1"
                            required
                          />
                        </div>
                      </div>       

                       <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tl_kepastian" className="form-control-label">
                            TL Kepastian
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Tindakan yang Dilakukan"
                            id="tl_kepastian"
                            required
                          />
                        </div>
                      </div>    

                       <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="empati_4" className="form-control-label">
                            Empati : Buruk
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="4"
                            id="empati_4"
                            required
                          />
                        </div>
                      </div>        

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="empati_3" className="form-control-label">
                            Empati : Cukup
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="3"
                            id="empati_3"
                            required
                          />
                        </div>
                      </div>    

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="empati_2" className="form-control-label">
                            Empati : Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="2"
                            id="empati_2"
                            required
                          />
                        </div>
                      </div>  

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="empati_1" className="form-control-label">
                            Empati : Sangat Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="1"
                            id="empati_1"
                            required
                          />
                        </div>
                      </div>  

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tl_empati" className="form-control-label">
                           Tl Empati 
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Tindakan yang Dilakukan"
                            id="tl_empati"
                            required
                          />
                        </div>
                      </div>   
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tangible_4" className="form-control-label">
                          Tangible : Buruk
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="4"
                            id="tangible_4"
                            required
                          />
                        </div>
                      </div>   

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tangible_3" className="form-control-label">
                          Tangible : Cukup
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="3"
                            id="tangible_3"
                            required
                          />
                        </div>
                      </div>   

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tangible_2" className="form-control-label">
                          Tangible : Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="2"
                            id="tangible_2"
                            required
                          />
                        </div>
                      </div>   

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tangible_1" className="form-control-label">
                          Tangible : Sangat Baik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="1"
                            id="tangible_1"
                            required
                          />
                        </div>
                      </div>   

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tl_tangible" className="form-control-label">
                          TL Tangible 
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Tindakan yang Dilakukan"
                            id="tl_tangible"
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
