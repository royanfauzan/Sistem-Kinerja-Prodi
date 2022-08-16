import React from 'react'

interface SimpleCardProps{
    judul:string,
    keterangan:string,
    halaman:string,
    icon:string
}

export default function CardSimple(props:SimpleCardProps) {
    const {judul,keterangan,halaman,icon} = props;

    return (
        <div className="col-4 mb-4">
        <div className="card">
          <div className="card-body border border-info rounded-3">
            <div className="d-flex justify-content-between p-md-1">
              <div className="d-flex flex-row">
                <div className="align-self-center">
                  <i className={`${icon} fs-2 me-4`}></i>
                </div>
                <div>
                  <h4>{judul}</h4>
                  <p className="mb-0">{keterangan}</p>
                </div>
              </div>
              <div className="align-self-center">
                <a href={`${halaman}`}><h2 className="h1 mb-0"><i className="bi bi-arrow-bar-right text-primary"></i></h2></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
