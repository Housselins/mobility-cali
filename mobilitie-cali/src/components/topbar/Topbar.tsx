"use client";
import React, { useState } from 'react'
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { FaBars, FaHouse, FaLanguage } from 'react-icons/fa6'

export const Topbar = () => {
    const [controladorRenderMenu, setControladorRenderMenu] = useState(false);
    const ocultarMenuNav = () => {
        setControladorRenderMenu(!controladorRenderMenu);
    };

    const [controladorRenderLogin, setControladorRenderLogin] =
        useState(false);

    const ocultarInitSesion = () => {
        setControladorRenderLogin(!controladorRenderLogin);
    };
    return (
        <div className="fixed z-40 w-full justify-between bg-principal py-2 px-6 flex flex-row items-center">
            <div className="flex flex-row items-center space-x-2">
                <FaBars
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={ocultarMenuNav}
                />
                <img
                    className="w-20"
                    src="https://www.cali.gov.co/movilidad/info/principal/media/bloque214959.png"
                    alt=""
                />
            </div>

            <div className="flex flex-row space-x-2">
                <FaLanguage style={{ color: "white" }} />
                <FaSearch style={{ color: "white" }} />
                <FaUserAlt
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={ocultarInitSesion}
                />
                <FaHouse style={{ color: "white" }} />
            </div>
        </div>
    )
}
