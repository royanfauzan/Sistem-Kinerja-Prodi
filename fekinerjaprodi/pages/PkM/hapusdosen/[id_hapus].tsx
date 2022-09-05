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
    const req = await axios.get(`http://127.0.0.1:8000/api/PKM_relasidosen/${context.query.id_hapus}`)
    const res = await req.data.all_relasi

    return {
        props: {
            pkmdosen: res // <-- assign response
        },
    }
}

export default function hapusmhs(props) {
    const router = useRouter();
    const { id_hapus } = router.query;
    const { pkmdosen } = props;

    const [stadmin, setStadmin] = useState(false);
    const [pkm, setpkm] = useState(pkmdosen);
    const [id_pkm, setid_pkm] = useState(id_hapus);
    const MySwal = withReactContent(Swal);
    const [dataRole, setRole] = useState("");



    const pengambilData = async () => {
        const lgToken = localStorage.getItem("token");

        axios({
            method: "get",
            url: `http://127.0.0.1:8000/api/PKM_relasidosen/${id_pkm}`,
            headers: { Authorization: `Bearer ${lgToken}` },
        })
            .then(function (response) {
                console.log(response);
                console.log("Sukses");
                const { all_relasi } = response.data;
                setpkm(all_relasi);

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
                if (level_akses < 2) {
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

    const deletepkm = (id) => {
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/PKM_Deleterelasi_dosen/${id}`,
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
            const req = await axios.get(`http://127.0.0.1:8000/api/PKM_relasidosen/${id_pkm}`)
            const res = await req.data.all_relasi
            setpkm(res)
        } else {
            const req = await axios.get(
                `http://127.0.0.1:8000/api/PKM_relasisearch/${id_pkm}/${e.target.value}`
            )
            const res = await req.data.searchhapus
            setpkm(res)
            console.log(pkm);
            console.log(res);
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
                                    <h6>Tabel PKM</h6>
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
                                            <Link href={`/PkM/daftarpkm/`}>
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
                                                        Nama Dosen
                                                    </th>
                                                    <th className="text-uppercase text-dark text-xs font-weight-bolder opacity-9 ps-3">
                                                        NIDK
                                                    </th>


                                                    <th className="text-secondary opacity-7"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pkm.map((pkm, number) => {
                                                    return (
                                                        <tr key={`pkm` + pkm.id}>

                                                            <td className="ps-3 pe-3">
                                                                <p className="mb-0 text-sm">{number + 1}</p>
                                                            </td>


                                                            <td className="align-middle  text-sm">
                                                                <p className="text-xs font-weight-bold mb-0">
                                                                    {pkm.dosen.NamaDosen}
                                                                </p>
                                                            </td>

                                                            <td className="align-middle  text-sm">
                                                                <p className="text-xs font-weight-bold mb-0">
                                                                    {pkm.dosen.NIDK}
                                                                </p>
                                                            </td>


                                                            <td className="align-middle pe-3 text-end">


                                                                <button
                                                                    onClick={() => deletepkm(pkm.id)}
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