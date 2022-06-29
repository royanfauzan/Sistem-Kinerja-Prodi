import React, { ReactNode } from "react";
import NavbarUtama from "../../Molecule/Navbar/NavbarUtama";
import SidebarUtama from "../../Molecule/Sidebar/SidebarUtama";

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutForm(props: LayoutProps) {
  const { children } = props;
  return (
    <>
      <div className="min-height-300 bg-primary position-absolute w-100"></div>
      <SidebarUtama />
      <main className="main-content border-radius-lg ">
        <NavbarUtama />
        {children}
      </main>
    </>
  );
}
