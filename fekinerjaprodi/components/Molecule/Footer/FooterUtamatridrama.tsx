import React from 'react'

export default function FooterUtama() {
    return (
        <footer className="footer ms-4 me-3 mt-3 pt-3 bg-white pb-3 rounded">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                © 2022{" "}
                <i className="fa fa-heart" aria-hidden="true"></i> 
                  Manajemen Informatika |  Politeknik Negeri Bali.
              </div>
            </div>
            <div className="col-lg-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                ©{" "}
                <i className="fa fa-heart" aria-hidden="true"></i> 
                  Sistem Informasi Program Studi
              </div>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
}
