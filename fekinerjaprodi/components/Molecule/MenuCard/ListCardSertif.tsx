import Link from "next/link";
import React from "react";

interface ListCardProps {
  judul: string;
  halamanEdit: string;
  halaman: string;
  icon: string;
}

export default function ListCardSertif(props: ListCardProps) {
  const { judul, halamanEdit, halaman, icon } = props;
  return (
    <div className="row d-flex justify-content-between">
      <div className="col-6 d-flex align-items-center">
        <div className="d-flex px-0 py-1 align-items-center">
          <div>
            <i className={`${icon} fs-6 text-danger opacity-10`}></i>
          </div>
          <div className="ms-3">
            <a href={halaman}>
              <h6 className="text-sm mb-0">{judul}</h6>
            </a>
          </div>
        </div>
      </div>
      <div className="col-2 d-flex align-items-center">
        <div className="row">
          <div className="col">
            <Link href={`${halamanEdit}`}>
              <button className="btn btn-sm btn-outline-warning border-0 shadow-sm ps-3 pe-3 mb-2 me-3 mt-2">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
