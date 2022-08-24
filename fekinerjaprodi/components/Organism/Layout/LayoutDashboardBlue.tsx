import React, { ReactNode } from "react";
import NavbarUtama from "../../Molecule/Navbar/NavbarUtama";
import SidebarDosen from "../../Molecule/Sidebar/SidebarDosen";
import SidebarUtama from "../../Molecule/Sidebar/SidebarUtama";
import style from "./laydash.module.css";

interface LayoutProps {
  rlUser: String;
  children: ReactNode;
}

export default function LayoutDashboardBlue(props: LayoutProps) {
  const { children, rlUser } = props;
  const role = rlUser;
  return (
    <>
      <div className={`bg-primary position-absolute w-100 `}>
        <div className={`w-100 sticky-top bg-primary`}>
          {role == "admin" ? <SidebarUtama /> : <SidebarDosen />}
          <main className="main-content border-radius-lg ">
            <NavbarUtama rlUser={rlUser}/>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
