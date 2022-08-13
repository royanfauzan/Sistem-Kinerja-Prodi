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
    const req  = await axios.get(`http://127.0.0.1:8000/api/show_tempat/${context.query.id_tempat}`)
    const res  = await req.data.all_tempat
  
    return {
      props: {
          tempat: res // <-- assign response
      },
    }
  }

export default function edittempat(props) {
  const router = useRouter();
  const {tempat}=props;
  const [dataTempat, setTempat] = useState(tempat);
 
console.log(tempat);

   // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataTempats, setTempats] = useState([]);
  const [selectTempat, setSelectTempat] = useState(tempat.kepuasan_id);

  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/kepuasan",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_prodi} = response.data;
        setTempats(all_prodi);
        console.log(dataTempats);
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

  const handleChangeTempat = (e) => {
    setSelectTempat(e.target.value);
   
  };


  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("kepuasan_id", event.target.kepuasan.value);
    formData.append("lokal", event.target.lokal.value);
    formData.append("nasional", event.target.nasional.value);
    formData.append("multinasional", event.target.multinasional.value);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_tempat/${dataTempat.id}` + `?_method=PUT`,
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
        console.log(response.data);
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
                    <p className="text-uppercase text-sm">Prestasi Mahasiswa</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="kepuasan" className="form-control-label">
                            Tahun Kepuasan Lulusan
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"

                            id="kepuasan"
                            value={selectTempat}
                            onChange={handleChangeTempat}
                          >
                            <option>Pilih Tahun Lulusan</option>
                            {dataTempats.map((userkepuasan) => {
                               {
                                return (
                                  <option
                                    value={userkepuasan.id}
                                    key={userkepuasan.id}
                                  >
                                    {userkepuasan.tahun}
                                  </option>
                                );
                              }
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="lokal" className="form-control-label">
                            Tempat Kerja Lokal
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Jumlah kerja lokal"
                            id="lokal"
                            defaultValue={dataTempat.lokal}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="nasional" className="form-control-label">
                            Tempat Kerja Nasional
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Jumlah kerja nasional"
                            id="nasional"
                            defaultValue={dataTempat.nasional}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="multinasional" className="form-control-label">
                            Tempat Kerja Multinasional
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Jumlah kerja multi masional"
                            id="multinasional"
                            defaultValue={dataTempat.multinasional}
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
