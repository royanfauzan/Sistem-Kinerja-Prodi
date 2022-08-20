import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardSertif from "../../../components/Molecule/MenuCard/CardSertif";
import ListCardSertif from "../../../components/Molecule/MenuCard/ListCardSertif";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export async function getServerSideProps(context) {
  //http request
  const req = await axios.get(
    `http://127.0.0.1:8000/api/tampil_jurnal/${context.query.id_jurnal}`
  );
  const {datajurnal,profildosens} = await req.data;

  return {
    props: {
      datajurnal: datajurnal, // <-- assign response
      dataprofils: profildosens, // <-- assign response
    },
  };
}

export default function editjurnaldsn(props) {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const { datajurnal,dataprofils } = props;
  const apiurl = "http://127.0.0.1:8000/";

  const [userDosens, setuserDosens] = useState(dataprofils);
  const [dataProdis, setdataProdis] = useState([]);
  const [userDosen, setuserDosen] = useState();
  const [dataJurnal, setdataJurnal] = useState(datajurnal);
  const [UsrSekarang, setUsrSekarang] = useState();
  const [filebukti, setfilebuktis] = useState<File>([]);

  const [dataError, setError] = useState([]);

  const [dataRole, setRole] = useState("");

  const [selectedId, setSelectedId] = useState();

  // state pake test user
  const [stadmin, setStadmin] = useState(false);

  // pake ngambil data untuk halaman input
  const pengambilData = async (nidk) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/get_profildosen/${nidk}`,
    })
      .then(function (response) {
        console.log(response);
        console.log("Sukses");

        const { profilDosen } = response.data;
        console.log("INI DOSEN YG LOGIN");
        console.log(profilDosen);
        setuserDosen(profilDosen);
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
        const { NIDK } = response.data.user;
        const userSekarang = response.data.user;
        const { role } = response.data.user;
        setRole(role);
        setUsrSekarang(userSekarang);
        console.log(UsrSekarang);
        pengambilData(NIDK);

        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 2) {
          return router.push("/rekognisi/export/exportjurnal");
        }
        // yg non-admin sudah dieliminasi, berarti halaman dah bisa ditampilin

        setStadmin(true);
      })
      .catch(function (err) {
        console.log("gagal");
        console.log(err.response);
        return router.push("/dashboard/dashboardadmin");
      });
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("profil_dosen_id", event.target.profil_dosen_id.value);
    formData.append("judul", event.target.judul.value);
    formData.append("nm_jurnal", event.target.nm_jurnal.value);
    formData.append("keterangan", event.target.keterangan.value);
    formData.append("volume", event.target.volume.value);
    formData.append("nomor", event.target.nomor.value);
    formData.append("halaman", event.target.halaman.value);
    formData.append("kategori_jurnal", event.target.kategori_jurnal.value);
    formData.append("tahun", event.target.tahun.value);
    formData.append("sitasi", event.target.sitasi.value);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_jurnal/${dataJurnal.id}?_method=PUT`,
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
        toast.success("Simpan Sukses Sugses!!");
        // console.log(token);
        console.log(profil);
        router.push("/bukujurnal/tabeljurnaldsn");
      })
      .catch(function (error) {
        toast.dismiss();
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            router.push("/bukujurnal/tabeljurnaldsn");
          }, 500);
        } else {
          setError(error.response.data.error);
          if (error.response.status == 400) {
            toast.error("Periksa Kelengkapan Data!!");
          } else {
            toast.error("Periksa Kelengkapan Data");
          }
        }

        console.log("tidak success");
        console.log(error.response);
      });
  };

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);
  };

  const clickSelectId = (e) => {
    const value = e.target.value;
    let dosz;
    userDosens.forEach((dos) => {
      if (e.target.value == dos.NIDK) {
        setSelectedId(dos);
        dosz = dos;
      }
    });
    console.log(e.target.value);
    console.log(dosz);
  };

  const deleteanggota = (id) => {
    MySwal.fire({
      title: "Yakin Hapus Data rekognisi?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak",
      confirmButtonText: "Ya",
    }).then((result) => {
      // <--
      if (result.isConfirmed) {
        // <-- if confirmed
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/hapusanggota_jurnal/${id}`,
        })
          .then(function (response) {
            const { datajurnal, profildosens } = response.data;
            setuserDosens(profildosens);
            setdataJurnal(datajurnal);
          })
          .catch(function (err) {
            console.log("gagal");
            console.log(err.response);
          });
      }
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
                        <p className="mb-0">Pembimbing Utama Tugas akhir</p>
                        <button
                          className="btn btn-primary btn-sm ms-auto"
                          type="submit"
                        >
                          Update Data
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="text-uppercase text-sm">Data Jurnal</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="profil_dosen_id"
                              className={
                                "form-control-label " +
                                dataError.profil_dosen_id
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Nama Dosen
                            </label>

                            {userDosen && (
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                defaultValue={userDosen.id}
                                id="profil_dosen_id"
                              >
                                <option value={userDosen.id} key={userDosen.id}>
                                  {userDosen.NamaDosen}
                                </option>
                              </select>
                            )}

                            {dataError.profil_dosen_id ? (
                              <div className="invalid-feedback">
                                {dataError.profil_dosen_id}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">
                        Jurnal: Detail Jurnal
                      </p>
                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group">
                            <label
                              htmlFor="kategori_jurnal"
                              className={
                                "form-control-label " +
                                dataError.kategori_jurnal
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Jenis Jurnal
                            </label>

                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={dataJurnal.kategori_jurnal}
                              id="kategori_jurnal"
                            >
                              <option value={`Jurnal Tidak Terakreditasi`}>
                                Jurnal Tidak Terakreditasi
                              </option>
                              <option value={`Jurnal Nasional Terakreditasi`}>
                                Jurnal Nasional Terakreditasi
                              </option>
                              <option value={`Jurnal Internasional`}>
                                Jurnal Internasional
                              </option>
                              <option value={`Jurnal Internasional Bereputasi`}>
                                Jurnal Internasional Bereputasi
                              </option>
                              <option value={`Bab Buku`}>Bab/Buku</option>
                            </select>

                            {dataError.kategori_jurnal ? (
                              <div className="invalid-feedback">
                                {dataError.kategori_jurnal}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">
                        Jurnal: Data Jurnal
                      </p>
                      <div className="row">
                        <div className="col-8">
                          <div className="form-group">
                            <label
                              htmlFor="judul"
                              className={
                                "form-control-label " + dataError.judul
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Judul Jurnal
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="judul"
                              defaultValue={dataJurnal.judul}
                              id="judul"
                            ></textarea>
                            {dataError.judul ? (
                              <div className="invalid-feedback">
                                {dataError.judul}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label
                              htmlFor="JMSC"
                              className={
                                "form-control-label " + dataError.nm_jurnal
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Nama Jurnal
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="JiPANI"
                              defaultValue={dataJurnal.nm_jurnal}
                              id="nm_jurnal"
                            />
                            {dataError.nm_jurnal ? (
                              <div className="invalid-feedback">
                                {dataError.nm_jurnal}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label
                              htmlFor="tahun"
                              className={
                                "form-control-label " + dataError.tahun
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Tahun
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="2020"
                              defaultValue={dataJurnal.tahun}
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
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <div className="form-group">
                            <label
                              htmlFor="volume"
                              className={
                                "form-control-label " + dataError.volume
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Volume
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="VII"
                              defaultValue={dataJurnal.volume}
                              id="volume"
                            />
                            {dataError.volume ? (
                              <div className="invalid-feedback">
                                {dataError.volume}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label
                              htmlFor="nomor"
                              className={
                                "form-control-label " + dataError.nomor
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Nomor
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="7"
                              defaultValue={dataJurnal.nomor}
                              id="nomor"
                            />
                            {dataError.nomor ? (
                              <div className="invalid-feedback">
                                {dataError.nomor}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label
                              htmlFor="halaman"
                              className={
                                "form-control-label " + dataError.halaman
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Halaman
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="20-77"
                              defaultValue={dataJurnal.halaman}
                              id="halaman"
                            />
                            {dataError.halaman ? (
                              <div className="invalid-feedback">
                                {dataError.halaman}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-4 ">
                          <div className="form-group">
                            <label
                              htmlFor="sitasi"
                              className={
                                "form-control-label " + dataError.sitasi
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Sitasi
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              defaultValue={dataJurnal.sitasi}
                              id="sitasi"
                            />
                            {dataError.sitasi ? (
                              <div className="invalid-feedback">
                                {dataError.sitasi}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <div className="form-group">
                            <label
                              htmlFor="keterangan"
                              className={
                                "form-control-label " + dataError.keterangan
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Keterangan
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="keterangan"
                              id="keterangan"
                              defaultValue={dataJurnal.keterangan}
                            ></textarea>
                            {dataError.keterangan ? (
                              <div className="invalid-feedback">
                                {dataError.keterangan}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">
                        Kenaggotaan: Anggota Jurnal
                      </p>
                      <div className="row">
                        <div className="col-12">
                          <CardSertif judul={"List Anggota"}>
                            <div className="col-12">
                              {dataJurnal &&
                                (dataJurnal.anggota_dosens.length ? (
                                  dataJurnal.anggota_dosens.map(
                                    (anggota, indx) => {
                                      return (
                                        <div
                                          className={`row`}
                                          key={`anggta${indx}`}
                                        >
                                          <div className="col-6 d-flex align-items-center">
                                            <div className="d-flex px-0 py-1 align-items-center">
                                              <div>
                                                <i
                                                  className={`bi bi-align-end fs-6 text-danger opacity-10`}
                                                ></i>
                                              </div>
                                              <div className="ms-3">
                                                <h6 className="text-sm mb-0">
                                                  {anggota.NamaDosen}
                                                </h6>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-2 d-flex align-items-center">
                                            <div className="row">
                                              <div className="col">
                                                <button className="btn btn-sm btn-danger border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                                  <i className="bi bi-person-x"></i>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )
                                ) : (
                                  <></>
                                ))}
                            </div>
                            <div className="col-12">
                            <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="profil_dosen_id_tambah"
                                      className={
                                        "form-control-label " +
                                        dataError.profil_dosen_id
                                          ? "is-invalid"
                                          : ""
                                      }
                                    >
                                      Pilih Dosen
                                    </label>

                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      id="profil_dosen_id_tambah"
                                    >
                                      {userDosens.map((userdosen) => {
                                        return (
                                          <option
                                            value={userdosen.id}
                                            key={userdosen.id}
                                          >
                                            {userdosen.NamaDosen}
                                          </option>
                                        );
                                      })}
                                    </select>

                                    {dataError.profil_dosen_id ? (
                                      <div className="invalid-feedback">
                                        {dataError.profil_dosen_id}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <button className="btn btn-sm btn-outline-info border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                                  Tambah anggota Jurnal
                                </button>
                              </div>
                            </div>
                          </CardSertif>
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
          <Toaster />
        </LayoutForm>
      )}
    </>
  );
}
