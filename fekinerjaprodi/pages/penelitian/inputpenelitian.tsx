import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";



export default function inputpenelitian() {
  const router = useRouter();

  const [userpenelitian, setuserpenelitian] = useState([]);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
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
        const { all_mhs } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Input Sukses!");
        // console.log(token);
        console.log(all_mhs);
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
                    <p className="text-uppercase text-sm">Pengabdian Kepada Masyarakat (PkM)</p>
                    <div className="row">
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tema_sesuai_roadmap" className="form-control-label">
                            Tema Sesuai Roadmap
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nama Mahasiswa"
                            id="tema_sesuai_roadmap"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="judul_kegiatan" className="form-control-label">
                            Judul kegiatan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Judul kegiatan"
                            id="judul_kegiatan"
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
                          <label htmlFor="sumber_dana_pt_mandiri" className="form-control-label">
                            Sumber Dana PT Mandiri
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Sumber Dana PT Mandiri"
                            id="sumber_dana_pt_mandiri"
                            required
                          />
                        </div>
                      </div>                    

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dana_pt_mandiri" className="form-control-label">
                            Dana PT Mandiri
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Dana PT Mandiri"
                            id="dana_pt_mandiri"
                            required
                          />
                        </div>
                      </div>   

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="sumber_dlm_negri" className="form-control-label">
                            Sumber Dalam Negri
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Sumber Dalam Negri"
                            id="sumber_dlm_negri"
                            required
                          />
                        </div>
                      </div>      

                       <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dana_dlm_negri" className="form-control-label">
                            Dana Dalam Negri
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Dana Dalam Negri"
                            id="dana_dlm_negri"
                            required
                          />
                        </div>
                      </div>   

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="sumber_luar_negri" className="form-control-label">
                            Sumber Luar Negri
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Sumber Luar Negri"
                            id="sumber_luar_negri"
                            required
                          />
                        </div>
                      </div>    

                       <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dana_luar_negri" className="form-control-label">
                            Dana Luar Negri
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Dana Luar Negri"
                            id="dana_luar_negri"
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
