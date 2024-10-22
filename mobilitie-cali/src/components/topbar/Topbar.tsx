"use client";
import Link from 'next/link';
import { PQRSDButton } from '@/presentation/components/atoms/buttons/pqrsd';
import React, { useState } from 'react'
import { FaArrowDown, FaSearch, FaUserAlt } from 'react-icons/fa';
import { FaBars, FaHouse, FaLanguage } from 'react-icons/fa6'
import LoginForm from '../forms/login';
import { useTranslation } from 'next-i18next';
import './Topbar.css'
export const Topbar = () => {
    const [controladorRenderMenu, setControladorRenderMenu] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false)
    const { t, i18n } = useTranslation('common');

    const ocultarMenuNav = () => {
        setControladorRenderMenu(!controladorRenderMenu);
    };

    const [controladorRenderLogin, setControladorRenderLogin] =
        useState(false);

    const ocultarInitSesion = () => {
        setControladorRenderLogin(!controladorRenderLogin);
    };

    const [menuOrganismo, setMenuOrganismo] = useState(false);

    const ocultarSubMenuNav = () => {
        setMenuOrganismo(!menuOrganismo);
    }

    const mostrarIdiomas = () => {
        setShowLanguage(!showLanguage)
    }

    const changeLanguage = (lang:any) => {
        i18n.changeLanguage(lang);
        console.log(i18n.language);
        
      };

    return (
        <>
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
                <div className="flex flex-row space-x-2 items-center">
                    {showLanguage && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaLanguage className='idiomas' /> <p onClick={() => changeLanguage('en')} className='codigo-idioma'>EN</p>
                            <FaLanguage className='idiomas' /> <p className='codigo-idioma'>FR</p>
                            <FaLanguage className='idiomas' /> <p className='codigo-idioma'>IT</p>
                            <FaLanguage className='idiomas' /> <p className='codigo-idioma'>JP</p>
                            <FaLanguage className='idiomas' /> <p className='codigo-idioma'>PO</p>
                            <FaLanguage className='idiomas' /> <p className='codigo-idioma'>AL</p>
                            <FaLanguage className='idiomas' /> <p className='codigo-idioma'>ES</p>
                        </div>
                    )}

                    <FaLanguage
                        style={{ color: "white", cursor: "pointer" }}
                        onClick={mostrarIdiomas} />
                    <PQRSDButton />
                    <FaSearch style={{ color: "white" }} />
                    <FaUserAlt
                        style={{ color: "white", cursor: "pointer" }}
                        onClick={ocultarInitSesion}
                    />
                    <Link href={`/`} passHref>
                        <FaHouse style={{ color: "white" }} />
                    </Link>
                </div>

                <div
                    className="fixed right-0 z-20 top-0 rounded-lgin w-1/3 max-w-xs shadow-2xl bg-white"
                    style={{
                        height: "50%",
                        display: controladorRenderLogin ? "" : "none",
                    }}
                >
                    <LoginForm />
                </div>

            </div>
        </>
    )
}
