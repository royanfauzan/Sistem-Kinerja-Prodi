import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
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
  const req = await axios.get(`http://127.0.0.1:8000/api/tampil_Integrasi/${context.query.id_integrasi}`)
  const integrasi = await req.data.all_integrasi



  const reqpenelitian = await axios.get(`http://127.0.0.1:8000/api/Penelitian/`)
  const penelitian = await reqpenelitian.data.all_penelitian

  const reqPKM = await axios.get(`http://127.0.0.1:8000/api/PKM/`)
  const PKM = await reqPKM.data.all_pkm

  const reqmatkul = await axios.get(`http://127.0.0.1:8000/api/Matkul/`)
  const matkul = await reqmatkul.data.all_matkul

  return {
    props: {
      integrasi: integrasi,
      penelitian: penelitian,
      PKM: PKM,
      matkul: matkul// <-- assign response
    },
  }
}
// interface Kategori {
//   id: number;
//   nama: string;
//   created_at: string;
//   updated_at: string;
// }


export default function update_dataintegrasi(props) {
  const { integrasi } = props;
  console.log(integrasi);

  const { dosen } = props;
  console.log(dosen);

  const { penelitian } = props;
  console.log(penelitian);

  const { PKM } = props;
  console.log(PKM);

  const { matkul } = props;
  console.log(matkul);

  const router = useRouter();


  const [dataIntegrasi, setdataIntegrasi] = useState(integrasi);
  const [dataDosen, setdataDosen] = useState(dosen);
  const [dataPenelitian, setdataPenelitian] = useState(penelitian);
  const [dataPKM, setdataPKM] = useState(PKM);
  const [datamatkul, setdatamatkul] = useState(matkul);
  const [filebukti, setfilebuktis] = useState<File>([]);
  const [dataError, setError] = useState([]);
  const MySwal = withReactContent(Swal);
  const penelitianref = useRef(null);
  const pkmref = useRef(null);

  const [dataRole, setRole] = useState("");


  // state pake test user
  const [stadmin, setStadmin] = useState(false);
  const url = "http://127.0.0.1:8000/";
  const [dataurl, setUrl] = useState(url);
  const [selectDosen, setSelectDosen] = useState(integrasi.dosen_id);
  const [selectPenelitian, setSelectPenelitian] = useState(integrasi.penelitian_id);
  const [selectPKM, setselectPKM] = useState(integrasi.PkM_id);
  const [selectMatkul, setselectMatkul] = useState(integrasi.matkul_id);

  const handleChangepnltn = (e) => {
    setSelectPenelitian(e.target.value);
    pkmref.current.value = null
  };

  const handleChangepkm = (e) => {
    setselectPKM(e.target.value);
    penelitianref.current.value = null
  };

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
      headers: { "Authorization": `Bearer ${lgToken}` },
    })
      .then(function (response) {
        console.log(response);
        console.log('Sukses');
        const { level_akses } = response.data.user;

        const { role } = response.data.user;
        setRole(role);
        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 2) {
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

  //HAPUS DATA


  // Insert Update Data
  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("dosen_id", event.target.profil_dosen_id.value);
    formData.append("penelitian_id", event.target.penelitian.value);
    formData.append("PkM_id", event.target.pkm.value);
    formData.append("matkul_id", event.target.matkul.value);
    formData.append("bentuk_integrasi", event.target.bentuk.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("file_bukti", filebukti);

    console.log(filebukti);


    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/Integrasi_Update/${dataIntegrasi.id}` + `?_method=PUT`,
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

        router.push("/integrasi/daftarintegrasi")
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

  const handleChangeDosen = (e) => {
    setSelectDosen(e.target.value);

  };

  const handleChangeMatkul = (e) => {
    setselectMatkul(e.target.value);

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
                        <h6 className="mb-0">Input Data Integrasi</h6>
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
                              htmlFor="profil_dosen_id"
                              className={dataError.dosen_id ? "is-invalid" : ""}
                            >
                              Profil Dosen
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              id="profil_dosen_id"

                              value={selectDosen}
                              onChange={handleChangeDosen}
                            >
                              <option value="">Pilih Profil Dosen</option>
                              {dataDosen.map((userdosen) => {
                                return (
                                  <option
                                    value={userdosen.id}
                                    key={userdosen.id}
                                  >
                                    {userdosen.NamaDosen +
                                      ` ` +
                                      userdosen.NIDK}
                                  </option>
                                );
                              })}
                            </select>
                            {dataError.dosen_id ? (
                              <div className="invalid-feedback">
                                {dataError.dosen_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="penelitian"
                              className={dataError.penelitian_id ? "is-invalid" : ""}>
                              Penelitian
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              ref={penelitianref}
                              defaultValue={selectPenelitian}
                              id="penelitian"
                              onChange={handleChangepnltn}
                            >
                              <option>Pilih Penelitian</option>
                              {dataPenelitian.map((Integrasi) => {
                                {
                                  return (
                                    <option
                                      value={Integrasi.id}
                                      key={Integrasi.id}
                                    >
                                      {Integrasi.tema_sesuai_roadmap + ' ' + Integrasi.judul}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                            {dataError.penelitian_id ? (
                              <div className="invalid-feedback">
                                {dataError.penelitian_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="pkm"
                              className={dataError.PkM_id ? "is-invalid" : ""}>
                              PKM
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              ref={pkmref}
                              defaultValue={selectPKM}
                              id="pkm"
                              onChange={handleChangepkm}
                            >
                              <option>Pilih PKM </option>
                              {dataPKM.map((dataPKM) => {
                                {
                                  return (
                                    <option
                                      value={dataPKM.id}
                                      key={dataPKM.id}
                                    >
                                      {dataPKM.tema_sesuai_roadmap + ' ' + dataPKM.judul_kegiatan}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                            {dataError.PkM_id ? (
                              <div className="invalid-feedback">
                                {dataError.PkM_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>



                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="matkul"
                              className={dataError.matkul_id ? "is-invalid" : ""}
                            >
                              Mata Kuliah
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                              value={selectMatkul}
                              id="matkul"
                              onChange={handleChangeMatkul}
                            >
                              <option value="">Pilih Mata Kuliah</option>
                              {datamatkul.map((userMatkul) => {
                                return (
                                  <option
                                    value={userMatkul.id}
                                    key={userMatkul.id}
                                  >
                                    {userMatkul.kode_matkul + ' ' + userMatkul.nama_matkul}
                                  </option>
                                );
                              })}
                            </select>
                            {dataError.matkul_id ? (
                              <div className="invalid-feedback">
                                {dataError.matkul_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="bentuk"
                              className={dataError.bentuk_integrasi ? "is-invalid" : ""}>
                              Bentuk Integrasi
                            </label>
                            <input
                              defaultValue={dataIntegrasi.bentuk_integrasi}
                              className="form-control"
                              type="text"
                              placeholder="Bentuk Integrasi"
                              id="bentuk"
                            />
                            {dataError.bentuk_integrasi ? (
                              <div className="invalid-feedback">
                                {dataError.bentuk_integrasi}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="tahun"
                              className={dataError.tahun ? "is-invalid" : ""}>
                              Tahun
                            </label>
                            <input
                              defaultValue={dataIntegrasi.tahun}
                              className="form-control"
                              type="text"
                              placeholder="Tahun"
                              id="tahun"
                            />
                            {dataError.tahun ? (
                              <div className="invalid-feedback">
                                {dataError.tahun}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="file_bukti"
                              className={dataError.file_bukti ? "is-invalid" : ""}>
                              File Bukti
                            </label>
                            <div>
                              <a href={dataurl + dataIntegrasi.file_bukti}> {dataIntegrasi.file_bukti}</a> </div>
                            <input
                              className="form-control"
                              type="file"
                              onChange={handleChangeFile}
                              id="file_bukti"
                            />
                            {dataError.file_bukti ? (
                              <div className="invalid-feedback">
                                {dataError.file_bukti}
                              </div>
                            ) : (
                              ""
                            )}
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
