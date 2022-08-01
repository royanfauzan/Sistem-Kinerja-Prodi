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
  const req  = await axios.get(`http://127.0.0.1:8000/api/tampil_Matkul/${context.query.id_matkul}`)
  const res  = await req.data.all_mhs

  return {
    props: { 
        matkul: res // <-- assign response
    },
  }
}
// interface Kategori {
//   id: number;
//   nama: string;
//   created_at: string;
//   updated_at: string;
// }


export default function update_datamatkul(props) {
  const {matkul} = props;
  console.log(matkul);
  
  const router = useRouter();
  

  const [dataMatkul, setdataMatkul] = useState(matkul);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);
  
  

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
    formData.append("nama_matkul", event.target.nama_matkul.value);
    formData.append("sks", event.target.sks.value);
    formData.append("prodi_id", event.target.prodi_id.value);
    // formData.append("_method","put");

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/Matkul_Update/${dataMatkul.id}`+`?_method=PUT`,
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
        router.push("../../matkul/daftarmatkul");
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
              <form id="inputDetilDosen" onSubmit={submitForm}>
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                      <p className="mb-0">Edit Data Mata Kuliah</p>
                      <button
                        className="btn btn-primary btn-sm ms-auto"
                        type="submit"
                      >
                        Simpan
                      </button>
                     
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-uppercase text-sm"> Mata Kuliah </p>
                    <div className="row">

                    <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="nama_matkul" className="form-control-label">
                        Nama Mata kuliah
                      </label>
                      <input
                      defaultValue={dataMatkul.nama_matkul}
                        className="form-control"
                        type="text"
                        placeholder="Nama Matkul"
                        id="nama_matkul"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="sks" className="form-control-label">
                        SKS
                      </label>
                      <input
                      defaultValue={dataMatkul.sks}
                        className="form-control"
                        type="text"
                        placeholder="SKS"
                        id="sks"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="prodi_id" className="form-control-label">
                        Prodi ID
                      </label>
                      <input
                      defaultValue={dataMatkul.prodi_id}
                        className="form-control"
                        type="text"
                        placeholder="Prodi ID"
                        id="prodi_id"
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
