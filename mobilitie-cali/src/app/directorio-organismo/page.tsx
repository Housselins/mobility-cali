"use client";
import { Topbar } from '@/components/topbar/Topbar'
import React from 'react'
import './DirectorioOrganismo.css'
import { Card } from '@mui/material'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaBriefcase, FaLink } from "react-icons/fa";
import Link from "next/link";
const DirectorioOrganismo = () => {

    const [funcionarios, setFuncionarios] = React.useState([
        {
            name: "Wilmer Tabares Marín",
            direccion: "Cra 3 #56-90 Barrio Salomia",
            telefono: "(602)4184205",
            correo: "wilmer.tabares@cali.gov.co",
            cargo: "Secretario de Despacho",
            url: "https://www1.funcionpublica.gov.co/web/sigep2/hdv/-/directorio/S530952-0485-4/view"
        },
        {
            name: "Juan Manuel Guzmán",
            direccion: "Calle 14 #1-03. Barrio Salomia",
            telefono: "(602)4184242",
            correo: "juan.guzman.azc@cali.gov.co",
            cargo: "Subsecretario de Movilidad",
            url: "https://www.funcionpublica.gov.co/web/sigep/hdv/-/directorio/S718017-0485-4/view"
        },
        {
            name: "Gustavo A. Orozco Lince",
            direccion: "Cra 3 #56-90. Barrio Salomia",
            telefono: "(602) 4184242",
            correo: "gustavo.orozco@cali.gov.co",
            cargo: "Subsecretario de Servicios de Movilidad",
            url: "https://www.funcionpublica.gov.co/web/sigep2/hdv/-/directorio/S1197850-0485-4/view"
        },
        {
            name: "Liliana López López",
            direccion: "Cra 3 #56-90. Barrio Salomia",
            telefono: "(602)4184256",
            correo: "liliana.lopez@cali.gov.co",
            cargo: "Jefe de Unidad de Apoyo a la Gestión",
            url: ""
        },
        {
            name: "Adriana González Mendez",
            direccion: "Cra 3 #56-90",
            telefono: "(602) 4184205",
            correo: "adriana.mendez@cali.gov.co",
            cargo: "Jefe de oficina de Contravenciones",
            url: ""
        },
        {
            name: "Carlos Barbosa",
            direccion: "Cra 3 #56-90. Barrio Salomia",
            telefono: "(602) 4184205",
            correo: "carlos.barbosa@cali.gov.co",
            cargo: "Administrador de Empresas",
            url: ""
        },


    ])
    return (
        <div className="container-organismo">
            <Topbar />
            <div className="infoPrincipal-organismo">
                <h1 className="title-organismo">Secretaría de Movilidad</h1>
                <div className="pgel">
                    <div className='pgel-text'>
                        <p>
                            Listado de servidores públicos, empleados y contratistas del Estado registrados en el Sistema de Información y Gestión del Empleo Público - SIGEP II
                        </p>
                    </div>
                    <div className='pgel-img'>
                        <Link href="https://www1.funcionpublica.gov.co/web/sigep2/directorio" target="_blank" passHref>
                            <img className='sigep' src="https://www.cali.gov.co/directorio/21/secretaria-de-movilidad/info/tribunet/mod/Directorio/img/sigep-boton.png" alt="" />
                        </Link>
                    </div>
                </div>

                <div className='contenedor-funcionarios'>
                    {funcionarios.map((funcionario, key) => (
                        <div key={key} className='funcionarios'>
                            <h2 className='title-funcionarios'>
                                {funcionario.name}
                            </h2>
                            <div className='contenedor-datos'>
                                <div className='text-datos'>
                                    <div className='flex'>
                                        <FaMapMarkerAlt /> <p>{funcionario.direccion}</p>
                                    </div>
                                    <div className='flex'>
                                        <FaPhoneAlt /> <p>{funcionario.telefono}</p>
                                    </div>
                                    <div className='flex'>
                                        <FaEnvelope /> <p>{funcionario.correo}</p>
                                    </div>
                                </div>
                                <div className='text-datos'>
                                    <div className='flex'>
                                        <FaBriefcase /> <p>{funcionario.cargo}</p>
                                    </div>
                                    <div className='flex'>
                                        <FaLink /> <a href="{funcionario.url}"> {funcionario.name}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}

export default DirectorioOrganismo