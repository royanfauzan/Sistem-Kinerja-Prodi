import React from 'react'

interface MenuCardProps{
    judul:string,
    jumlah:string,
    halaman:string,
    keterangan:string
}

export default function MenuCardUtama(props:MenuCardProps) {
    return (
        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4 mt-3">
          <div className="card">
            <div className="card-body p-3 ">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">{props.judul}</p>
                    <h5 className="font-weight-bolder">
                      {props.jumlah}
                    </h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">Jumlah </span>
                      {props.keterangan}
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <a href={props.halaman}>
                  <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                  <i className="bi bi-front"></i>
                  </div>
                  <p className="text-start text-bold fs-6o">Kelola</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
