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
    `http://127.0.0.1:8000/api/show_masastudi/${context.query.id_masastudi}`
  );
  const res = await req.data.all_masastudi;

  return {
    props: {
      masastudi: res, // <-- assign response
    },
  };
}

export default function editmasastudi(props) {
  const router = useRouter();
  const { masastudi } = props;
  const [dataMasastudi, setMasastudi] = useState(masastudi);

  console.log(masastudi);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataMasastudis, setMasastudis] = useState([]);
  const [selectMasastudi, setSelectMasastudi] = useState(masastudi.prodi_id);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Prodi",
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");
        const { Prodi } = response.data;
        setMasastudis(Prodi);
        console.log(dataMasastudis);
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

  const handleChangeMasastudi = (e) => {
    setSelectMasastudi(e.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("prodi_id", event.target.prodi.value);
    formData.append("tahun_masuk", event.target.tahun.value);
    formData.append("jmlh_mhs", event.target.jumlah_mhs.value);
    formData.append("lulus_thn_1", event.target.satu.value);
    formData.append("lulus_thn_2", event.target.dua.value);
    formData.append("lulus_thn_3", event.target.tiga.value);
    formData.append("lulus_thn_4", event.target.empat.value);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_masastudi/${dataMasastudi.id}` +
        `?_method=PUT`,
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
        router.push("../../masastudi/daftarmasastudi");
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
                      <p className="text-uppercase text-sm">
                        Masa Studi Lulusan
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="prodi"
                              className="form-control-label"
                            >
                              Prodi
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="prodi"
                              value={selectMasastudi}
                              onChange={handleChangeMasastudi}
                            >
                              <option>Pilih Prodi</option>
                              {dataMasastudis.map((userprodi) => {
                                {
                                  return (
                                    <option
                                      value={userprodi.id}
                                      key={userprodi.id}
                                    >
                                      {userprodi.prodi +
                                        ` ` +
                                        userprodi.nama_prodi}
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
                              htmlFor="tahun"
                              className="form-control-label"
                            >
                              Tahun Masuk
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tahun Masuk"
                              id="tahun"
                              defaultValue={dataMasastudi.tahun_masuk}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="jumlah_mhs"
                              className="form-control-label"
                            >
                              Jumlah Mahasiswa
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Jumlah Mahasiswa"
                              id="jumlah_mhs"
                              defaultValue={dataMasastudi.jmlh_mhs}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="satu"
                              className="form-control-label"
                            >
                              Jumlah Lulus Tahun 1
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Jumlah Lulus Tahun 1"
                              id="satu"
                              defaultValue={dataMasastudi.lulus_thn_1}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dua" className="form-control-label">
                              Jumlah Lulus Tahun 2
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Jumlah Lulus Tahun 2"
                              id="dua"
                              defaultValue={dataMasastudi.lulus_thn_2}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="tiga"
                              className="form-control-label"
                            >
                              Jumlah Lulus Tahun 3
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Jumlah Lulus Tahun 3"
                              id="tiga"
                              defaultValue={dataMasastudi.lulus_thn_3}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="empat"
                              className="form-control-label"
                            >
                              Jumlah Lulus Tahun 4
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Jumlah Lulus Tahun 4"
                              id="empat"
                              defaultValue={dataMasastudi.lulus_thn_4}
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
