import Link from "next/link";
import React, { useState } from "react";

export default function DirEntRel() {

    const [opciones, setOpciones] = useState([
        {
            texto: "Ministerio de Transporte",
            link: "https://www.mintransporte.gov.co/"
        },
        {
            texto: "Súper Intendencia de Puertos y Transporte",
            link: "http://www.supertransporte.gov.co/"
        },
        {
            texto: "Agencia Nacional de Seguridad Vial",
            link: "https://www.ansv.gov.co/"
        },
        {
            texto: "Registro Único Nacional de Tránsito (RUNT)",
            link: "http://www.runt.com.co/"
        },
        {
            texto: "Sistema Integrado sobre las Multas y Sanciones por Infracciones de Tránsito (SIMIT)",
            link: "https://fcm.org.co/simit/#/home-public"
        },
        {
            texto: "Instituto Nacional de Vías (INVIAS)",
            link: "https://www.invias.gov.co/"
        },
        {
            texto: "Secretaría de Movilidad del Valle del Cauca",
            link: "http://www.valledelcauca.gov.co/movilidad/"
        },
        {
            texto: "Centro de Diagnóstico Automotor del Valle",
            link: "https://www.cdav.gov.co/"
        },
        {
            texto: "Programa Servicios de Tránsito (PST)",
            link: "http://www.serviciosdetransito.com/"
        }
    ]);

    return (
        <>
            <div className="text-center w-full">
                <h2 className="text-principal text-6xl pb-7">
                    Directorio de entidades relacionadas
                </h2>

                <div className="text-justify flex flex-col justify-center px-10">
                    <p>
                        A continuación se lista algunas entidades que por su razon social y
                        mision estan altamente relacionadas con nosotros:
                    </p>

                    <br />

                    <ol style={{ listStyleType: "float", paddingLeft: "50px" }}>
                        {opciones.map((opcion: any, indx: number) => (
                            <li key={indx} className="mb-3 hover:cursor-pointer">
                                <a href={opcion.link} target="_blank">
                                    {opcion.texto}
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
}
