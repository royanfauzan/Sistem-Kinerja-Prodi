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
  const req = await axios.get(`http://127.0.0.1:8000/api/tampil_ProdukMHS/${context.query.id_produkmhs}`)
  const res = await req.data.all_produk

  return {
    props: {
      produkmhs: res // <-- assign response
    },
  }
}
// interface Kategori {
//   id: number;
//   nama: string;
//   created_at: string;
//   updated_at: string;
// }


export default function update_dataprodukmhs(props) {
  const { produkmhs } = props;
  console.log(produkmhs);

  const router = useRouter();

  const [dataprodukmhs, setdataprodukmhs] = useState(produkmhs);
  const [filebukti, setfilebuktis] = useState<File>([]);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);

  const [dataRole, setRole] = useState("");

  // state pake test user
  const [stadmin, setStadmin] = useState(false);
  const url = "http://127.0.0.1:8000/";
  const [dataurl, setUrl] = useState(url);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {

  }



  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
  useEffect(() => {


    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem('token');
    if (!lgToken) {
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
        const { level_akses } = response.data.user;
        const { role } = response.data.user;
        setRole(role);
        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
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
  }, []);

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);

  };
  // Insert Update Data
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
    // formData.append("_method","put");

    console.log(filebukti);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/ProdukMHS_Update/${dataprodukmhs.id}` + `?_method=PUT`,
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

      router.push("/produkMHS/daftarprodukmhs")
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
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
        <LayoutForm rlUser={dataRole}>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-8">
                <form id="inputDetilDosen" onSubmit={submitForm}>
                  <div className="card">
                    <div className="card-header pb-0">
                      <div className="d-flex align-items-center">
                        <h6 className="mb-0">Edit Data Produk Mahasiswa</h6>
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
                            <label htmlFor="nama_produk" className="form-control-label">
                              Nama Produk
                            </label>
                            <input
                              defaultValue={dataprodukmhs.nama_produk}
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
                              defaultValue={dataprodukmhs.deskripsi}
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
                              defaultValue={dataprodukmhs.tahun}
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
                              defaultValue={dataprodukmhs.deskripsi_bukti}
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
                            <div>
                              <a href={dataurl + dataprodukmhs.file_bukti}> {dataprodukmhs.file_bukti}</a> </div>
                            <input
                              className="form-control"
                              type="file"
                              onChange={handleChangeFile}
                              id="file_bukti"

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
