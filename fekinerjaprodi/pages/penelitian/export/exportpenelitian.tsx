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

export default function penelitian() {
    const router = useRouter();

    const [stadmin, setStadmin] = useState(false);
    const [tampilpenelitian, settampilpenelitian] = useState([]);
    const [anggota_dosens, setdataDosen] = useState([]);
    const [anggota_mahasiswas, setdataMahasiswa] = useState([]);
    const [dataRole, setRole] = useState("");

    const pengambilData = async () => {
        const lgToken = localStorage.getItem("token");

        axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/Penelitian",
            headers: { Authorization: `Bearer ${lgToken}` },
        })
            .then(function (response) {
                console.log(response);
                console.log("Sukses");
                const { all_penelitian } = response.data;
                settampilpenelitian(all_penelitian);

                console.log(all_penelitian);
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
                                    <h6>Export Tabel Penelitian</h6>
                                </div>
                                <div className="row justify-content-between mb-4">
                                    <div className="col-4">
                                        <div className="align-middle">
                                            <Link href={`/penelitian/daftarpenelitian/`}>
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
                                            table="tabelpenelitian"
                                            filename="tablexls"
                                            sheet="tablexls"
                                            buttonText="Export Excel" />
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <div className="table-responsive p-0">
                                        <table id="tabelpenelitian" className="table align-items-center mb-0 table-hover" border="1">
                                            <thead>
                                                <tr>
                                                    <th rowspan="2">NO</th>
                                                    <th rowspan="2">Nama Dosen</th>
                                                    <th rowspan="2">Tema Penelitian Sesuai Roadmap</th>
                                                    <th rowspan="2">Nama Mahasiswa</th>
                                                    <th rowspan="2">Judul Kegiatan</th>
                                                    <th rowspan="2">Tahun <br />(YYYY)</th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                {tampilpenelitian.map((tpenelitian, number) => {
                                                    return (
                                                        <tr key={`tpenelitian` + tpenelitian.id}>

                                                            <th>
                                                                <p className="mb-0 text-sm">{number + 1}</p>
                                                            </th>

                                                            <th>
                                                                {tpenelitian.anggota_dosens.map(
                                                                    (anggota_dosens) => {
                                                                        return (
                                                                            <p className="mb-0 text-sm text-center" key='anggota.id'>
                                                                                {anggota_dosens.NamaDosen}
                                                                            </p>
                                                                        );
                                                                    })}
                                                            </th>

                                                            <th className="align-middle ">
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tpenelitian.tema_sesuai_roadmap}
                                                                </p>
                                                            </th>

                                                            <th>
                                                                {tpenelitian.anggota_mahasiswas.map((anggota_mahasiswas) => {
                                                                    return (
                                                                        <p className="mb-0 text-sm text-center" key='anggota.id'>
                                                                            {anggota_mahasiswas.nama}
                                                                        </p>
                                                                    );
                                                                })}
                                                            </th>

                                                            <th>
                                                                <p className="mb-0 text-sm text-center">
                                                                    {tpenelitian.judul}
                                                                </p>
                                                            </th>

                                                            <th className="mb-0 text-sm text-center">
                                                                <p className="mb-0 text-sm">
                                                                    {tpenelitian.tahun}
                                                                </p>
                                                            </th>


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