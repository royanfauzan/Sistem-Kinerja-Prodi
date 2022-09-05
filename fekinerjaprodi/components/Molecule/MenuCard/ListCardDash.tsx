import React from "react";

interface ListCardProps{
    judul:string,
    keterangan:string,
    halaman:string,
    icon:string
}

export default function ListCardDash(props:ListCardProps) {
    const {judul,keterangan,halaman,icon} = props;
  return (
    <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
      <div className="d-flex align-items-center">
        <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
          <i className={`${icon} fs-6 text-white opacity-10`}></i>
        </div>
        <div className="d-flex flex-column">
          <h6 className="mb-1 text-dark text-sm">{judul}</h6>
          <span className="text-xs">
            {keterangan}
          </span>
        </div>
      </div>
      <div className="d-flex">
        <a href={halaman}>
        <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
          <i className="bi bi-caret-right fs-4" aria-hidden="true"></i>
        </button>
        </a>
      </div>
    </li>
  );
}
