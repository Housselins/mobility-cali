"use client";
import DirAgrYGI from "@/components/side-menu/opciones/DirAgrYGI";
import DirEntRel from "@/components/side-menu/opciones/dirEntRel";
import { Topbar } from "@/components/topbar/Topbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


export default function SMenu() {

  const [indx, setIndx] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const indxParam = urlParams.get('indx');
      setIndx(indxParam);
      console.log(typeof indxParam);
      console.log(indxParam);
    }
  }, []);

  const dataMostrar = () => {

    switch (indx) {
      case "DirEnt":
        return (<>
          <DirEntRel />
        </>)

      case "DirAgrYGI":
        return (<>
          <DirAgrYGI/>
        </>)

      default:
        return (<>
          <h2>No se ha encontrado informacion</h2>
        </>)
    }
  }

  return (
    <>
      <div className="w-full topbar">
        <Topbar />
      </div>
      <div className="w-full h-full pt-10 flex justify-center">
        {dataMostrar()}
      </div>
    </>
  )

}