"use client";

import { Footer } from "@/components/footer/Footer";
import { Topbar } from "@/components/topbar/Topbar";
import { useState } from "react";

export default function HorariosDeAtencion() {

  const [infoAtencion, setInfoAtencion] = useState([{

    titulo: "Sedes de atención de la Secretaría de Movilidad",
    horarios: ["Lunes a viernes, de 8:00 a.m.a 12:00 a.m.y 2:00 p.m.a 5:00 p.m."],
    sedes: [{
      nombre: "Sede Principal Salomia",
      direccion: "Carrera 3 No 56 - 90"
    },
    {
      nombre: "Sede Grupo Técnico",
      direccion: "Carrera 1 No 14 - 02"
    }]
  },
  {
    titulo: "Sedes de Programas de Servicios de Tránsito",
    horarios: ["Lunes a viernes, de 7: 30 a.m.a 5:00 p.m. (Jornada Continua)", "Sábados: 9:00 a.m.a 12:00 m"],
    sedes: [
      {
        nombre: "Sameco CDAV",
        direccion: "Calle 70N No 3BN - 200"
      }, {
        nombre: "Salomia",
        direccion: "Carrera 3 No 56 - 30"
      },
      {
        nombre: "Centro Comercial Automotriz",
        direccion: "Calle 52 No 1b - 160"
      },
      {
        nombre: "Centro Comercial Aventura Plaza",
        direccion: "Carrera 100 No 15A - 61, 2º piso"
      }
    ]
  }
  ]);

  return (
    <>
      <div className="w-screen h-4/5">
        <Topbar />

        <div className="pt-14">
          <div className="pl-6">

            <b className="text-5xl text-principal">Localización física y horarios de atención</b>

            <br />

            {infoAtencion.map((content: any) => (
              <>
                <div className="mt-4 px-6">
                  <p><strong className="text-principalTransparente">{content.titulo}</strong></p>
                  {content.sedes.map((sede: any) => (
                    <div className="pl-7">
                      <b className="text-neutral-950">{sede.nombre}</b>
                      <p className="text-neutral-800">{sede.direccion}</p>
                    </div>
                  ))}
                </div>
                <br />
              </>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
