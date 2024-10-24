import Link from "next/link";
import React, { useState } from "react";

export default function SideMenu() {
    const [opcionesMenu, setOpcionesMenu] = useState([
        {
            opcion: "Información general", 
            divisiones: [
                {
                    texto: "Funciones del Organismo",
                    link: "/organismo",
                },
                {
                    texto: "Directorio de Entidades",
                    link: "/smenu?indx=DirEnt",
                },
                {
                    texto:
                        "Directorio de agremiaciones, asociaciones y otros grupos de interés.",
                    link: "/smenu?indx=DirAgrYGI",
                },
            ],
        },
        {
            opcion: "Datos de contacto",
            divisiones: [
                {
                    texto: "Localización y horarios de atención al público",
                    link: "horariosDeAtencion",
                },
                {
                    texto: "Directorio del Organismo",
                    link: "directorioOrganismo",
                },
            ],
        },
        {
            opcion: "Planeación gestión y control",
            divisiones: [
                {
                    texto: "Informe de gestión",
                    link: "#",
                },
                {
                    texto: "Manuales y guías",
                    link: "#",
                },
                {
                    texto: "Plan de Acción",
                    link: "#",
                },
                {
                    texto: "Ejecución presupuestal",
                    link: "#",
                },
                {
                    texto: "Plan Local de Seguridad Vial",
                    link: "#",
                },
                {
                    texto: "Plan de Seguridad Vial para Motociclistas",
                    link: "#",
                },
                {
                    texto: "Planes de Manejo de Tráfico",
                    link: "#",
                },
                {
                    texto: "Plan Integral de Movilidad Urbana - PIMU 2030",
                    link: "#",
                },
                {
                    texto:
                        "Políticas de operación del proceso de gestión del tránsito y transporte",
                    link: "#",
                },
                {
                    texto: "Planes de mejoramiento del Organismo",
                    link: "#",
                },
            ],
        },
        {
            opcion: "Participación ciudadana",
            divisiones: [
                {
                    texto: "Espacios de Participación Ciudadana",
                    link: "/espacio-participacion",
                },
                {
                    texto:
                        "Participación para la identificación de problemas y diagnóstico de necesidades",
                    link: "#",
                },
                {
                    texto:
                        "Participación y consulta ciudadana de proyectos, normas, políticas o programas",
                    link: "#",
                },
                {
                    texto: "Colaboración e innovación abierta",
                    link: "#",
                },
                {
                    texto: "Rendición de Cuentas",
                    link: "#",
                },
                {
                    texto: "Control ciudadano",
                    link: "#",
                },
                {
                    texto: "Plan de acción 2024",
                    link: "#",
                },
            ],
        },
        {
            opcion: "Contratación",
            divisiones: [
                {
                    texto: "Avisos De Contratación",
                    link: "#",
                },
                {
                    texto: "Colombia Compra SECOP I",
                    link: "#",
                },
                {
                    texto: "Colombia Compra SECOP II",
                    link: "#",
                },
                {
                    texto: "Información para Proveedores",
                    link: "#",
                },
            ],
        },
        {
            opcion: "Tramites y servicios",
            divisiones: [
                {
                    texto: "Servicios virtuales de tránsitoo",
                    link: "#",
                },
                {
                    texto: "Consulta de infracciones de tránsito",
                    link: "#",
                },
                {
                    texto: "Requisitos para la viabilidad de eventos",
                    link: "#",
                },
                {
                    texto: "Solicitud de Planes de manejo de tráfico",
                    link: "#",
                },
                {
                    texto: "Listado de trámites y servicios",
                    link: "#",
                },
            ],
        },
        {
            opcion: "Información de interés",
            divisiones: [
                {
                    texto: "Avisos, notificaciones y citaciones",
                    link: "#",
                },
                {
                    texto: "Calendario de Actividades",
                    link: "#",
                },
                {
                    texto: "Datos Abiertos",
                    link: "#",
                },
                {
                    texto: "Estudios, investigaciones y otras publicaciones",
                    link: "#",
                },
                {
                    texto: "Información para niños, niñas y adolescentes",
                    link: "#",
                },
                {
                    texto: "Acerca del RUNT",
                    link: "#",
                },
            ],
        },
        {
            opcion: "Educación y cultura vial",
            divisiones: [
                {
                    texto: "Servicios educativos",
                    link: "#",
                },
                {
                    texto: "Centro de Enseñanza Automovilística",
                    link: "#",
                },
            ],
        },
        {
            opcion: "Observatorio",
            divisiones: [
                {
                    texto:
                        "Observatorio Observatorio de Seguridad Vial y Movilidad Sostenible",
                    link: "#",
                },
            ],
        },
        {
            opcion: "Pico y placa",
            divisiones: [
                {
                    texto: "Pico y Placa 2024",
                    link: "#",
                },
                {
                    texto: "Exentos de Pico y Placa",
                    link: "#",
                },
            ],
        },
    ]);
    return (
        <>
            <img
                className="py-2"
                src="https://www.cali.gov.co/movilidad/info/principal/media/bloque210342.png"
                alt="ded"
                style={{ width: "90px" }}
            />

            <div className="join join-vertical w-full">
                {opcionesMenu.map((dato: any, index: number) => (
                    <div key={index} className="collapse collapse-arrow join-item">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title">
                            <p className="text-l text-principalTransparente font-semibold">
                                {dato.opcion}
                            </p>
                        </div>
                        <div className="collapse-content">
                            <div className="pl-7">
                                <ul style={{ listStyleType: "disc" }}>
                                    {dato.divisiones.map((sub: any, idx: number) => (
                                        <li className="pb-3">
                                            <Link href={sub.link} target="_blank" passHref>
                                                {sub.texto}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
