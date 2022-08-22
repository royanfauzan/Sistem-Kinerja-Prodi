import React, { ReactNode } from "react";

interface CardDashProps {
  children: ReactNode;
  judul: string;
}

export default function CardSertif(props: CardDashProps) {
  const { children, judul } = props;
  return (
    <div className="row mt-4 mb-4">
      <div className="col-12 mb-lg-0 mb-4">
        <div className="card ">
          <div className="card-header pb-0 p-3">
            <div className="d-flex justify-content-between">
              <h6 className="mb-2">{judul}</h6>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
            {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
