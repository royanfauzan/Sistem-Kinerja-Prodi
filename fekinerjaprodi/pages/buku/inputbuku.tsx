import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";


export default function inputpagelaran() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState([]);
  const [filebukti, setfilebuktis] = useState<File>([]);

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

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    // let formData = new FormData();
    let formData = new FormData();
    formData.append("judul", event.target.judul.value);
    formData.append("kategori_jurnal", event.target.kategori.value);
    formData.append("nm_jurnal", event.target.nama.value);
    formData.append("keterangan", event.target.keterangan.value);
    formData.append("volume", event.target.volume.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("nomor", event.target.nomor.value);
    formData.append("halaman", event.target.halaman.value);
    formData.append("sitasi", event.target.sitasi.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/buku",
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { all_buku } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(all_buku);
        router.push("../buku/daftarbuku");
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
                    <p className="text-uppercase text-sm">Pagelaran Mahasiswa</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="judul" className="form-control-label">
                            Judul
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Judul"
                            id="judul"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="kategori" className="form-control-label">
                            Judul Kategori
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Judul Kategori"
                            id="kategori"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="nama" className="form-control-label">
                          Nama Jurnal
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nama Jurnal"
                            id="nama"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="keterangan" className="form-control-label">
                          Keterangan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Keterangan"
                            id="keterangan"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="volume" className="form-control-label">
                          Volume
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Volume"
                            id="volume"
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
                          <label htmlFor="nomor" className="form-control-label">
                          Nomor
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nomor"
                            id="nomor"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="halaman" className="form-control-label">
                            Halaman
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Halaman"
                            id="halaman"
                            required
                          />
                        </div>
                      </div> 

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="sitasi" className="form-control-label">
                            Sitasi
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Sitasi"
                            id="sitasi"
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
