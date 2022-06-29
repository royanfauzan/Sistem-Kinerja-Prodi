import { useRouter } from 'next/router';
import axios from "axios";
import React, { useEffect } from 'react'

export default function index() {
    const router = useRouter();
    useEffect(()=>{
        
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/testaxios",
        })
        .then(function (response) {
                console.log(response);
                console.log('Sukses');
                const {profil} = response.data;
                console.log(profil);
        })
        .catch(function (err) {
            console.log('gagal');
            console.log(err.response);
        })
      },[]);
    return (
        <div>
            <button className="btn btn-primary m-3">Button Primary</button>
        </div>
    )
}
