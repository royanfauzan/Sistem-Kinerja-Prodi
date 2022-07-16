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

export default function inputpenerimaan() {
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
    formData.append("Tahun_Akademik", event.target.tahun_akademik.value);
    formData.append("Daya_Tampung", event.target.daya_tampung.value);
    formData.append("Pendaftaran", event.target.pendaftar.value);
    formData.append("Lulus_Seleksi", event.target.Lulus_Seleksi.value);
    formData.append("Maba_Reguler", event.target.Maba_Reguler.value);
    formData.append("Maba_Transfer", event.target.Maba_Transfer.value);
    formData.append("Mahasiswa_Aktif_Reguler", event.target.Mahasiswa_Reguler.value);
    formData.append("Mahasiswa_Aktif_Transfer", event.target.Mahasiswa_Transfer.value);
    formData.append("Program_Studi_Prodi_Id", event.target.prodi.value);
  
    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/create_penerimaan_mahasiswa",
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
                      <p className="mb-0">Input Data Seleksi Mahasiswa</p>
                      <button
                        className="btn btn-primary btn-sm ms-auto"
                        type="submit"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-uppercase text-sm"> Seleksi Mahasiswa Baru</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="prodi" className="form-control-label">
                           Nama Prodi
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="0"
                            id="prodi"
                          >
                            <option>Pilih Prodi</option>
                            {dataProdis.map((dataProdi) => {
                              
                                return (
                                  <option
                                    value={dataProdi.id}
                                    key={dataProdi.id}
                                  >
                                    {dataProdi.nama_prodi}
                                  </option>
                                );
                              
                            })}
                          </select>
                        </div>
                      </div>

                     
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tahun_akademik" className="form-control-label">
                           Tahun Akademik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Tahun Akademik"
                            id="tahun_akademik"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="daya_tampung" className="form-control-label">
                           Daya Tampung
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Daya Tampung"
                            id="daya_tampung"
                            required
                          />
                        </div>
                      </div>


                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="pendaftar" className="form-control-label">
                          Pendaftar
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Pendaftar"
                            id="pendaftar"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="Lulus_Seleksi" className="form-control-label">
                         Lulus Seleksi
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Lulus Seleksi"
                            id="Lulus_Seleksi"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="Maba_Reguler" className="form-control-label">
                        Mahasiswa Baru Reguler
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Mahasiswa Baru Reguler"
                            id="Maba_Reguler"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="Maba_Transfer" className="form-control-label">
                        Mahasiswa Baru Transfer
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Mahasiswa Baru Transfer"
                            id="Maba_Transfer"
                            required
                          />
                        </div>
                      </div>

                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="Mahasiswa_Reguler" className="form-control-label">
                      Jumlah Mahasiswa Aktif Reguler
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=" Jumlah Mahasiswa Aktif Reguler"
                            id="Mahasiswa_Reguler"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="Mahasiswa_Reguler" className="form-control-label">
                      Jumlah Mahasiswa Aktif Transfer
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=" Jumlah Mahasiswa Aktif Transfer"
                            id="Mahasiswa_Transfer"
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
