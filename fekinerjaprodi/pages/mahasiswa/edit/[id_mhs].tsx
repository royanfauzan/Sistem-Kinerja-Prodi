import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"


// Untuk Ngambil Data Berdasarkan ID
export async function getServerSideProps(context) {

  //http request
  const req  = await axios.get(`http://127.0.0.1:8000/api/tampil_Mahasiswa/${context.query.id_mhs}`)
  const res  = await req.data.all_mhs

  return {
    props: { 
      mahasiswa: res // <-- assign response
    },
  }
}
// interface Kategori {
//   id: number;
//   nama: string;
//   created_at: string;
//   updated_at: string;
// }


export default function update_datamhs(props) {
  const {mahasiswa} = props;
  console.log(mahasiswa);
  
  const router = useRouter();
  

  const [datamhs, setdatamhs] = useState(mahasiswa);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);
  const [dataError, setError] = useState([])
  const MySwal = withReactContent(Swal);
  const [dataRole, setRole] = useState("");
  
  

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
            const { role } = response.data.user;
            setRole(role);
            // kalo ga admin dipindah ke halaman lain
            if(level_akses < 2){
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
    formData.append("nim", event.target.nim.value);
    formData.append("nama", event.target.nama.value);


    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/Mahasiswa_Update/${datamhs.id}`+`?_method=PUT`,
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
        text: "Data Berhasil Di Edit",
      })

      router.push("/mahasiswa/daftarmhs")
    })
    .catch(function (error) {
      //handle error
      setError(error.response.data.error)
      console.log(error.response.data.error)
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Data Gagal Di Edit",
      })
      console.log(error.response)
    })
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
                      <h6 className="mb-0">Edit Data Mahasiswa</h6>
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
                          <label htmlFor="nim" 
                          className={dataError.nim ? "is-invalid" : ""}>
                            NIM Mahasiswa
                          </label>
                          <input
                          defaultValue={datamhs.nim}
                            className="form-control"
                            type="text"
                            placeholder="NIM Mahasiswa"
                            id="nim"
                          />
                          {dataError.nim ? (
                              <div className="invalid-feedback">
                                {dataError.nim}
                              </div>
                            ) : (
                              ""
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="nama" 
                          className={dataError.nama ? "is-invalid" : ""}>
                            Nama Mahasiswa
                          </label>
                          <input
                          defaultValue={datamhs.nama}
                            className="form-control"
                            type="text"
                            placeholder="Nama Mahasiswa"
                            id="nama"
                          />
                          {dataError.nama ? (
                              <div className="invalid-feedback">
                                {dataError.nama}
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
