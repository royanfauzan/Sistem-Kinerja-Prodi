import React from 'react'
import MenuCardUtama from '../../components/Molecule/MenuCard/MenuCardUtama'

export default function MenuCardTest() {
    return (
        <MenuCardUtama judul={`Tulisan Media`} jumlah={`5`} halaman={`/TulisanMedia/`} keterangan={'Data tulisan media yang dibuat oleh dosen'} />
    )
}
