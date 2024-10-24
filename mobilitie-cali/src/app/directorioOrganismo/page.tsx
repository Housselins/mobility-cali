"use client";

import { Footer } from "@/components/footer/Footer";
import { Topbar } from "@/components/topbar/Topbar";
import { useState } from "react";

export default function DirectorioOrganismo() {

  const [infoDirectorio, setInfoDirectiorio] = useState([{
    foto: "https://www.cali.gov.co/directorio/21/secretaria-de-movilidad/info/principal/media/directorio/thumbs/thdirectorio_220X220_22186.jpg",
    nombre: "Wilmer Tabares Marín",
    cargo: "Secretario de Despacho",
    telefono: "(602)4184205",
    correo: "wilmer.tabares@cali.gov.co",
    direccion: "Cra 3 #56-90 Barrio Salomia",
    link: "https://www.funcionpublica.gov.co/web/sigep2/hdv/-/directorio/S530952-0485-4/view",
  }, 
  {
    foto: "https://www.cali.gov.co/directorio/21/secretaria-de-movilidad/info/principal/media/directorio/thumbs/thdirectorio_220X220_22281.jpg",
    nombre: "Juan Manuel Guzmán",
    cargo: "Subsecretario de Movilidad Sostenible",
    telefono: "(602)4184242",
    correo: "juan.guzman.azc@cali.gov.co",
    direccion:"Calle 14 #1-03. Barrio Salomia",
    link: "https://www.funcionpublica.gov.co/web/sigep/hdv/-/directorio/S718017-0485-4/view",

  }]);
  return (
    <>
      <div className="h-full w-full overflow-hidden">
        <Topbar />
  
        <div className="pt-14 flex w-full justify-center">
          <div className="pl-6 w-full max-w-screen-lg">
            <div className="flex flex-row justify-between bg-neutral-300 w-full p-5 rounded-br-20">
              <p className="text-neutral-700 w-2/4">
                Listado de servidores públicos, empleados y contratistas del Estado registrados en el Sistema de Información y Gestión del Empleo Público - <strong>SIGEP II</strong>
              </p>
              <img className="w-32" src="https://www.cali.gov.co/directorio/21/secretaria-de-movilidad/info/tribunet/mod/Directorio/img/sigep-boton.png" alt="sigep_img" />
            </div>
  
            <br />
            <div className="overflow-y-scroll h-4/6">

            {infoDirectorio.map((content: any) => (
              <>
                <div className="mt-4 p-6 bg-neutral-300 rounded-br-20 flex flex-row gap-10 w-full">
                  <img className="rounded-full" src={content.foto} alt="img" />
                  <div className="bg-white w-full rounded-br-20 p-2">
                    <p className="text-neutral-800 text-2xl">{content.nombre}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <p>Direccion: {content.direccion}</p>
                      <p>Telefono: {content.telefono}</p>
                      <p>Correo: {content.correo}</p>
                      <p>Cargo: {content.cargo}</p>
                      <p>
                        Link: <a href={content.link} target="_blank">{content.nombre}</a>
                      </p>
                    </div>
                  </div>
                </div>
                <br />
              </>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  