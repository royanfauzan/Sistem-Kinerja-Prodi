import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../components/Organism/LoadingPage/LoadingUtama";

interface Udosen {
  NIDK: string;
  role: string;
  level_akses: number;
  profil_dosen: object;
  created_at: string;
  updated_at: string;
}

export default function inputprofil() {
  const router = useRouter();

  const [userDosens, setuserDosens] = useState<Udosen[]>([]);

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/testuser",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { userdosen } = response.data;
        setuserDosens(userdosen);
        console.log(userdosen);
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
        router.push("/profildosen/daftarprofil");
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
                    <p className="text-uppercase text-sm">Profil Dosen</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="nidk" className="form-control-label">
                            NIDK
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="0"
                            id="nidk"
                          >
                            <option>Pilih NIDK User</option>
                            {userDosens.map((userDosen) => {
                              if (
                                userDosen.role !== "admin" &&
                                !userDosen.profil_dosen
                              ) {
                                return (
                                  <option
                                    value={userDosen.NIDK}
                                    key={userDosen.NIDK}
                                  >
                                    {userDosen.NIDK}
                                  </option>
                                );
                              }
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="nik" className="form-control-label">
                            NIK
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="NIK dosen"
                            id="nik"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="nama" className="form-control-label">
                            Nama
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nama dosen"
                            id="nama"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="agama" className="form-control-label">
                            Agama
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Agama"
                            id="agama"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="tempatlahir"
                            className="form-control-label"
                          >
                            Tempat Lahir
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Tabanan"
                            id="tempatlahir"
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
                            htmlFor="jenisK"
                            className="form-control-label"
                          >
                            Jenis Kelamin
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="Laki-Laki"
                            id="jenisK"
                          >
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="statusK"
                            className="form-control-label"
                          >
                            Status Perkawinan
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="Belum Kawin"
                            id="statusK"
                          >
                            <option value="Belum Kawin">Belum Kawin</option>
                            <option value="Kawin">Kawin</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <hr className="horizontal dark" />
                    <p className="text-uppercase text-sm">Informasi Akademik</p>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="pangkat"
                            className="form-control-label"
                          >
                            Pangkat
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="pangkat"
                            id="pangkat"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="jabatanA"
                            className="form-control-label"
                          >
                            Jabatan Akademik
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Jabatan Akademik"
                            id="jabatanA"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="golongan"
                            className="form-control-label"
                          >
                            Golongan
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="golongan"
                            id="golongan"
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="horizontal dark" />
                    <p className="text-uppercase text-sm">Kontak</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email" className="form-control-label">
                            Email
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            id="email"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="notelp"
                            className="form-control-label"
                          >
                            Nomor Telpon
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="085******"
                            id="notelp"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="alamat"
                            className="form-control-label"
                          >
                            Alamat
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            id="alamat"
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
