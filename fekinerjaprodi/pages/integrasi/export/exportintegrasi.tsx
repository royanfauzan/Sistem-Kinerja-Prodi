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

export default function integrasi() {
    const router = useRouter();

    const [stadmin, setStadmin] = useState(false);
    const [tampilintegrasi, settampilintegrasi] = useState([]);

    const pengambilData = async () => {
        const lgToken = localStorage.getItem("token");

        axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/Integrasi",
            headers: { Authorization: `Bearer ${lgToken}` },
        })
            .then(function (response) {
                console.log(response);
                console.log("Sukses");
                const { all_integrasi } = response.data;
                settampilintegrasi(all_integrasi);

                console.log(all_integrasi);
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
                <LayoutForm>
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
                                <div className="card-header pb-0">
                                    <div className="row justify-content-between">
                                        <div className="col-4">
                                            <h6>Export Data Integrasi</h6>
                                        </div>
                                        <div className="row justify-content-between mb-4">
                                            <div className="col-4">
                                                <div className="align-middle">
                                                    <Link href={`/integrasi/daftarintegrasi/`}>
                                                        <button className=" btn btn-primary border-0 shadow-sm pe-3 ps-3 me-3 mt-3 mb-0">
                                                            Daftar Tabel
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-4 d-flex flex-row-reverse">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button btn btn-success mt-3"
                                                    table="tabelintegrasi"
                                                    filename="tablexls"
                                                    sheet="tablexls"
                                                    buttonText="Export Excel" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body p-3">
                                    <div className="table-responsive p-0"></div>
                                    <table id="tabelintegrasi" border="1">
                                        <thead>
                                            <tr>
                                                <th>NO</th>
                                                <th>Judul Penelitian/PkM</th>
                                                <th>Nama Dosen</th>
                                                <th>Mata Kuliah</th>
                                                <th>Bentuk Integrasi</th>
                                                <th>Tahun <br />(YYYY)</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {tampilintegrasi.map((tintegrasi, number) => {
                                                return (
                                                    <tr key={`tintegrasi` + tintegrasi.id}>
                                                        <td>
                                                            <p className="mb-0 text-sm">{number + 1}</p>
                                                        </td>


                                                        <td className="align-middle ">
                                                            <p className="mb-0 text-sm text-center">

                                                                {tintegrasi.penelitian ? (

                                                                    <p className="text-xs font-weight-bold mb-0 pe-3">
                                                                        {tintegrasi.penelitian.judul}
                                                                    </p>

                                                                ) : (
                                                                    <></>
                                                                )}

                                                                {tintegrasi.pkm ? (

                                                                    <p className="text-xs font-weight-bold mb-0 pe-3">
                                                                        {tintegrasi.pkm.judul_kegiatan}
                                                                    </p>

                                                                ) : (
                                                                    <></>
                                                                )}

                                                            </p>
                                                        </td>


                                                        <td className="align-middle ">
                                                            <p className="mb-0 text-sm text-center">
                                                                {tintegrasi.profil_dosen.NamaDosen}
                                                            </p>
                                                        </td>

                                                        <td className="align-middle ">
                                                            <p className="mb-0 text-sm text-center">
                                                                {tintegrasi.matkul.nama_matkul}
                                                            </p>
                                                        </td>

                                                        <td className="align-middle ">
                                                            <p className="mb-0 text-sm text-center">
                                                                {tintegrasi.bentuk_integrasi}
                                                            </p>
                                                        </td>

                                                        <td className="mb-0 text-sm text-center">
                                                            <p className="mb-0 text-sm">
                                                                {tintegrasi.tahun}
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
                        <FooterUtama />
                    </div>
                </LayoutForm>
            )
            }
        </>
    );
}
