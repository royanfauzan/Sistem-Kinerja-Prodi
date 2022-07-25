import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

interface Prodi {
  nama_prodi: string;

}

export default function input_mahasiswa_asing() {
  const router = useRouter();

  const [dataProdis, setdataProdi] = useState<Prodi[]>([]);

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
        const { Prodi} = response.data;
        setdataProdi(Prodi);
        console.log(dataProdis);
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
    formData.append("namamitra", event.target.namamitra.value);
    formData.append("alamat", event.target.alamat.value);
    formData.append("no_telepon", event.target.no_telepon.value);
    formData.append("nama_cp", event.target.nama_cp.value);
    formData.append("no_telp_cp", event.target.no_telp_cp.value);
    formData.append("email_cp", event.target.email_cp.value);
    formData.append("bidang", event.target.bidang.value);
   

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/created",
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
        console.log(profil);
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

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="namamitra" className="form-control-label">
                          Nama Mitra
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=" Alamat"
                            id="namamitra"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="alamat" className="form-control-label">
                          Alamat
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Alamat Mitra"
                            id="alamat"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="no_telepon" className="form-control-label">
                          Nomor Telepon Mitra
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nomor Telepon Mitra"
                            id="no_telepon"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="nama_cp" className="form-control-label">
                          Nama CP
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nama CP"
                            id="nama_cp"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="no_telp_cp" className="form-control-label">
                         Nomor Telepon CP
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nomor Telepon CP"
                            id="no_telp_cp"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="email_cp" className="form-control-label">
                        Email CP
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Email CP"
                            id="email_cp"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tingkat" className="form-control-label">
                            Bidang
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="0"
                            id="bidang"
                          >
                            <option >Bidang Kerjasama</option>
                            <option value="Kerjasama Pendidikan"> Kerjasama Pendidikan </option>
                            <option value="Kerjasama Penelitian"> Kerjasama Penelitian</option>
                            <option value="Kerjasama pengabdian Masyarakat"> Kerjasama pengabdian Masyarakat</option>
                            
                          </select>
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
