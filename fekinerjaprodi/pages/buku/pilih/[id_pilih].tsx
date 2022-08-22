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
    `http://127.0.0.1:8000/api/show_buku/${context.query.id_pilih}`
  );
  const res = await req.data.all_buku;

  return {
    props: {
      buku: res, // <-- assign response
    },
  };
}

export default function editbuku(props) {
  const router = useRouter();
  const { id_pilih } = router.query;
  const { buku } = props;
  const [dataBuku, setBuku] = useState(buku);
  const [dataRole, setRole] = useState("");

  console.log(buku);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [dataBukus, setBukus] = useState([]);
  const [selectBuku, setSelectBuku] = useState(buku.mahasiswa_id);
  const [selectId, setSelectId] = useState(id_pilih);

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
        setBukus(all_mhs);
        console.log(dataBukus);
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

  const handleChangeLuaran = (e) => {
    setSelectBuku(e.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("mahasiswa_id", event.target.mahasiswa.value);
    formData.append("keanggotaan", event.target.anggota.value);
    formData.append("buku_id", selectId);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/buku_mhs/${dataBuku.id}`,
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
        router.push("../../buku/daftarbuku");
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
                      <p className="text-uppercase text-sm">Jurnal Mahasiswa</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="mahasiswa"
                              className="form-control-label"
                            >
                              Nama Mahasiswa
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="mahasiswa"
                              value={selectBuku}
                              onChange={handleChangeLuaran}
                            >
                              <option>Mahasiswa</option>
                              {dataBukus.map((usermahasiswa) => {
                                {
                                  return (
                                    <option
                                      value={usermahasiswa.id}
                                      key={usermahasiswa.id}
                                    >
                                      {usermahasiswa.nama}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="anggota" className="form-control-label">
                            Keanggotaan
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="0"
                            id="anggota"
                          >
                            <option >Keanggotaan</option>
                            <option value="Anggota"> Anggota</option>
                            <option value="Ketua"> Ketua</option>
                            
                          </select>
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
