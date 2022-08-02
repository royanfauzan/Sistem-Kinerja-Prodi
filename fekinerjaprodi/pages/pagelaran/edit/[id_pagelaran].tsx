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
  const req = await axios.get(
    `http://127.0.0.1:8000/api/show_pagelaran/${context.query.id_pagelaran}`
  );
  const res = await req.data.all_pagelaran;

  return {
    props: {
      pagelaran: res, // <-- assign response
    },
  };
}

export default function editpagelaran(props) {
  const router = useRouter();
  const { pagelaran } = props;
  const [dataPagelaran, setPagelaran] = useState(pagelaran);
  const [filebukti, setfilebuktis] = useState<File>([]);

  console.log(pagelaran);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  
  const url = "http://127.0.0.1:8000/";
  const [dataurl, setUrl] = useState(url);
  const [dataPagelarans, setPagelarans] = useState([]);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Mahasiswa",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { all_mhs } = response.data;
        setPagelarans(all_mhs);
        console.log(dataPagelarans);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
      });
  };

  // Setelah halaman Loading nya muncul, ini jalan
  // untuk mastiin yg akses halaman ini user admin
  useEffect(() => {
    // cek token, kalo gaada disuruh login
    const lgToken = localStorage.getItem("token");
    if (!lgToken) {
      router.push("/login");
    }

    // perjalanan validasi token
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_user",
      headers: { Authorization: `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { level_akses } = response.data.user;
        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 3) {
          return router.push("/");
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin
        setStadmin(true);
        pengambilData();
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
        return router.push("/");
      });
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("judul", event.target.judul.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("penyelenggara", event.target.penyelenggara.value);
    formData.append("ruang_lingkup", event.target.ruang.value);
    formData.append("file_bukti", filebukti);

    console.log(filebukti);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_pagelaran/${dataPagelaran.id}` +
        `?_method=PUT`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { all_pagelaran } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(all_pagelaran);
        router.push("../../pagelaran/daftarpagelaran");
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

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);

  };

  return (
    <>
      <LoadingUtama loadStatus={stadmin} />
      {stadmin && (
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
                            Judul Pagelaran
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Judul Pagelaran"
                            id="judul"
                            defaultValue={dataPagelaran.judul}
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
                            defaultValue={dataPagelaran.tahun}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="penyelenggara" className="form-control-label">
                          Penyelenggara
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Penyelenggara"
                            id="penyelenggara"
                            defaultValue={dataPagelaran.penyelenggara}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="ruang" className="form-control-label">
                          Ruang Lingkup
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="K Seminarategori"
                            id="ruang"
                            defaultValue={dataPagelaran.ruang_lingkup}
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
                              <a href={dataurl + dataPagelaran.file_bukti}> {dataPagelaran.file_bukti}</a> </div>
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
