import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FooterUtama from "../../../components/Molecule/Footer/FooterUtama";
import CardUtama from "../../../components/Molecule/ProfileCard.tsx/CardUtama";
import LayoutForm from "../../../components/Organism/Layout/LayoutForm";
import LoadingUtama from "../../../components/Organism/LoadingPage/LoadingUtama";
import Link from "next/link";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"


export async function getServerSideProps(context) {

    //http request
    const req = await axios.get(`http://127.0.0.1:8000/api/CapaianKurikulum_relasimatkul/${context.query.id_hapus}`)
    const res = await req.data.all_relasi

    return {
        props: {
            kurikulum: res // <-- assign response
        },
    }
}

export default function hapusmhs(props) {
    const router = useRouter();
    const { id_hapus } = router.query;
    const { kurikulum } = props;

    const [stadmin, setStadmin] = useState(false);
    const [kurikulummatkul, setkurikulummatkul] = useState(kurikulum);
    const [id_kurikulum, setid_kurikulum] = useState(id_hapus);
    const MySwal = withReactContent(Swal);
    const [dataRole, setRole] = useState("");

    

    const pengambilData = async () => {
        const lgToken = localStorage.getItem("token");

        axios({
            method: "get",
            url: `http://127.0.0.1:8000/api/CapaianKurikulum_relasimatkul/${id_kurikulum}`,
            headers: { Authorization: `Bearer ${lgToken}` },
        })
            .then(function (response) {
                console.log(response);
                console.log("Sukses");
                const { all_relasi } = response.data;
                setkurikulummatkul(all_relasi);

                console.log(id_hapus);
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

    const deletepenelitian = (id) => {
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/CapaianKurikulum_Deleterelasi_matkul/${id}`,
        })
            .then(function (response) {
                router.reload();
            })
            .catch(function (err) {
                console.log("gagal");
                console.log(err.response);
            });
    };

    const searchdata = async (e) => {
        if (e.target.value == "") {
            const req = await axios.get(`http://127.0.0.1:8000/api/CapaianKurikulum_relasimatkul/`)
            const res = await req.data.all_relasi
            setkurikulummatkul(res)
        } else {
            const req = await axios.get(
                `http://127.0.0.1:8000/api/CapaianKurikulum_relasisearch/${e.target.value}`
            )
            const res = await req.data.searchhapus
            setkurikulummatkul(res)
        }
    }


    return (
        <>
            <LoadingUtama loadStatus={stadmin} />
            {stadmin && (
                <LayoutForm rlUser={dataRole}>
                    <div className="container-fluid py-4">
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header pb-0">
                                    <h6>Hapus ID Matkul</h6>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-3 d-flex flex-row-reverse pe-2">
                                        <input
                                            className="form-control d-flex flex-row-reverse me-3"
                                            type="search"
                                            placeholder="Search.."
                                            aria-label="Search"
                                            defaultValue=""
                                            id="search"
                                            onChange={searchdata}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-between mb-4">
                                    <div className="col-4">
                                        <div className="align-middle">
                                            <Link href={`/capkurikulum/daftarkurikulum/`}>
                                                <button className=" btn btn-primary border-0 shadow-sm ms-3 ps-3 pe-3 ps-3 me-3 mt-3 mb-0">
                                                    Daftar Tabel
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body px-0 pt-0 pb-2">
                                    <div className="table-responsive p-0">
                                        <table className="table align-items-center mb-0 table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                                                        NO
                                                    </th>
                                                    <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                                                        Kode Matkul
                                                    </th>
                                                    <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                                                        Nama Matkul
                                                    </th>


                                                    <th className="text-secondary opacity-7"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {kurikulummatkul.map((kurikulum, number) => {
                                                    return (
                                                        <tr key={`kurikulum` + kurikulum.id}>

                                                            <td className="ps-3 pe-3">
                                                                <p className="mb-0 text-sm">{number + 1}</p>
                                                            </td>



                                                            <td className="align-middle  text-sm">
                                                                <p className="text-xs font-weight-bold mb-0">
                                                                    {kurikulum.matkul.kode_matkul}
                                                                </p>
                                                            </td>


                                                            <td className="align-middle  text-sm">
                                                                <p className="text-xs font-weight-bold mb-0">
                                                                    {kurikulum.matkul.nama_matkul}
                                                                </p>
                                                            </td>




                                                            <td className="align-middle pe-3 text-end">


                                                                <button
                                                                    onClick={() => deletepenelitian(kurikulum.id)}
                                                                    className="btn btn-sm btn-danger border-0 shadow-sm ps-3 pe-3 mb-2 mt-2"
                                                                >
                                                                    Hapus
                                                                </button>
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