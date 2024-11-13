"use client";
import React from "react";
import "./pqrsd.css";
import Link from "next/link";
import { Topbar } from "@/components/topbar/Topbar";

const PQRSD = () => {
  const [arrayOpciones, setArrayOpciones] = React.useState<any>([
    {
      src: "https://www.cali.gov.co/participacion/publicaciones/43/oficina_de_atencin_al_ciudadano/info/principal/media/galeria/thumbs/thgaleria_100X100_251104.jpg",
      alt: "denunciaCorrupcion",
      text: "Realizar una denuncia sobre presunto hecho de corrupción.",
      link: '/corrupcion'
    },
    {
      src: "https://www.cali.gov.co/participacion/publicaciones/43/oficina_de_atencin_al_ciudadano/info/principal/media/galeria/thumbs/thgaleria_100X100_251107.jpg",
      alt: "radicacionSolicitudes",
      text: "Formulario de radicación de solicitudes, peticiones, quejas y reclamos.",
      link: '/formulario-pqrs'
    },
    {
      src: "https://www.cali.gov.co/participacion/publicaciones/43/oficina_de_atencin_al_ciudadano/info/principal/media/galeria/thumbs/thgaleria_100X100_251105.jpg",
      alt: "solicitudReservada",
      text: "Solicitud de información con identidad reservada.",
      link: 'https://www.procuraduria.gov.co/Pages/solicituddeinformacionconidentificacionreservada.aspx'
    },
    {
      src: "https://www.cali.gov.co/participacion/publicaciones/43/oficina_de_atencin_al_ciudadano/info/principal/media/galeria/thumbs/thgaleria_100X100_251106.jpg",
      alt: "peticionesSecretaria",
      text: "Peticiones a la Secretaría de Educación Distrital.",
      link: 'https://sac2.gestionsecretariasdeeducacion.gov.co/app_Login/?sec=16'
    },
  ]);
  return (
    <>
    <Topbar />
      <div className="w-full h-full flex flex-row justify-center items-center gap-3 px-10">
        {arrayOpciones.map((element: any, index: any) => (
          <div key={index} className="w-1/5">
            <Link href={element.link} className="flex flex-col justify-center items-center  hover:text-neutral-500">
              <img className="w-20" src={element.src} alt={element.alt} />
              <p className="m-0 p-2 text-center text-principal">
                {element.text}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PQRSD;
