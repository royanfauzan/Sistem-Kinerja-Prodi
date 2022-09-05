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
    `http://127.0.0.1:8000/api/show_tulisan/${context.query.id_tulisan}`
  );
  const res = await req.data.all_tulisan;

  return {
    props: {
      tulisan: res, // <-- assign response
    },
  };
}

export default function editpagelaran(props) {
  const router = useRouter();
  const { tulisan } = props;
  const [dataTulisan, setTulisan] = useState(tulisan);
  const [selectPrestasi, setSelectPrestasi] = useState(tulisan.dosen_id);
  const [selectKategori, setselectKategori] = useState(tulisan.ruang_lingkup);
  const [filebukti, setfilebuktis] = useState<File>([]);
  const [dataRole, setRole] = useState('');

  console.log(tulisan);

  // State Select
  const [stadmin, setStadmin] = useState(false);

  const url = "http://127.0.0.1:8000/";
  const [dataurl, setUrl] = useState(url);
  const [dataTulisans, setTulisans] = useState([]);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    const lgToken = localStorage.getItem('token');
    if (!lgToken) {
      router.push('/login')
    }

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profildosens",
      headers: { "Authorization": `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log('Sukses');
        const { profilDosens } = response.data;
        setTulisans(profilDosens);
      })
      .catch(function (err) {
        console.log('gagal');
        console.log(err.response);
        return router.push('/');
      })
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
        const { role } = response.data.user;
        setRole(role);
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

  const handleChangeKategori = (e) => {
    setselectKategori(e.target.value);
  };

  const handleChangePrestasi = (e) => {
    setSelectPrestasi(e.target.value);
   
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("dosen_id", event.target.dosen.value);
    formData.append("judul", event.target.judul.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("nm_media", event.target.media.value);
    formData.append("ruang_lingkup", event.target.ruang.value);
    formData.append("file_bukti", filebukti);

    console.log(filebukti);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_tulisan/${dataTulisan.id}` +
        `?_method=PUT`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { all_tulisan } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(all_tulisan);
        router.push("../../tulisan/daftartulisan");
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
        <LayoutForm rlUser={dataRole}>
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
                      <p className="text-uppercase text-sm">
                        Tulisan Mahasiswa
                      </p>
                      <div className="row">

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="dosen" className="form-control-label">
                            Mahasiswa
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"

                            id="dosen"
                            value={selectPrestasi}
                            onChange={handleChangePrestasi}
                          >
                            <option>Pilih Mahasiswa</option>
                            {dataTulisans.map((userdosen) => {
                               {
                                return (
                                  <option
                                    value={userdosen.id}
                                    key={userdosen.id}
                                  >
                                    {userdosen.NamaDosen + ` ` + userdosen.NIDK}
                                  </option>
                                );
                              }
                            })}
                          </select>
                        </div>
                      </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="judul"
                              className="form-control-label"
                            >
                              Judul Tulisan
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Judul Tulisan"
                              id="judul"
                              defaultValue={dataTulisan.judul}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tahun"
                              className="form-control-label"
                            >
                              Tahun
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tahun"
                              id="tahun"
                              defaultValue={dataTulisan.tahun}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="media"
                              className="form-control-label"
                            >
                              Nama Media
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Nama Media"
                              id="media"
                              defaultValue={dataTulisan.nm_media}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="ruang" className="form-control-label">
                              Ruang Lingkup
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="ruang"
                              value={selectKategori}
                              onChange={handleChangeKategori}
                              required
                            >
                              <option>Tingkat Prestasi</option>
                              <option value="wilayah"> Lokal</option>
                              <option value="nasional"> Nasional</option>
                              <option value="internasional">
                                {" "}
                                Internasional
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="file_bukti"
                              className="form-control-label"
                            >
                              File Bukti
                            </label>
                            <div>
                              <a href={dataurl + dataTulisan.file_bukti}>
                                {" "}
                                {dataTulisan.file_bukti}
                              </a>{" "}
                            </div>
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
