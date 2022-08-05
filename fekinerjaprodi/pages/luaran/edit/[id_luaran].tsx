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
    `http://127.0.0.1:8000/api/show_luaran/${context.query.id_luaran}`
  );
  const res = await req.data.all_luaran;

  return {
    props: {
      luaran: res, // <-- assign response
    },
  };
}

export default function editluaran(props) {
  const router = useRouter();
  const { luaran } = props;
  const [dataLuaran, setLuaran] = useState(luaran);

  console.log(luaran);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataLuarans, setLuarans] = useState([]);

  // pake ngambil data untuk halaman input
  const pengambilData = async () => {
    
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
    formData.append("keterangan", event.target.keterangan.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("jenis_luaran", event.target.jenis.value);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/edit_luaran/${dataLuaran.id}` +
        `?_method=PUT`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { all_luaran } = response.data;
        //handle success
        toast.dismiss();
        toast.success("Login Sugses!!");
        // console.log(token);
        console.log(all_luaran);
        router.push("../../luaran/daftarluaran");
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
                    <p className="text-uppercase text-sm">Luaran Lainnya</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="judul" className="form-control-label">
                            judul
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="judul"
                            id="judul"
                            defaultValue={dataLuaran.judul}
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
                            defaultValue={dataLuaran.keterangan}
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
                            defaultValue={dataLuaran.tahun}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="jenis" className="form-control-label">
                          Jenis Luaran
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Jenis Luaran"
                            id="jenis"
                            defaultValue={dataLuaran.jenis_luaran}
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
