import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

interface Mitra {
  namamitra: string;

}

export default function inputkerjasama() {
  const router = useRouter();

  const [dataMitras, setMitras] = useState<Mitra[]>([]);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_kjs",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { Mitra} = response.data;
        setMitras(Mitra);
        console.log(dataMitras);
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
    formData.append("NIDK", event.target.nidk.value);
    formData.append("NIK", event.target.nik.value);
    formData.append("NamaDosen", event.target.nama.value);
    formData.append("Agama", event.target.agama.value);
    formData.append("TempatLahir", event.target.tempatlahir.value);
    formData.append("TanggalLahir", event.target.tanggallahir.value);
    formData.append("StatusPerkawinan", event.target.statusK.value);
    formData.append("JenisKelamin", event.target.jenisK.value);

    formData.append("Golongan", event.target.golongan.value);
    formData.append("Pangkat", event.target.pangkat.value);
    formData.append("JabatanAkademik", event.target.jabatanA.value);
    formData.append("Alamat", event.target.alamat.value);
    formData.append("NoTelepon", event.target.notelp.value);
    formData.append("Email", event.target.email.value);

    console.log(formData);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/profildosens",
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
                    <p className="text-uppercase text-sm">Kerjasama</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="mitra" className="form-control-label">
                            MITRA
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="0"
                            id="mitra"
                          >
                            <option>Pilih Mitra</option>
                            {dataMitras.map((dataMitra) => {
                              
                                return (
                                  <option
                                    value={dataMitra.id}
                                    key={dataMitra.id}
                                  >
                                    {dataMitra.namamitra}
                                  </option>
                                );
                              
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tingkat" className="form-control-label">
                            Tingkat
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="0"
                            id="tingkat"
                          >
                            <option >Pilih Tingkatan</option>
                            <option value="Internasional">Internasional</option>
                            <option value="Nasional">Nasional</option>
                            <option value="Lokal">Lokal</option>
                            
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="kegiatan" className="form-control-label">
                            Judul Kegiatan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Judul Kegiatan"
                            id="kegiatan"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="manfaat" className="form-control-label">
                            Manfaat
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Manfaat"
                            id="manfaat"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="tanggallahir"
                            className="form-control-label"
                          >
                            Tanggal Lahir
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            placeholder="Pilih Tanggal"
                            id="tanggallahir"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="lamakegiatan"
                            className="form-control-label"
                          >
                            Lama Kegiatan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Lama Kegiatan"
                            id="lamakegiatan"
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="buktikerjasama"
                            className="form-control-label"
                          >
                            Bukti Kerjasama
                          </label>
                          <input className="form-control"  placeholder="Bukti Kerjasama" type="text" id="buktikerjasama" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="tahunberakhir"
                            className="form-control-label"
                          >
                            Tahun Berakhir
                          </label>
                          <input className="form-control"  placeholder="Tahun Berakhir" type="text" id="tahunberakhir"/>
                        </div>
                      </div>
                    </div>
                          <div className="row">
                                          <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="buktifile"
                            className="form-control-label"
                          >
                            Bukti File
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            placeholder="Email"
                            id="buktifile"
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
