import React from "react";

interface KelolaCardProps {
  judul: string;
  keterangan: string;
  halaman: string;
  icon?: string;
  lebar?: string;
}

export default function CardKelolaSimple(props: Partial<KelolaCardProps>) {
  const { judul, keterangan, halaman } = props;
  let icon = "bi bi-box";
  if (props.icon) {
    icon = props.icon;
  }

  let lebar = "col-4";
  if (props.lebar) {
    lebar = props.lebar;
  }

  return (
    <div className={`${lebar} mt-3`}>
      <div className="card">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-9">
              <h5 className="card-title">{judul}</h5>
              <p className="card-text">{keterangan}</p>
            </div>
            <div className="col-3">
              <div className="row">
                {" "}
                <i className={`${icon} fs-1 text-center`}></i>
              </div>
            </div>
          </div>

          <div className="row justify-content-center px-2">
            <a href={halaman} className="btn btn-primary mb-1">
              Kelola Data
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
