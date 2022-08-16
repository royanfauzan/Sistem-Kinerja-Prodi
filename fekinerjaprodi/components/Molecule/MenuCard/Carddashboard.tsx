import React, { ReactNode } from 'react'

interface CardDashProps {
    children: ReactNode;
    judul:string;
  }

export default function Carddashboard(props:CardDashProps) {
    const { children,judul } = props;

    return (
        <div className="col-11 mb-3">
          <div className="card">
            <div className="card-header pb-0 p-2">
              <h6 className="mb-0 ms-2 me-2 border-bottom text-bolder">{judul}</h6>
            </div>
            <div className="card-body p-3">
              <ul className="list-group">
                
                {children}
                
                
              </ul>
            </div>
          </div>
        </div>
    )
}
