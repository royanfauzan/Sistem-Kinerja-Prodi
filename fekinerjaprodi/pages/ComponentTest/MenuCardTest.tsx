import React from 'react'
import Carddashboard from '../../components/Molecule/MenuCard/Carddashboard'
import CardSimple from '../../components/Molecule/MenuCard/CardSimple'
import ListCardDash from '../../components/Molecule/MenuCard/ListCardDash'
import MenuCardUtama from '../../components/Molecule/MenuCard/MenuCardUtama'

export default function MenuCardTest() {
    return (
        <>
        <MenuCardUtama judul={`Tulisan Media`} jumlah={`5`} halaman={`/TulisanMedia/`} keterangan={'Data tulisan media yang dibuat oleh dosen'} />
        <CardSimple judul={`Tulisan Media`} icon={`bi bi-pencil text-success`} halaman={`/TulisanMedia/`} keterangan={'Data tulisan media yang dibuat oleh dosen'} />
        <Carddashboard judul={`Kriteria Sumber Daya Manusia`}>
            <ListCardDash judul={'Publikasi Dosen'} keterangan={`export data publikasi`} halaman={'/publikasidos/export/export_publikasidos'} icon={`bi bi-card-text`}/>
            <ListCardDash judul={'Luaran Lainnya'} keterangan={`kelola data Luaran Dosen`} halaman={'#'} icon={`bi bi-calendar3-range`}/>
        </Carddashboard>
        </>
    )
}
