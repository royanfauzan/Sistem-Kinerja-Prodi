import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";

interface Mitra {
  namamitra: string;

}

// Untuk Ngambil Data Berdasarkan ID
export async function getServerSideProps(context) {

    //http request
    const req  = await axios.get(`http://127.0.0.1:8000/api/show_kjs/${context.query.id_kjs}`)
    const res  = await req.data.tampil_kerjasama
  
    return {
      props: {
          kerjasama: res // <-- assign response
      },
    }
  }

export default function editkerjasama(props) {
  const router = useRouter();
  const {kerjasama}=props;
  const [dataKerjasama, setKerjasama] = useState(kerjasama);
  const [filebukti, setFilebukti] = useState<File>();
 
console.log(kerjasama);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataMitras, setMitras] = useState([]);
  const url="http://127.0.0.1:8000/";
  const [dataurl, setUrl] = useState(url);
  const [selectMitra, setSelectMitra] = useState(kerjasama.mitra_id);
  const [selectBidang, setSelectBidang] = useState(kerjasama.bidang);


  // pake ngambil data untuk halaman input
  const pengambilData = async () =>{

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/read_mitra",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { tampil_mitras} = response.data;
        setMitras(tampil_mitras);
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

  const handleChangeFile = (e) => {
    setFilebukti(e.target.files[0]);
   
  };

  const handleChangeMitra = (e) => {
    setSelectMitra(e.target.value);
   
  };

  const handleChangeBidang = (e) => {
    setSelectBidang(e.target.value);
   
  };


  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("idmitra", event.target.mitra.value);
    formData.append("tingkat", event.target.tingkat.value);
    formData.append("judul_kegiatan", event.target.kegiatan.value);
    formData.append("manfaat", event.target.manfaat.value);
    formData.append("tanggal_kegiatan", event.target.tanggalkegiatan.value);
    formData.append("lama_kegiatan", event.target.lamakegiatan.value);
    formData.append("bukti_kerjasama", event.target.buktikerjasama.value);
    formData.append("tahun_berakhir", event.target.tahunberakhir.value);
    formData.append("bidang", event.target.bidang.value);
    formData.append("file_bukti", filebukti);
    
  

    console.log(filebukti);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_kjs/${dataKerjasama.id}`,
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
        // router.push("/");
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
                          
                            id="mitra"
                            value={selectMitra}
                            onChange={handleChangeMitra}
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
                          <label htmlFor="mitra" className="form-control-label">
                            Bidang
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="bidang"
                            value={selectBidang}
                            onChange={handleChangeBidang}
                          >
                            <option value="">Pilih Bidang</option>
                            {dataMitras.map((dataMitra) => {
                              
                                return (
                                  <option
                                    value={dataMitra.bidang}
                                   
                                  >
                                    {dataMitra.bidang}
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
                            defaultValue={dataKerjasama.tingkat}
                            id="tingkat"
                          >
                            <option value="">Pilih Tingkatan</option>
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
                            defaultValue={dataKerjasama.judul_kegiatan}
                            
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
                            defaultValue={dataKerjasama.manfaat}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="tanggalkegiatan"
                            className="form-control-label"
                          >
                            Tanggal Kegiatan
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            placeholder="Pilih Tanggal"
                            id="tanggalkegiatan"
                            defaultValue={dataKerjasama.tanggal_kegiatan}
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
                            defaultValue={dataKerjasama.lama_kegiatan}
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
                          <input className="form-control" 
                           placeholder="Bukti Kerjasama"
                            type="text" 
                            id="buktikerjasama" 
                            defaultValue={dataKerjasama.bukti_kerjasama}/>
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
                          <input className="form-control"  
                          placeholder="Tahun Berakhir"
                           type="text" 
                           id="tahunberakhir"
                           defaultValue={dataKerjasama.tahun_berakhir}
                           />
                         
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
                          <div>
                          <a href={dataurl+dataKerjasama.file_bukti}> {dataKerjasama.file_bukti}</a> </div>
                          <input
                          
                            className="form-control"
                            type="file"
                            onChange={handleChangeFile}
                           
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
