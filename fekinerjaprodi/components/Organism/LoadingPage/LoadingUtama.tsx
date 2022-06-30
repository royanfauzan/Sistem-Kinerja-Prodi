import Image from 'next/image';
import React from 'react'
import loadw from './loadw.module.css'

interface StatusLoad {
    loadStatus: boolean;
}

export default function LoadingUtama(props:StatusLoad) {
    const {loadStatus} = props;
    const classtambahan = loadStatus?'d-none':'';

    console.log(classtambahan);
    return (
        <div className={`container-fluid position-relative `+ loadw.fpload + ' ' +classtambahan}>
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className={loadw.load}></div>
            </div>
            <div className="position-absolute top-50 start-50 translate-middle">
                <Image className={loadw.loadGmb} width={150} height={150} src="/img/argon/LOgoPNB.png" alt=""/>
            </div>
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className={loadw.loadSmal}></div>
            </div>
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className={loadw.loadSmaler}></div>
            </div>
        </div>
    )
}
