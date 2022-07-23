import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";


export default function inputmhs() {
  const router = useRouter();

  const [userprodukmhss, setuserprodukmhss] = useState([]);
  const [filebukti, setfilebuktis] = useState<File>([]);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/ProdukMHS",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_produk } = response.data;
        setuserprodukmhss(all_produk);
        console.log(all_produk);
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
    formData.append("nama_produk", event.target.nama_produk.value);
    formData.append("deskripsi", event.target.deskripsi.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("deskripsi_bukti", event.target.deskripsi_bukti.value);
    formData.append("file_bukti", filebukti);
    

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/ProdukMHS",
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
                    <p className="text-uppercase text-sm">Produk Mahasiswa</p>
                    <div className="row">
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="nama_produk" className="form-control-label">
                            Nama Produk
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nama Produk"
                            id="nama_produk"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="deskripsi" className="form-control-label">
                            Deskripsi
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Deskripsi"
                            id="deskripsi"
                            required
                          />
                        </div>
                      </div>          
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="deskripsi" className="form-control-label">
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
                          <label htmlFor="deskripsi_bukti" className="form-control-label">
                            Deskripsi Bukti
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Deskripsi Bukti"
                            id="deskripsi_bukti"
                            required
                          />
                        </div>
                      </div>   
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="file_bukti" className="form-control-label">
                            File Bukti
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            onChange={handleChangeFile}
                            id="file_bukti"
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
