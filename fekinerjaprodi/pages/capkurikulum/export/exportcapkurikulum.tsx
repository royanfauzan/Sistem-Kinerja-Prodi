import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Link from "next/link";

export default function pkm() {
    const router = useRouter();

    const [stadmin, setStadmin] = useState(false);
    const [tampilkurikulum, settampilkurikulum] = useState([]);
    const [anggota_dosens, setdataDosen] = useState([]);
    const [anggota_mahasiswas, setdataMahasiswa] = useState([]);

    const [dataRole, setRole] = useState("");

    const pengambilData = async () => {
        const lgToken = localStorage.getItem("token");

        axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/CapaianKurikulum",
            headers: { Authorization: `Bearer ${lgToken}` },
        })
            .then(function (response) {
                console.log(response);
                console.log("Sukses");
                const { all_capkurikulum } = response.data;
                settampilkurikulum(all_capkurikulum);

                console.log(all_capkurikulum);
            })
            .catch(function (err) {
                console.log("gagal");
                console.log(err.response);
            });
    };

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


    return (
        <>
            <LoadingUtama loadStatus={stadmin} />
            {stadmin && (
                <LayoutForm rlUser={dataRole}>
                    <div className="container-fluid py-4">
                        <div className="col-12">
                            <div className="card mb-4">
                                <style jsx>{`
                                    table,
                                    td,
                                    th {
                                    border: 1px solid !important ;
                                    text-align: center;
                                    }

                                    table {
                                    width: 100%;
                                    border-collapse: collapse;
                                    }
                                    
                                `}</style>
                                <div className="card-header">
                                    <h6>Export Kepuasan Mahasiswa</h6>
                                </div>
                                <div className="row justify-content-between mb-4">
                                    <div className="col-4">
                                        <div className="align-middle">
                                            <Link href={`/capkurikulum/daftarkurikulum/`}>
                                                <button className=" btn btn-primary border-0 shadow-sm pe-3 ms-3 ps-3 me-3 mt-3 mb-0">
                                                    Daftar Tabel
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-4 d-flex flex-row-reverse">
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="download-table-xls-button btn btn-success me-3 mt-3"
                                            table="tabelkurikulum"
                                            filename="tablexls"
                                            sheet="tablexls"
                                            buttonText="Export Excel" />
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <div className="table-responsive p-0">
                                        <table id="tabelkurikulum" className="table align-items-center mb-0 table-hover" border="1">
                                            <thead>
                                                <tr>
                                                    <th rowspan="2">NO</th>
                                                    <th rowspan="2">Semester</th>
                                                    <th rowspan="2">Kode Mata Kuliah</th>
                                                    <th rowspan="2">Nama <br />Mata <br /> Kuliah</th>
                                                    <th rowspan="2">Mata <br /> Kuliah <br /> Kompetensi</th>
                                                    <th colspan="3">Bobot Kredit (sks)</th>
                                                    <th rowspan="2">Konversi  <br />Kredit ke <br />Jam</th>
                                                    <th colspan="4">Capaian Pembelajaran</th>
                                                    <th rowspan="2">Dokumen <br />Rencana <br />Pembelajaran</th>
                                                    <th rowspan="2">Unit <br />Penyelenggara</th>
                                                </tr>
                                                <tr>
                                                    <th >Kuliah/ <br />Responsi/ <br />Tutorial</th>
                                                    <th >Seminar</th>
                                                    <th >Praktikum/ <br />Praktik/<br /> Praktik <br />Lapangan</th>

                                                    <th >Sikap</th>
                                                    <th >Pengetahuan</th>
                                                    <th >Keterampilan <br /> Umum</th>
                                                    <th >Keterampilan <br />Khusus</th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                {tampilkurikulum.map((tcap, number) => {
                                                    return (
                                                        <tr>
                                                            <td className="ps-3 pe-3">
                                                                <p className="mb-0 text-sm ">{number + 1}</p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.semester}
                                                                </p>
                                                            </td>
                                                            <td>
                                                                {tcap.anggota_matkuls.map((anggota_matkuls) => {
                                                                    return (
                                                                        <p className="mb-0 text-sm text-center" key='anggota.id'>
                                                                            {anggota_matkuls.kode_matkul}
                                                                        </p>
                                                                    );
                                                                })}
                                                            </td>
                                                            <td>
                                                                {tcap.anggota_matkuls.map((anggota_matkuls) => {
                                                                    return (
                                                                        <p className="mb-0 text-sm text-center" key='anggota.id'>
                                                                            {anggota_matkuls.nama_matkul}
                                                                        </p>
                                                                    );
                                                                })}
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.mata_kuliah_kompetensi}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.kuliah_responsi_tutorial}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.seminar}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.praktikum}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.konversi_kredit_jam}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.sikap}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.pengetahuan}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.ketrampilan_umum}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.ketrampilan_khusus}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.dok_ren_pembelajaran}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tcap.unit_penyelenggara}
                                                                </p>
                                                            </td>

                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <FooterUtama />
                    </div>
                </LayoutForm>
            )}
        </>
    );
}