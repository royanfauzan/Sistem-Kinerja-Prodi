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
    `http://127.0.0.1:8000/api/tampil_Penelitian/${context.query.id_pilih_dosen}`
  );
  const res = await req.data.all_penelitian;

  return {
    props: {
      pkm: res, // <-- assign response
    },
  };
}

export default function editluaran(props) {
  const router = useRouter();
  const { id_pilih_dosen } = router.query;
  const { pkm } = props;
  const [datapkm, setpkm] = useState(pkm);

  console.log(pkm);

  // State Select
  const [stadmin, setStadmin] = useState(false);
  const [datapkms, setpkms] = useState([]);
  const [selectpkm, setSelectpkm] = useState(pkm.dosen_id);
  const [selectId, setSelectId] = useState(id_pilih_dosen);
  const [dataDosen, setdataDosen] = useState([]);

  const [dataRole, setRole] = useState("");

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

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profildosens",
      headers: { "Authorization": `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log('Sukses');
        const { profilDosens } = response.data;
        setdataDosen(profilDosens);
        console.log("aaaaaaaaaaaaa");
        console.log(profilDosens);
      })
      .catch(function (err) {
        console.log('gagal');
        console.log(err.response);
        return router.push('/');
      })

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
        if (level_akses !== 2) {
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

  const handleChangePKM = (e) => {
    setSelectpkm(e.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("profil_dosen_id", event.target.profil_dosen.value);
    formData.append("keanggotaan", event.target.anggota.value);
    formData.append("pkm_id", selectId);

    axios({
      method: "post",
      url:
        `http://127.0.0.1:8000/api/PKM_dosen/${datapkms.id}`,
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
        router.push("../../PkM/daftarpkm");
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
                        <h6 className="mb-0">Pilih ID Dosen</h6>
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
                            <label
                              htmlFor="profil_dosen"
                              className="form-control-label"
                            >
                              Nama Dosen
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="profil_dosen"
                              value={selectpkm}
                              onChange={handleChangePKM}
                            >
                              <option>Pilih Dosen</option>
                              {dataDosen.map((userdosens) => {
                                {
                                  return (
                                    <option
                                      value={userdosens.id}
                                      key={userdosens.id}
                                    >
                                      {userdosens.NamaDosen}
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
                            <option value="Ketua"> Ketua</option>
                            <option value="Anggota"> Anggota</option>
                            
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
