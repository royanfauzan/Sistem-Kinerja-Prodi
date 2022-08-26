import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import FooterUtama from "../../Molecule/Footer/FooterUtama";
import NavbarUtama from "../../Molecule/Navbar/NavbarUtama";
import SidebarDosen from "../../Molecule/Sidebar/SidebarDosen";
import SidebarUtama from "../../Molecule/Sidebar/SidebarUtama";
import style from "./laydash.module.css";

interface LayoutProps {
  rlUser: String;
  children: ReactNode;
}

export default function LayoutDashboardBlue(props: LayoutProps) {
  const router = useRouter()
  const { children,rlUser } = props;
  const role = rlUser;

  const pathHalaman = router.asPath
  const arrHalaman = pathHalaman.split("/")
  const HalamanActive = arrHalaman.slice(-1)[0]


  const listFolderDashboard = ["dashboards"]
  const isMenuDashboard = listFolderDashboard.includes(arrHalaman[1])

  const listFolderSdm = [
    "sdm",
    "rekognisi",
    "publikasidos",
    "penelitiandosen",
    "pkmdosen",
    "profildosen",
    "profildetail",
    "dtps",
    "ewmp",
    "produk",
    "luaranlaindos",
    "mengajar",
    "bukujurnal",
    "bimbingan",
  ]
  const isMenuSdm = listFolderSdm.includes(arrHalaman[1])

  const listFolderPendidikan = [
    "dashboards_eva",
    "capkurikulum",
    "integrasi",
    "kepuasanmhs",
    "matkul",
    "mahasiswa",
  ]
  const isMenuPendidikan = listFolderPendidikan.includes(arrHalaman[1])

  const listFolderCapaian = ["dashboards_capaian_tridarma", "prestasi", "ipk"]
  const isMenuCapaian = listFolderCapaian.includes(arrHalaman[1])

  const listFolderKjsMhsKeuangan = ["dashboard_rona"]
  const isMenuKjsMhsKeuangan = listFolderKjsMhsKeuangan.includes(arrHalaman[1])

  const listFolderUser = ["User"]
  const isMenuUser = listFolderUser.includes(arrHalaman[1])

  let namaKriteria = ''
  let linkKriteria = ''

  if (isMenuSdm) {
    namaKriteria='Sumber Daya Manusia'
    linkKriteria='/sdm/dashboardsdmadm'
    if (rlUser=='dosen') {
      linkKriteria='/sdm/dashboardsdm'
    }
  }

  if (isMenuKjsMhsKeuangan) {
    namaKriteria='Kerjasama'
    linkKriteria='/dashboard_rona/dashboard_tb124'
  }

  if (isMenuCapaian) {
    namaKriteria='Capaian Tridharma'
    linkKriteria='/dashboards_capaian_tridarma/dashboardtridarma'
  }

  if (isMenuPendidikan || HalamanActive=='dashboardpendidikan') {
    namaKriteria='Pendidikan'
    linkKriteria='/dashboards/dashboardpendidikan'
    if (rlUser=='dosen') {
      linkKriteria='/sdm/dashboardsdm'
    }
  }
  return (
    <>
      <div className={`bg-primary position-absolute w-100 h-100`}>
        <div className={`w-100 sticky-top bg-primary`}>
          {role == "dosen" ? <SidebarUtama /> : <SidebarDosen />}
          <main className="main-content border-radius-lg ">
            <NavbarUtama rlUser={rlUser} kriteria={namaKriteria} halaman={linkKriteria}/>
            {children}
          </main>
        </div>
      </div>
    </>
    
  );
}
