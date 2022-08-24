import React, { ReactNode } from "react";
import NavbarUtama from "../../Molecule/Navbar/NavbarUtama";
import SidebarDosen from "../../Molecule/Sidebar/SidebarDosen";
import SidebarUtama from "../../Molecule/Sidebar/SidebarUtama";


interface LayoutProps {
  rlUser: String;
  children: ReactNode;
}

export default function LayoutForm(props: LayoutProps) {
  const { children, rlUser } = props;
  const role = rlUser;

  return (
    <>
      <div className={`min-height-300 bg-primary position-absolute w-100`}>
        
      </div>
      {role == "admin" ? <SidebarUtama /> : <SidebarDosen />}
      <main className="main-content border-radius-lg ">
        <NavbarUtama rlUser={rlUser}/>
        {children}
      </main>
    </>
  );
}
