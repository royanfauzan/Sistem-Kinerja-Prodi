import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
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
    `http://127.0.0.1:8000/api/tampil_luarandos/${context.query.id_luaran}`
  );
  const { dataluaran, profildosens } = await req.data;

  return {
    props: {
      dataluaran: dataluaran, // <-- assign response
      dataprofils: profildosens, // <-- assign response
    },
  };
}

export default function editluarandsn(props) {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const { dataluaran, dataprofils } = props;
  const apiurl = "http://127.0.0.1:8000/";

  const [userDosens, setuserDosens] = useState(dataprofils);
  const [dataProdis, setdataProdis] = useState([]);
  const [dataKeterangan, setdataKeterangan] = useState(
    "HKI: a) Paten, b) Paten Sederhana"
  );
  const [dataIdKetua, setdataIdKetua] = useState(
    dataluaran.anggota_dosens[0].pivot.id
  );
  const [userDosen, setuserDosen] = useState();
  const [dataLuaran, setdataLuaran] = useState(dataluaran);
  const [UsrSekarang, setUsrSekarang] = useState();
  const [filebukti, setfilebuktis] = useState<File>([]);

  const refTambahSelect = useRef(null);

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
        ubahKeterangan(dataluaran.jenis_luaran);

        // kalo ga admin dipindah ke halaman lain
        if (level_akses !== 2) {
          return router.push("/rekognisi/export/exportluaran");
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
    formData.append("keterangan", event.target.keterangan.value);
    formData.append("jenis_luaran", event.target.jenis_luaran.value);
    formData.append("tahun", event.target.tahun.value);

    console.log(formData);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/update_luarandos/${dataLuaran.id}?_method=PUT`,
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
        router.push("/luaranlaindos/tabelluarandsn");
      })
      .catch(function (error) {
        toast.dismiss();
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            router.push("/luaranlaindos/tabelluarandsn");
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

  function ubahKeterangan(jenisket: string) {
    switch (jenisket) {
      case "I":
        setdataKeterangan("HKI: a) Paten, b) Paten Sederhana");
        break;
      case "II":
        setdataKeterangan(
          "HKI: a) Hak Cipta, b) Desain Produk Industri,  c) Perlindungan Varietas Tanaman (Sertifikat Perlindungan Varietas Tanaman, Sertifikat Pelepasan Varietas, Sertifikat Pendaftaran Varietas), d) Desain Tata Letak Sirkuit Terpadu, e) dll.)"
        );
        break;
      case "III":
        setdataKeterangan(
          "Teknologi Tepat Guna, Produk (Produk Terstandarisasi, Produk Tersertifikasi), Karya Seni, Rekayasa Sosial"
        );
        break;
      case "IV":
        setdataKeterangan("Buku ber-ISBN, Book Chapter");
        break;
      default:
        setdataKeterangan("");
        break;
    }
  }

  const handleChangeFile = (e) => {
    setfilebuktis(e.target.files[0]);
  };

  const handleSelectChange = (e) => {
    ubahKeterangan(e.target.value);
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
    // console.log(id);
    // console.log(dataIdKetua);
    if (id != dataIdKetua) {
      MySwal.fire({
        title: "Yakin Hapus Anggota?",
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

          toast.loading("Loading...");
          const lgToken = localStorage.getItem("token");

          // let formData = new FormData();
          // formData.append("profil_dosen_id", refTambahSelect.current.value);
          axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/hapusanggota_luarandos/${id}`,
            headers: {
              Authorization: `Bearer ${lgToken}`,
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              const { dataluaran, profildosens } = response.data;
              setuserDosens(profildosens);
              setdataLuaran(dataluaran);
              toast.dismiss();
              toast.success("Anggota Berhasil Dihapus");
            })
            .catch(function (err) {
              console.log("gagal");
              console.log(err.response);
              toast.dismiss();
              toast.error("Anggota Gagal Ditambah");
            });
        }
      });
    } else {
      toast.error("Tidak dapat menghapus ketua!!");
    }
  };

  const tambahanggota = (id) => {
    const idusertambah = refTambahSelect.current.value;

    toast.loading("Loading...");
    const lgToken = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("profil_dosen_id", idusertambah);
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/tambahanggota_luarandos/${id}`,
      data: formData,
      headers: {
        Authorization: `Bearer ${lgToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { dataluaran, profildosens } = response.data;
        setuserDosens(profildosens);
        setdataLuaran(dataluaran);
        toast.dismiss();
        toast.success("Anggota Berhasil Ditambah");
      })
      .catch(function (err) {
        toast.dismiss();
        toast.error("Gagal Menambah anggota");
        console.log("gagal");
        console.log(err.response);
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
                      <p className="text-uppercase text-sm">Data luaran</p>
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
                        luaran: Detail luaran
                      </p>
                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group">
                            <label
                              htmlFor="jenis_luaran"
                              className={
                                "form-control-label " + dataError.jenis_luaran
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Kategori luaran
                            </label>

                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={dataLuaran.jenis_luaran}
                              onChange={handleSelectChange}
                              id="jenis_luaran"
                            >
                              <option value={`I`}>
                                I | Paten/Paten Sederhana
                              </option>
                              <option value={`II`}>II | Hak Cipta</option>
                              <option value={`III`}>
                                III | Teknologi Tepat Guna
                              </option>
                              <option value={`IV`}>IV | Buku ISBN</option>
                            </select>

                            {dataError.jenis_luaran ? (
                              <div className="invalid-feedback">
                                {dataError.jenis_luaran}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="row text-sm">
                            <div className="col-3 ">
                              <p className="text-sm">Mencakup : </p>
                            </div>
                            <div className="col-8">
                              <p className="text-sm">{dataKeterangan}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">
                        luaran: Data luaran
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
                              Judul Luaran
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="judul"
                              defaultValue={dataLuaran.judul}
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
                              defaultValue={dataLuaran.tahun}
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
                        <div className="col-6">
                          <div className="form-group">
                            <label
                              htmlFor="JMSC"
                              className={
                                "form-control-label " + dataError.keterangan
                                  ? "is-invalid"
                                  : ""
                              }
                            >
                              Keterangan Luaran
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="Ket"
                              defaultValue={dataLuaran.keterangan}
                              id="keterangan"
                            />
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
                        Kenaggotaan: Anggota luaran
                      </p>
                      <div className="row">
                        <div className="col-12">
                          <CardSertif judul={"List Anggota"}>
                            <div className="col-12">
                              {dataLuaran &&
                                (dataLuaran.anggota_dosens.length ? (
                                  dataLuaran.anggota_dosens.map(
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
                                              {anggota.pivot.id !=
                                              dataIdKetua ? (
                                                <div className="col">
                                                  <button
                                                    className="btn btn-sm btn-danger border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2"
                                                    type={`button`}
                                                    onClick={() =>
                                                      deleteanggota(
                                                        anggota.pivot.id
                                                      )
                                                    }
                                                  >
                                                    <i className="bi bi-person-x"></i>
                                                  </button>
                                                </div>
                                              ) : (
                                                <></>
                                              )}
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
                            <div className="col-12 mt-4">
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
                                      ref={refTambahSelect}
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

                                    {dataError.profil_dosen_id_tambah ? (
                                      <div className="invalid-feedback">
                                        {dataError.profil_dosen_id_tambah}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <button
                                  className="btn btn-sm btn-outline-info border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2"
                                  type={`button`}
                                  onClick={() => tambahanggota(dataLuaran.id)}
                                >
                                  Tambah anggota luaran
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
